import { Injectable } from "@angular/core";
import { ConfigService } from '../shared/configService';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base_Url : string;

  constructor(private ConfigService : ConfigService, private http :HttpClient) { 
      this.base_Url = ConfigService.getBaseURL();
  }

  login(data){
      return this.http.get(this.base_Url +'account/login/'+ data.username +'/'+ data.password);;
  }
  
}
