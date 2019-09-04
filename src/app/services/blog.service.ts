import { Injectable } from "@angular/core";
import { ConfigService } from '../shared/configService';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BlogService{ 
     
    base_Url : string;

    constructor(private ConfigService : ConfigService, private http :HttpClient) { 
        this.base_Url = ConfigService.getBaseURL();
    }

    saveNews(data){
        return this.http.post(this.base_Url + 'user/saveblog',data);
    }

    getAdminBlogs(fromDate,toDate){
        return this.http.get(this.base_Url +'user/bloglist/'+ fromDate +'/'+ toDate +'/'+'true');
    }

    getUserBlog(fromDate,toDate){
        return this.http.get(this.base_Url +'user/bloglist/'+ fromDate +'/'+ toDate +'/'+'false');
    }

    getBlogByID(id){
        return this.http.get(this.base_Url +'user/getnews/'+ id);
    }


}
