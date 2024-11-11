import { LightningElement, track } from 'lwc';
import createOpportunity from '@salesforce/apex/OpportunityController.createOpportunity';

export default class newOppForm extends LightningElement {
    @track opportunityName = '';
    @track storeUrl = '';
    @track opportunityIdentifier = '';

    handleNameChange(event) {
        this.opportunityName = event.target.value;
    }

    handleUrlChange(event) {
        this.storeUrl = event.target.value;
    }

    handleFileUpload(event) {
        const uploadedFiles = event.detail.files;
        this.attachmentId = uploadedFiles[0].documentId;
    }

    handleCreateOpportunity() {
        if (!this.opportunityName || !this.storeUrl) {
            alert('Please fill all fields before creating an Opportunity.');
            return;
        }
        createOpportunity({
            name: this.opportunityName,
            storeUrl: this.storeUrl,
            attachmentId: this.attachmentId,
        })
            .then(() => {
                alert('Opportunity created successfully!');
            })
            .catch((error) => {
                alert('Error creating Opportunity: ' + error.body.message);
            });
    }
}
