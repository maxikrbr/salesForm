import { LightningElement, api, track } from 'lwc';

export default class NewBatchOpps extends LightningElement {
    @api recordId; // This should be set to the Opportunity record ID or a default
    @track jsonData = '';
    @track message = '';

    handleJsonChange(event) {
        this.jsonData = event.target.value;
    }

    handleSubmit() {
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
        this.message = uploadedFiles.length + ' file(s) uploaded successfully.';
    }
}
