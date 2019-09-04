import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.scss']
})
export class NewsdetailsComponent implements OnInit {
  newsObj;
  loading: boolean;  
  noData : boolean;
  fieldName : string;
  order : boolean = false;
  constructor(private newsService:NewsService, private router :Router) {
   }

  ngOnInit() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let daysInMonth = this.daysInMonth(month,year);
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month +'-'+ daysInMonth;
    this.getNews(formDate,toDate);
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }
  getNews(formDate,toDate){
    this.loading = true;
    this.newsService.getAdminUser(formDate,toDate).subscribe(res =>{
      // console.log('news',res);
      this.newsObj = res;
      this.loading = false;
      (this.newsObj['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false);
  }

  goToNewsBlogDetailsPage(blogId){
    // this.router.navigate(['newsblogdetails'], { queryParams: 
    //   { 
    //     "heading": data.heading,
    //     "description": data.description, 
    //     "phoneNumber": data.phoneNumber,
    //     "email": data.email,
    //     "name": data.name
    //   }
    //  });
    this.router.navigate(['newsblogdetails', blogId]);
  }

}
