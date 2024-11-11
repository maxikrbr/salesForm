public without sharing class OpportunityController {
    @AuraEnabled
    public static void createOpportunity(String name, String storeUrl, Id attachmentId) {
        Opportunity opp = new Opportunity(
            Name = name,
            CloseDate = Date.today().addMonths(1),
            StageName = 'Prospecting',
            Store_URL__c = storeUrl
        );
        insert as system opp;

        if (attachmentId != null) {
            ContentDocumentLink link = new ContentDocumentLink(
                ContentDocumentId = attachmentId,
                LinkedEntityId = opp.Id,
                ShareType = 'V'
            );
            insert as system link;
        }
    }
}
