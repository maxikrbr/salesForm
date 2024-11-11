import { LightningElement, api, track } from 'lwc';
import createOpportunitiesFromJSON from '@salesforce/apex/OpportunityController.createOpportunitiesFromJSON';

export default class NewBatchOpps extends LightningElement {
    @api recordId; // This should be set to the Opportunity record ID or a default
    @track jsonData = '';
    @track message = '';

    handleJsonChange(event) {
        this.jsonData = event.target.value;
    }

    handleSubmit() {
        try {
            const parsedData = JSON.parse(this.jsonData);
            if (Array.isArray(parsedData)) {
                createOpportunitiesFromJSON({ jsonDataList: [this.jsonData] })
                    .then((result) => {
                        if (
                            result &&
                            result.length > 0 &&
                            result[0] === 'Opportunities created successfully!'
                        ) {
                            this.message = result[0]; // Success message
                        } else {
                            this.message = 'Errors: ' + result.join(', '); // Error handling
                        }
                        console.log(result);
                    })
                    .catch((error) => {
                        this.message = 'Error: ' + error.body.message;
                        console.error(error);
                    });
            } else {
                this.message =
                    'Invalid JSON format. Please ensure the data is an array of opportunities.';
            }
        } catch (error) {
            this.message = 'Invalid JSON format. Please check your input.';
        }
    }
}
