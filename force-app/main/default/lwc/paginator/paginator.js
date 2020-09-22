import { LightningElement } from 'lwc';

export default class Paginator extends LightningElement {
    previousPageHandler(){
        console.log('Previous event dispatched');
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextPageHandler(){
        console.log('Next event dispatched');
        this.dispatchEvent(new CustomEvent('next'));
    }
}