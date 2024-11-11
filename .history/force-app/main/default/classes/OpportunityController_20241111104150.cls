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

        if (uniqueIdentifier != null) {
            List<ContentVersion> content = [
                SELECT Id, ContentDocumentId, Guest_Record_fileupload__c
                FROM ContentVersion
                WHERE Guest_Record_fileupload__c != null
            ]
            insert as system link;
        }
    }
}
