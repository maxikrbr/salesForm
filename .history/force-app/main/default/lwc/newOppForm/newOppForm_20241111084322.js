import { LightningElement, api, track } from 'lwc';
import createOpportunities from '@salesforce/apex/OpportunityDataProcessor.createOpportunitiesFromJSON';

export default class OpportunityFileUploader extends LightningElement {
    @api recordId;
    @track jsonData = '';
    @track message = '';
    @track fileUploaded = false;
    @track fileErrorMessage = '';

    handleJsonChange(event) {
        this.jsonData = event.target.value;
        this.clearErrorMessages();
    }

    handleSubmit() {
        if (!this.jsonData.trim()) {
            this.message = 'Error: JSON data is required.';
            return;
        }

        if (!this.fileUploaded) {
            this.message = 'Error: At least one file attachment is required.';
            return;
        }

        this.message = '';

        createOpportunities({ jsonDataList: [this.jsonData] })
            .then((result) => {
                this.message =
                    result && result.length > 0
                        ? 'Errors: ' + result.join(', ')
                        : 'Opportunities created successfully!';
            })
            .catch((error) => {
                this.message = 'Error: ' + error.body.message;
            });
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        if (uploadedFiles.length > 0) {
            this.fileUploaded = true;
            this.fileErrorMessage = '';
            this.message =
                uploadedFiles.length + ' file(s) uploaded successfully.';
        }
    }

    clearErrorMessages() {
        this.message = '';
        this.fileErrorMessage = '';
    }
}
