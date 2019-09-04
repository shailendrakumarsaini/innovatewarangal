import { Injectable } from "@angular/core";
import { ConfigService } from '../shared/configService';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class NewsService{ 
     
    base_Url : string;

    constructor(private ConfigService : ConfigService, private http :HttpClient) { 
        this.base_Url = ConfigService.getBaseURL();
    }

    saveNews(data){
        return this.http.post(this.base_Url + 'user/saveblog',data);
    }

    getAdminNews(fromDate,toDate){
        return this.http.get(this.base_Url +'user/Newslist/'+ fromDate +'/'+ toDate +'/'+'true');
    }
    getAdminUser(fromDate,toDate){
        return this.http.get(this.base_Url +'user/Newslist/'+ fromDate +'/'+ toDate +'/'+'false');
    }
    

    approveNewsAndBlogs(data){
        return this.http.post(this.base_Url + 'user/approveblog', data, { headers :new HttpHeaders({'Access-Control-Allow-Origin' :'*','Access-Control-Allow-Headers': 'X-Requested-With,content-type','Content-Type': 'application/json'})} );
    }
}
