import { Injectable } from "@angular/core";
import { ConfigService } from '../shared/configService';
import { HttpClient } from "@angular/common/http";
import { AlertService } from '../shared/Directives/alert/alert.service';

@Injectable() 

export class EventService{
     
    base_Url : string;
    TotalEvents ;
    ApprovedEvents ;
    constructor(private ConfigService : ConfigService, private http :HttpClient,private alertService:AlertService) { 
        this.base_Url = ConfigService.getBaseURL();
    }

    saveEvent(data){
        return this.http.post(this.base_Url + 'user/save',data);
    }

    getAdminEvents(fromDate,toDate){
        return this.http.get(this.base_Url +'user/events/'+ fromDate +'/'+ toDate +'/true');
    }

    approveEvents(data){
        return this.http.post(this.base_Url + 'user/approve', data);
    }

    getUpcommingEvents(){
        return this.http.get(this.base_Url +'home/topevents');
    }

    getRecentinnovations(){
        return this.http.get(this.base_Url +'home/recentinnovations');
    }
}
