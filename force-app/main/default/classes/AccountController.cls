public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Name, AnnualRevenue, Industry FROM Account ORDER BY Name LIMIT 1000];
    }
}