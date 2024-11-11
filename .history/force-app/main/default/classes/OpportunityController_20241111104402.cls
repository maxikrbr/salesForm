public without sharing class OpportunityController {
    @AuraEnabled
    public static void createOpportunity(String name, String storeUrl, String uniqueIdentifier) {
        Opportunity opp = new Opportunity(
            Name = name,
            CloseDate = Date.today().addMonths(1),
            StageName = 'Prospecting',
            Store_URL__c = storeUrl,
            Guest_User_Attach_Id__c = uniqueIdentifier
        );
        insert as system opp;

        if (uniqueIdentifier != null) {
            List<ContentVersion> content = [
                SELECT Id, ContentDocumentId, Guest_Record_fileupload__c
                FROM ContentVersion
                WHERE Guest_Record_fileupload__c = :uniqueIdentifier
            ];

            ContentDocumentLink link = new ContentDocumentLink(
                ContentDocumentId = content[0].ContentDocumentId,
                LinkedEntityId = opp.Id,
                ShareType = 'V'
            );
            insert as system link;
        }
    }
}
