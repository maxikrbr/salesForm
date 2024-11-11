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
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        createOpportunity({
            name: this.opportunityName,
            storeUrl: this.storeUrl,
            uniqueIdentifier: this.opportunityIdentifier,
        })
            .then(() => {
                alert('Oportunidade criada com sucesso!');
            })
            .catch((error) => {
                alert('Erro ao criar oportunidade: ' + error.body.message);
            });
    }

    handleError(error) {
        console.error(error);
        alert('Erro ao criar oportunidade: ' + error.body.message);
    }

    generateUniqueIdentifier() {
        return 'xxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            const random = (Math.random() * 36) | 0;
            return random.toString(36);
        });
    }
}
