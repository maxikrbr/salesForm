import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import createOpportunity from '@salesforce/apex/OpportunityController.createOpportunity';

export default class newOppForm extends LightningElement {
    @track opportunityName = '';
    @track storeUrl = '';
    @track opportunityIdentifier;
    firstMouseEnter = true;
    relatedRecordBool;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
        if (this.currentPageReference.state.c__recId) {
            this.opportunityIdentifier =
                this.currentPageReference.state.c__recId;
            this.relatedRecordBool = true;
            console.log('Rec Id is ' + this.opportunityIdentifier);
        } else {
            this.relatedRecordBool = false;
        }
    }

    handleNameChange(event) {
        this.opportunityName = event.target.value;
    }

    handleUrlChange(event) {
        this.storeUrl = event.target.value;
    }

    handleMouseEnter(event) {
        if (this.firstMouseEnter) {
            console.log(this.opportunityIdentifier);
            this.firstMouseEnter = false;
        }
    }

    handleFileUpload(event) {
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

    handleError(error) {
        console.error(error);
        alert('Error creating Opportunity: ' + error.body.message);
    }

    generateUniqueIdentifier() {
        return 'xxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            const random = (Math.random() * 36) | 0;
            return random.toString(36);
        });
    }
}
