import { Injectable } from "@angular/core";

@Injectable()

export class ConfigService{
    _baseUrl:string; 
    constructor()
     {

        // this._baseUrl="http://localhost:59848/api/";
        //  this._baseUrl="https://innovatewarangal.com/api/";
        this._baseUrl="https://godavarisnacks.in/api/";

     }

     getBaseURL(){
        return this._baseUrl;
    }
}