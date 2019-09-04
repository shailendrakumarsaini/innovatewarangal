import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { InnovatorsService} from '../services/innovators.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/Directives/alert/alert.service';
import { NewsService } from '../services/news.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})
export class AdminviewComponent implements OnInit {
  EINBData; 
  selectedItem = [];
  objParse;
  noData : boolean;
  actionModel = "1";
  show;
  loading: boolean;
  constructor(
    private eventService :EventService,
    private innovatorsService:InnovatorsService, 
    private newsService:NewsService, 
    private blogService:BlogService, 
    private router :Router,
    private alertService:AlertService) { 
    this.objParse = JSON.parse(sessionStorage.getItem('obj')); 
  }

  // For Admin no need to give from and to date, it is required only for users

  ngOnInit() {
    this.getEvents('2019-01-01', '2019-01-30');
  }

  action(event){
    if(event.srcElement.value == 2){
      this.getInnovations('2019-01-01', '2019-01-30');
    }
    else if(event.srcElement.value == 3){
      this.getNews('2019-01-01', '2019-01-30');
    }
    else if(event.srcElement.value == 4){
      this.getBlogs('2019-01-01', '2019-01-30');
    }
    else{
      this.getEvents('2019-01-01', '2019-01-30');
    }
  }

  getEvents(formDate,toDate){ 
    this.loading = true;
    this.eventService.getAdminEvents(formDate,toDate).subscribe(res =>{
      // console.log('Events',res);
      this.EINBData = res;
      this.loading = false
      this.show = 'Events';
      (this.EINBData['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false);
  } 

  getInnovations(formDate,toDate){
    this.loading = true;
    this.innovatorsService.getAdminInnovations(formDate,toDate).subscribe(res =>{
      // console.log('Innovations',res);
      this.EINBData = res;
      this.loading = false
      this.show = 'Innovations';
      (this.EINBData['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false)
  }

  getNews(formDate,toDate){ 
    this.loading = true;
    this.newsService.getAdminNews(formDate,toDate).subscribe(res =>{
      // console.log('News',res);
      this.EINBData = res;
      this.loading = false
      this.show = 'News';
      (this.EINBData['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false);
  }

  getBlogs(formDate,toDate){
    this.loading = true;
    this.blogService.getAdminBlogs(formDate,toDate).subscribe(res =>{
      // console.log('Blogs',res);
      this.EINBData = res;
      this.loading = false
      this.show = 'Blogs';
      (this.EINBData['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false);
  }

  checkUncheckCheckBoxForEvents(event,eventID){
    if(event.srcElement.checked == true){
      let obj = {
        eventID : eventID,
        createdBy : this.objParse.createdBy,
        modifiedBy : this.objParse.modifiedBy,
        modifiedOn : this.objParse.modifiedOn,
      }
      this.selectedItem.push(obj);
    }
    if(event.srcElement.checked == false){
      for(let i = 0; i < this.selectedItem.length; i++){
        if(this.selectedItem[i]['eventID'] == eventID){
          this.selectedItem.splice(i, 1);
        }
      }
    }
    // console.log(this.selectedItem);
  }

  checkUncheckCheckBoxForInnovations(event,innovationID){
    if(event.srcElement.checked == true){
      let obj = {
        innovationID : innovationID,
        createdBy : this.objParse.createdBy,
        modifiedBy : this.objParse.modifiedBy,
        modifiedOn : this.objParse.modifiedOn,
      }
      this.selectedItem.push(obj);
    }
    if(event.srcElement.checked == false){
      for(let i = 0; i < this.selectedItem.length; i++){
        if(this.selectedItem[i]['innovationID'] == innovationID){
          this.selectedItem.splice(i, 1);
        }
      }
    }
    // console.log(this.selectedItem);
  }

  checkUncheckCheckBoxForNewsAndBlogs(event,blogId){
    if(event.srcElement.checked == true){
      let obj = {
        BlogId : blogId,
        // createdBy : this.objParse.createdBy,
        ModifiedBy : this.objParse.modifiedBy,
        // modifiedOn : this.objParse.modifiedOn,
        IsActive : true
      }
      this.selectedItem.push(obj);
    }
    if(event.srcElement.checked == false){
      for(let i = 0; i < this.selectedItem.length; i++){
        if(this.selectedItem[i]['blogId'] == blogId){
          this.selectedItem.splice(i, 1);
        }
      }
    }
    // console.log(this.selectedItem);
  }
 
  approveEvents(){
    if(this.selectedItem.length > 0){
      this.loading = true;
      this.eventService.approveEvents(this.selectedItem).subscribe(res =>{
        // console.log(res);
        if(res == 1){
          this.loading = false;
          this.alertService.success('Event approved successfully');
          this.getEvents('2019-01-01', '2019-01-30');
        }else{
          this.loading = false;
          this.alertService.error('Event approved failed');
        }
      },err => this.loading = false);
    }
  }

  approveInnovations(){
    if(this.selectedItem.length > 0){
      this.loading = true;
      this.innovatorsService.approveInnovators(this.selectedItem).subscribe(res =>{
        // console.log(res);
        if(res == 1){
          this.loading = false;this.alertService.success('Innovations approved successfully');
          this.getInnovations('2019-01-01', '2019-01-30');
        }else{
          this.loading = false;
          this.alertService.error('Innovations approved failed');
        }
      },err => this.loading = false);
    }
  }

  approveNewsAndBlogs(){
    if(this.selectedItem.length > 0){
      this.loading = true;
      this.newsService.approveNewsAndBlogs(this.selectedItem).subscribe(res =>{
        // console.log(res);
        var Msg;
        if(res == 1){
          this.loading = false;
          if(this.show == 'News'){
            Msg = 'News';
            this.alertService.success(Msg+' approved successfully');
            this.getNews('2019-01-01', '2019-01-30');
          }else{
            Msg = 'Blog';
            this.alertService.success(Msg+' approved successfully');
            this.getBlogs('2019-01-01', '2019-01-30');
          }         
        }else{
          this.loading = false;
          this.alertService.error(Msg+' approved failed');
        }
      },err => this.loading = false);
    }
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
    this.alertService.success('Log Out Successfully');
  }

}
