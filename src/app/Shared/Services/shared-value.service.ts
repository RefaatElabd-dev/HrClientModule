import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedValueService{
    constructor(){

    }

    public configuration = {
        apiURI: ''
    }
}