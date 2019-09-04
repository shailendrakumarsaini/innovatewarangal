import { Component, OnInit } from '@angular/core';
import { InnovatorsService } from '../services/innovators.service';

@Component({
  selector: 'app-innovatorsdetails', 
  templateUrl: './innovatorsdetails.component.html',
  styleUrls: ['./innovatorsdetails.component.scss']
})
export class InnovatorsdetailsComponent implements OnInit {
  eventInnovationData;
  loading: boolean; 
  noData : boolean;
  fieldName : string;
  order : boolean = false;
  Month :number;
  Year:number;
  Date;
  constructor(private innovatorsService:InnovatorsService) { }

  ngOnInit() {
    let date = new Date();
    let month = date.getMonth() + 1;
    this.Month = month;
    // console.log(this.Month)
    let year = date.getFullYear();
    this.Year = year;
    let daysInMonth = this.daysInMonth(this.Month,this.Year);
    
    let formDate = year +'-'+ month +'-'+ 1;
    let toDate = year +'-'+ month +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.Date = formDate;
    this.getInnovations(formDate,toDate);
  }

  getInnovations(formDate,toDate){ 
    this.loading = true;
    this.innovatorsService.getUserInnovations(formDate,toDate).subscribe(res =>{
      console.log('Innovations',res);
      this.eventInnovationData = res;
      this.loading = false;
      (this.eventInnovationData['length'] <= 0) ? (this.noData = true) : (this.noData = false);
    },err => this.loading = false)
  }

  previousMonthEvents(){
    let date = new Date();
    this.Month = this.Month - 1 ;
    // console.log(this.Month)
    let year = date.getFullYear();
    let daysInMonth = this.daysInMonth(this.Month,year);
    
    let formDate = year +'-'+ (this.Month) +'-'+ 1;
    let toDate = year +'-'+ (this.Month)  +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.Date = formDate;
    this.getInnovations(formDate,toDate);
  }

  currentMonthEvents(){
    let date = new Date();
    let month = date.getMonth() + 1;
    this.Month = month;
    // console.log(this.Month)
    // let year = date.getFullYear();
    // if(this.Month > 12){
    //   this.Year = this.Year + 1;
    // }
    let daysInMonth = this.daysInMonth(this.Month,this.Year);
    
    let formDate = this.Year +'-'+ (this.Month) +'-'+ 1;
    let toDate = this.Year +'-'+ (this.Month)  +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.Date = formDate;
    this.getInnovations(formDate,toDate);
  }

  nextMonthEvents(){
    let date = new Date();
    // let month = date.getMonth() + 1;
    if(this.Month > 12){
      this.Year = this.Year + 1;
      this.Month = 0;
    }
    this.Month = this.Month + 1 ;
    // console.log(this.Month)
    // let year = date.getFullYear();
    
    let daysInMonth = this.daysInMonth(this.Month,this.Year);
    
    let formDate = this.Year +'-'+ (this.Month) +'-'+ 1;
    let toDate = this.Year +'-'+ (this.Month)  +'-'+ daysInMonth;
    // console.log('formDate',formDate)
    // console.log('toDate',toDate)
    this.Date = formDate;
    this.getInnovations(formDate,toDate);
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  orderByFunction(value){
    if (this.fieldName === value) {
      this.order = !this.order;
    }
    this.fieldName = value;
  }

}
