import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import createOpportunity from '@salesforce/apex/OpportunityController.createOpportunity';

export default class newOppForm extends LightningElement {
    @track opportunityName = '';
    @track storeUrl = '';
    @track opportunityIdentifier = '';
    relatedRecordId;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
        if (this.currentPageReference.state.c__recId) {
            this.relatedRecordId = this.currentPageReference.state.c__recId;
        }
    }
    handleNameChange(event) {
        this.opportunityName = event.target.value;
    }

    handleUrlChange(event) {
        this.storeUrl = event.target.value;
    }

    handleFileUpload(event) {
        randomText = this.generateUniqueIdentifier();
        this.opportunityIdentifier = this.relatedRecordId + '' + randomText;
        this.fileUploadCompleted = true;
        console.log(
            'File uploaded successfully with identifier:',
            this.opportunityIdentifier
        );
    }

    handleCreateOpportunity() {
        if (!this.opportunityName || !this.storeUrl) {
            alert(
                'Please fill all required fields before creating an Opportunity.'
            );
            return;
        }
        createOpportunity({
            name: this.opportunityName,
            storeUrl: this.storeUrl,
            uniqueIdentifier: this.opportunityIdentifier,
        })
            .then(() => {
                alert('Opportunity created successfully!');
            })
            .catch((error) => {
                alert('Error creating Opportunity: ' + error.body.message);
            });
    }

    generateUniqueIdentifier() {
        return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function () {
            const random = (Math.random() * 16) | 0;
            return random.toString(16);
        });
    }
}
