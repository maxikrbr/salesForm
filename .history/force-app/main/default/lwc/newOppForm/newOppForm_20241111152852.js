import { LightningElement, track, wire } from 'lwc';
import createOpportunity from '@salesforce/apex/OpportunityController.createOpportunity';

export default class newOppForm extends LightningElement {
    @track opportunityName = '';
    @track storeUrl = '';
    @track opportunityIdentifier = '';
    firstMouseEnter = true;

    handleNameChange(event) {
        this.opportunityName = event.target.value;
    }

    handleUrlChange(event) {
        this.storeUrl = event.target.value;
    }

    handleMouseEnter(event) {
        if (this.firstMouseEnter) {
            this.opportunityIdentifier = this.generateUniqueIdentifier();
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
