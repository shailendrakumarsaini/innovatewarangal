import { Injectable } from '@angular/core';
import { ConfigService } from '../shared/configService';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  base_Url : string;

  constructor(private ConfigService : ConfigService, private http :HttpClient) { 
      this.base_Url = ConfigService.getBaseURL();
  }

  saveSubscription(data){
      return this.http.post(this.base_Url + 'subscription/save',data);
  }
}
