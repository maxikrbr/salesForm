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
    }

    @AuraEnabled
    public static List<Opportunity> createOpportunitiesFromJSON(List<String> jsonDataList) {
        List<Opportunity> opportunities = new List<Opportunity>();
        
        for (String jsonData : jsonDataList) {
            try {
                OpportunityWrapper wrapper = (OpportunityWrapper) JSON.deserialize(jsonData, OpportunityWrapper.class);
                Opportunity opp = new Opportunity(
                    Name = wrapper.name,
                    CloseDate = Date.parse(wrapper.closeDate),
                    StageName = wrapper.stageName,
                    Amount = wrapper.amount,
                    Store_URL__c = wrapper.storeUrl
                );
                opportunities.add(opp);
            } catch (Exception e) {
                System.debug('Error parsing JSON or creating Opportunity: ' + e.getMessage());
            }
        }
        
        try {
            if (!opportunities.isEmpty()) {
                insert as system opportunities;
            }
        } catch (Exception) {
            
        }

        return opportunities;
    }
    
    public class OpportunityWrapper {
        public String name;
        public String closeDate;
        public String stageName;
        public Decimal amount;
        public String storeUrl;
    }
}
