import { LightningElement, track, wire } from 'lwc';
import createOpportunity from '@salesforce/apex/OpportunityController.createOpportunity';

export default class newOppForm extends LightningElement {
    @track opportunityName = '';
    @track storeUrl = '';
    @track opportunityIdentifier = '';
    relatedRecordId;

    handleNameChange(event) {
        this.opportunityName = event.target.value;
    }

    handleUrlChange(event) {
        this.storeUrl = event.target.value;
    }

    handleMouseEnter(event) {
        this.opportunityIdentifier = this.generateUniqueIdentifier();
        console.log(this.opportunityIdentifier);
    }

    handleFileUpload(event) {
        this.fileUploadCompleted = true;
        console.log(
            'File uploaded successfully with identifier:',
            this.opportunityIdentifier
        );
        console.log(event.target.value);
        console.log(event.detail.files);
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
    }

    generateUniqueIdentifier() {
        return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function () {
            const random = (Math.random() * 16) | 0;
            return random.toString(16);
        });
    }
}
