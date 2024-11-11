trigger OpportunityContentVersionLink on Opportunity (after insert) {
    List<ContentDocumentLink> contentDocumentLinksToCreate = new List<ContentDocumentLink>();

    for (Opportunity opp : Trigger.new) {
        if (opp.Guest_User_Attach_Id__c != null) {
            List<ContentVersion> contentVersions = [SELECT Id, ContentDocumentId 
                                                    FROM ContentVersion 
                                                    WHERE Guest_Record_fileupload__c = :opp.Guest_User_Attach_Id__c];

            for (ContentVersion cv : contentVersions) {
                ContentDocumentLink cdl = new ContentDocumentLink(
                    ContentDocumentId = cv.ContentDocumentId,
                    LinkedEntityId = opp.Id,
                    ShareType = 'V',
                    Visibility = 'AllUsers'
                );
                contentDocumentLinksToCreate.add(cdl);
            }
        }
    }

    if (!contentDocumentLinksToCreate.isEmpty()) {
        insert contentDocumentLinksToCreate;
    }
}