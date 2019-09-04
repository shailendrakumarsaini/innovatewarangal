import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { UserModel } from '../models/user';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/Directives/alert/alert.service';
import { NewsBlogVM } from '../models/newsblogVM';
import { NewsBlogModel } from '../models/newsblog';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  NewsBlogForm : FormGroup ;
  validationMessages  = {
    'Heading' : {
                    'required': 'Heading is required'
                  },
    'Content' : {
                'required': 'Description is required'
              },
    'Name' : {
                'required': 'Name is required'
              },
    'PhoneNo' : {
                'required': 'Phone No. is required',
                'minlength': '10 Digits is required'
              },
    'Email' : {
                'required': 'Email is required',
                'email': 'Invalid Email'
              },
    'WayToReach' : {
                'required': 'Contact Preference is required',
                'minlength': '1 Digits is required'
              }
    }; 

  formErrors = {
    'Heading' : '',
    'Content' : '',
    'Name' : '',
    'PhoneNo' : '',
    'Email' : '',
    'WayToReach' : ''
  };
  submmited : boolean;
  loading: boolean;
  @ViewChild('form') form;
  constructor(private fb : FormBuilder,
    private eventService : EventService,
    private newsService :NewsService, 
    private router :Router,
    private alertService:AlertService,) {}

  ngOnInit() {
    this.NewsBlogForm = this.fb.group({
      NewsBlogDetails : this.fb.group({
            Heading : [null ,[Validators.required]],
            Content : [null ,[Validators.required]],
          }), 
          PersonalDetails :this.fb.group({
            Name : [null, [Validators.required]],
            PhoneNo : [null, [Validators.required]],
            Email : [null, [Validators.required,Validators.email]],
            WayToReach : this.fb.array([], Validators.required)
          })
        });
    this.onChange('Phone', true);
    
    this.NewsBlogForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }

  onChange( WayToReachElement: string, isChecked: boolean) {
    const WayToReachFormArray = <FormArray>this.NewsBlogForm.get('PersonalDetails').get('WayToReach');
      if (isChecked) {
        WayToReachFormArray.push(new FormControl(WayToReachElement));
      } else {
        let index = WayToReachFormArray.controls.findIndex(x => x.value == WayToReachElement)
        WayToReachFormArray.removeAt(index);
      }
  }

  blurFunc(isChecked: boolean){
    // console.log(<FormArray>this.eventForm.get('PersonalDetails').get('ContactPreference').length);
    if(this.NewsBlogForm.get('PersonalDetails').get('WayToReach')['length'] == 0){
      this.onChange('Phone', true);
    }
  }
   
  onSubmit(formData){
    this.submmited = true; 
    this.logValidationMessages();
    if(this.NewsBlogForm.valid){
      let newsBlogModel  = new NewsBlogModel();
      newsBlogModel.Heading = formData['NewsBlogDetails']['Heading'];
      newsBlogModel.Description = formData['NewsBlogDetails']['Content'];
      newsBlogModel.IsNews = true;
       
      let userModel = new UserModel();
      userModel.Name = formData['PersonalDetails']['Name'];
      userModel.PhoneNumber = formData['PersonalDetails']['PhoneNo'];
      userModel.Email = formData['PersonalDetails']['Email'];
      userModel.WayToReach = formData['PersonalDetails']['WayToReach'].join(',');

      let newsBlogVM = new NewsBlogVM();
      newsBlogVM.userDetails = userModel; 
      newsBlogVM.blog = newsBlogModel;
      console.log(newsBlogVM)

      this.loading = true;
      this.newsService.saveNews(newsBlogVM).subscribe(res =>{
        console.log(res);
        if(res >= 1){
          this.loading = false;
          this.alertService.success('News Created successfully');
          this.submmited = false;
          this.NewsBlogForm.reset();
          this.form.resetForm();
          this.ngOnInit();
        }else{
          this.loading = false;
          this.alertService.error('News Creation Failed');
        }
      },err => this.loading = false);
    }
  }

  
  resetForm(){
    this.submmited = false;
    this.NewsBlogForm.reset();
    this.ngOnInit();
  }
 
  logValidationMessages(group: FormGroup = this.NewsBlogForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
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
          
          if (abstractControl instanceof FormArray) {
            for (const control of abstractControl.controls) {
              if (control instanceof FormGroup) {
                this.logValidationMessages(control);
              }
            }
          }
      });    
  }
}

 