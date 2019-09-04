import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubscriptionModel } from '../models/Subscription';
import { SubscriptionService } from '../services/subscription.service';
import { AlertService } from '../shared/Directives/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading :boolean;
  UpcommingEventsData;
  RecentinnovationsData;
  subscriptionForm : FormGroup; 
  validationMessages  = {
    'Name' : {
                    'required': 'Name is required',
                    'minlength': '5 Characters is Required'
                  },
    'Phone' :  {
                      'required': 'Phone is required',
                      'minlength': 'Minimum 10 Digits are required',
                      'maxlength': 'Maximum 10 Digits are Required'
                    },
    'Email' : {
                  'required': 'Email is required',
                  'pattern' : 'Please Enter Valid Email'
                },
    'Address' : {
                  'required': 'Address is required',
                  'minlength': '5 Characters are required'
                }
  };

  formErrors = {
            'Name' : '',
            'Phone' : '',
            'Email' : '',
            'Address' : '',
  };
  submmitted: boolean;
  @ViewChild('form') form;
  constructor(private eventService:EventService,private fb:FormBuilder, private subscriptionService:SubscriptionService,private alertService:AlertService) { }

  ngOnInit() {
    this.getUpcommingEvents();

    this.subscriptionForm = this.fb.group({
      Name : ['', [Validators.required]],
      Phone : ['', [Validators.required]],
      Email : ['', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      Address : ['', [Validators.minLength(5)]],
    });

    this.subscriptionForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }  

  onSubmit(formData){
  this.submmitted = true;
  this.logValidationMessages();
    if(this.subscriptionForm.valid){
      let subscriptionModel = new SubscriptionModel();
      subscriptionModel.Name = formData['Name'];
      subscriptionModel.Phone = formData['Phone'];
      subscriptionModel.Email = formData['Email'];
      subscriptionModel.Address = formData['Address'];
      // console.log('subscriptionModel',subscriptionModel);
      this.loading = true;
      this.subscriptionService.saveSubscription(subscriptionModel).subscribe(res =>{
        console.log(res);
        if(res > 0){
          this.loading = false;
          this.alertService.success('Subscription Success');
          this.resetForm();
        }else{
          this.loading = false
          this.alertService.error('Subscription Failed');
        }
      },err =>this.loading = false);
    }
  }

  resetForm(){
    this.submmitted = false;
    this.form.resetForm();
  }

  logValidationMessages(group: FormGroup = this.subscriptionForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmitted)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
          if (abstractControl instanceof FormGroup) {
            this.logValidationMessages(abstractControl);
          } 
      });
  }

  getUpcommingEvents(){
    this.loading = true;
    this.eventService.getUpcommingEvents().subscribe(res =>{
      // console.log('UpcommingEventsData',res);
      this.UpcommingEventsData = res;
      this.loading = false;
      this.getRecentinnovations();
    },err => {
      this.loading = false;
      this.getRecentinnovations();
    });
  }

  getRecentinnovations(){
    this.loading = true;
    this.eventService.getRecentinnovations().subscribe(res =>{
      // console.log('RecentinnovationsData',res);
      this.RecentinnovationsData = res;
      this.loading = false;
    },err => this.loading = false)
  }
 
}
