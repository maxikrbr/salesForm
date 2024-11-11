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
    public static List<String> createOpportunitiesFromJSON(List<String> jsonDataList) {
        List<String> errorMessages = new List<String>();
        List<Opportunity> opportunities = new List<Opportunity>();
        
        // Log the incoming JSON data
        System.debug('Received JSON Data List: ' + jsonDataList);
    
        for (String jsonData : jsonDataList) {
            try {
                // Log each individual JSON string
                System.debug('Parsing JSON: ' + jsonData);
    
                OpportunityWrapper wrapper = (OpportunityWrapper) JSON.deserialize(jsonData, OpportunityWrapper.class);
    
                // Log the deserialized wrapper
                System.debug('Deserialized Wrapper: ' + JSON.serialize(wrapper));
    
                // Ensure the date is valid and in correct format (YYYY-MM-DD)
                Date closeDate = Date.parse(wrapper.closeDate);
                if (closeDate == null) {
                    errorMessages.add('Invalid date format for opportunity: ' + wrapper.name);
                    continue; // Skip this opportunity if the date is invalid
                }
    
                Opportunity opp = new Opportunity(
                    Name = wrapper.name,
                    CloseDate = closeDate,
                    StageName = wrapper.stageName,
                    Amount = wrapper.amount,
                    Store_URL__c = wrapper.storeUrl
                );
                opportunities.add(opp);
            } catch (Exception e) {
                errorMessages.add('Error parsing JSON for opportunity: ' + e.getMessage());
                System.debug('Error parsing JSON for opportunity: ' + e.getMessage()); // Log any parsing errors
            }
        }
    
        System.debug('Opportunities to insert: ' + JSON.serialize(opportunities));
    
        if (!opportunities.isEmpty()) {
            try {
                insert opportunities;
                System.debug('Opportunities inserted successfully.');
            } catch (Exception e) {
                errorMessages.add('Error creating Opportunities: ' + e.getMessage());
                System.debug('Error creating Opportunities: ' + e.getMessage()); // Log insertion errors
            }
        }
    
        if (errorMessages.isEmpty()) {
            return new List<String>{'Opportunities created successfully!'};
        } else {
            return errorMessages;
        }
    }
    
    
    public class OpportunityWrapper {
        public String name;
        public String closeDate;
        public String stageName;
        public Decimal amount;
        public String storeUrl;
    }
}
