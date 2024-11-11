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
        createOpportunitiesFromJSON({ jsonDataList: [this.jsonData] })
            .then((result) => {
                this.message =
                    result && result.length > 0
                        ? 'Errors: ' + result.join(', ')
                        : 'Opportunities created successfully!';
                console.log(result);
            })
            .catch((error) => {
                this.message = 'Error: ' + error.body.message;
            });
    }
}
