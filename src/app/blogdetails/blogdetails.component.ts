import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit {

  blogObj;
  loading: boolean; 
  noData : boolean;
  fieldName : string;
  order : boolean = false;
  constructor(private blogService:BlogService, private router :Router) {}

  ngOnInit() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let daysInMonth = this.daysInMonth(month,year); 
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month +'-'+ daysInMonth;
    this.getBlog(formDate,toDate);
  }

  goToNewsBlogDetailsPage(blogId){
    this.router.navigate(['newsblogdetails', blogId]);
    // this.router.navigate(['newsblogdetails'], { queryParams: 
    //   { 
    //     "heading": data.heading,
    //     "description": data.description,  
    //     "phoneNumber": data.phoneNumber,
    //     "email": data.email,
    //     "name": data.name
    //   }
    //  });
  } 

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  getBlog(formDate,toDate){
    this.loading = true;
    this.blogService.getUserBlog(formDate,toDate).subscribe(res =>{
      // console.log('blogs',res);
      this.blogObj = res;
      this.loading = false;
      (this.blogObj['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false);
  }

}
