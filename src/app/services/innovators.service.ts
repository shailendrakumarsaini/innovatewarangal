import { Injectable } from "@angular/core";
import { ConfigService } from '../shared/configService';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InnovatorsService { 
  base_Url : string;

  constructor(private ConfigService : ConfigService, private http :HttpClient) { 
      this.base_Url = ConfigService.getBaseURL();
  }

  saveInnovators(data){
      return this.http.post(this.base_Url + 'user/save',data);
  }

  saveFile(data){
    return this.http.post(this.base_Url + 'user/upload',data );
  } 

  getAdminInnovations(fromDate,toDate){
    return this.http.get(this.base_Url +'user/innovations/'+ fromDate +'/'+ toDate +'/true');
  }

  getUserInnovations(fromDate,toDate){
    return this.http.get(this.base_Url +'user/innovations/'+ fromDate +'/'+ toDate +'/false');
  }

  approveInnovators(data){
    debugger;
    return this.http.post(this.base_Url + 'user/approveinnovations',data,
      );
  }
  // { headers :new HttpHeaders({'Access-Control-Allow-Origin' :'*','Access-Control-Allow-Headers':
  // 'X-Requested-With,content-type','Content-Type': 'application/json'})}

}
