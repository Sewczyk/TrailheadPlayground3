import { LightningElement, wire, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
const COLUMNS = [
    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Annual Revenue', fieldName: REVENUE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text' }
];

let i=0

export default class DisplayPaginatedRecords extends LightningElement {
    @track currentPage = 1;
    @track allRecords = [];
    @track data = [];
    @track columns;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = 10;
    @track totalRecordCount = 0;
    @track totalNumberOfPages = 0;

    @wire(getAccounts) wiredAccounts({error, data}){
        if(data){
            //Initial data to show when component is loaded, meaning first 10 records
            this.allRecords = data;
            this.totalRecordCount = data.length;
            this.totalNumberOfPages = Math.ceil(this.totalRecordCount/this.pageSize);
            this.data = this.allRecords.slice(0, this.pageSize);
            this.endingRecord = this.pageSize;
            this.columns = COLUMNS;

            this.error = undefined;
        }else if(error){
            this.error = error;
            this.data = undefined;
        }
    }

    displayRecordsPerPage(page){
        this.startingRecord = ((page-1) * this.pageSize);
        this.endingRecord = this.pageSize*page;

        if(this.endingRecord > this.totalRecordCount){
            this.endingRecord = this.totalRecordCount;
        }

        this.data = this.allRecords.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;

    }

    nextPageHandler(){
        if((this.currentPage < this.totalNumberOfPages) && this.currentPage !== this.totalNumberOfPages){
            this.currentPage = this.currentPage + 1;
            this.displayRecordsPerPage(this.currentPage);
            console.log('Display Paginated Records nextPageHandler invoked');
        }
    }

    previousPageHandler(){
        if(this.currentPage > 1){
            this.currentPage = this.currentPage - 1;
            this.displayRecordsPerPage(this.currentPage);
            console.log('Display Paginated Records previousPageHandler invoked');
        }
    }
}