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
        this.clearErrorMessages(); // Clear any previous error messages
    }

    handleSubmit() {
        // Validate that JSON Data and file upload are provided
        if (!this.jsonData.trim()) {
            this.message = 'Error: JSON data is required.';
            return;
        }

        if (!this.fileUploaded) {
            this.message = 'Error: At least one file attachment is required.';
            return;
        }

        // Clear error message if validation passes
        this.message = '';

        // Call Apex method to create Opportunities from JSON
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
        // Handles the completion of the file upload
        const uploadedFiles = event.detail.files;
        if (uploadedFiles.length > 0) {
            this.fileUploaded = true;
            this.fileErrorMessage = ''; // Clear any file error messages
            this.message =
                uploadedFiles.length + ' file(s) uploaded successfully.';
        }
    }

    clearErrorMessages() {
        this.message = '';
        this.fileErrorMessage = '';
    }
}
