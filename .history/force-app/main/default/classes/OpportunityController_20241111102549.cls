public without sharing class OpportunityController {
    @AuraEnabled
    public static void createOpportunity(String name, String storeUrl, String uniqueIdentifier) {
        Opportunity opp = new Opportunity(
            Name = name,
            CloseDate = Date.today().addMonths(1),
            StageName = 'Prospecting',
            Store_URL__c = storeUrl,
            Unique_Identifier__c = uniqueIdentifier
        );
        insert as system opp;

        if (uniqueIdentifier != '') {
            ContentVersion content = Database.getQueryLocator([
                SELECT Id, ContentDocumentId, Guest_Record_fileupload__c
                FROM ContentVersion
                WHERE Guest_Record_fileupload__c = :uniqueIdentifier
            ]);
            ContentDocumentLink link = new ContentDocumentLink(
                ContentDocumentId = attachmentId,
                LinkedEntityId = opp.Id,
                ShareType = 'V'
            );
            insert as system link;
        }
    }
}
