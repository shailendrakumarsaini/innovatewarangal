import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EventModel } from '../models/event';
import { UserModel } from '../models/user';
import { EventService } from '../services/event.service';
import { UserVM } from '../models/UserVM';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/Directives/alert/alert.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  formDataObj = new FormData();  
  eventForm ;
  validationMessages  = {
    'EventName' : {
                    'required': 'Event Name is required'
                  },
    'EventLocation' : {
                'required': 'Event Location is required'
              },
    'Flyer' : {
                'required': 'Flyer or Brochure is required'
              },
    'FromDate' : {
                'required': 'From Date is required'
              },
    'ToDate' : {
                'required': 'ToDate Date is required'
              },
    'EventURL' : {
                'required': 'Event URL is required'
              },
    'Description' : {
                'required': 'Event Description is required'
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
    'ContactPreference' : {
                'required': 'Contact Preference is required',
                'minlength': '1 Digits is required'
              }
    }; 

  formErrors = {
    'EventName' : '',
    'EventLocation' : '',
    'Flyer' : '',
    'FromDate' : '',
    'ToDate' : '',
    'EventURL' : '',
    'Description' : '',
    'Name' : '',
    'PhoneNo' : '',
    'Email' : '',
    'ContactPreference' : ''
       };
  submmited : boolean;
  datePickerConfig: Partial<BsDatepickerConfig>;
  loading: boolean;
  minDate = new Date();
  base64textString: string;
  @ViewChild('form') form;

  constructor(
    private fb : FormBuilder,
    private eventService : EventService, 
    private router :Router,
    private activatedRoute :ActivatedRoute,
    private alertService:AlertService) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY'
      }); 
   }  
 
  ngOnInit() {
    this.eventForm = this.fb.group({
        EventDetails : this.fb.group({
          EventName : [null ,[Validators.required]],
          EventLocation : [null ,[Validators.required]],
          Flyer : [null ,[Validators.required]],
          FromDate : [null ,[Validators.required]],
          ToDate : [null ,[]],
          EventURL : [null ,[Validators.required]],
          Description : [null ,[Validators.required]]
        }),
        PersonalDetails :this.fb.group({
          Name : [null, [Validators.required]],
          PhoneNo : [null, [Validators.required]],
          Email : [null, [Validators.required,Validators.email]],
          ContactPreference : this.fb.array([], Validators.required)
        })
      });

      this.onChange('Phone', true);

    this.eventForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }

  onChange( ContactPreferenceElement: string, isChecked: boolean) {
    const ContactPreferenceFormArray = <FormArray>this.eventForm.get('PersonalDetails').get('ContactPreference');
      if (isChecked) {
        ContactPreferenceFormArray.push(new FormControl(ContactPreferenceElement));
      } else {
        let index = ContactPreferenceFormArray.controls.findIndex(x => x.value == ContactPreferenceElement)
        ContactPreferenceFormArray.removeAt(index);
      }
  }

  blurFunc(isChecked: boolean){
    // console.log(<FormArray>this.eventForm.get('PersonalDetails').get('ContactPreference').length);
    if(this.eventForm.get('PersonalDetails').get('ContactPreference')['length'] == 0){
      this.onChange('Phone', true);
    }
  }
  
  onSubmit(formData){
    this.submmited = true; 
    this.logValidationMessages();
    if(this.eventForm.valid){
      let eventModel = new EventModel();
      eventModel.EventName = formData['EventDetails']['EventName'];
      eventModel.Description = formData['EventDetails']['Description'];
      eventModel.Location = formData['EventDetails']['EventLocation'];
      eventModel.EventDate = this.formatTheDate(formData['EventDetails']['FromDate']);
      eventModel.ToDate = this.formatTheDate(formData['EventDetails']['ToDate']);
      eventModel.SiteURL = formData['EventDetails']['EventURL'];
      eventModel.Flyer = this.base64textString;

      let userModel = new UserModel();
      userModel.Name = formData['PersonalDetails']['Name'];
      userModel.PhoneNumber = formData['PersonalDetails']['PhoneNo'];
      userModel.Email = formData['PersonalDetails']['Email'];
      userModel.WayToReach = formData['PersonalDetails']['ContactPreference'].join(',');

      let userVM = new UserVM();
      userVM.userDetails = userModel;
      userVM.eventList = eventModel;

      this.loading = true;
      this.eventService.saveEvent(userVM).subscribe(res =>{
        // console.log(res);
        if(res > 0){
          this.loading = false;
          this.alertService.success('Event created successfully');
          this.submmited = false;
          this.eventForm.reset();
          this.form.resetForm();
          this.ngOnInit();
        }else{
          this.loading = false; 
          this.alertService.error('Event Creation Failed');
        }
      },err =>  this.loading = false);
    }
  }

  upload(file) {  
    this.handleFileSelect(file);
   }
 
  handleFileSelect(file){
    if (file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }
 
  _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.base64textString = btoa(binaryString);
    }

  resetForm(){
    this.submmited = false;
    this.eventForm.reset();
    this.ngOnInit();
  }


  logValidationMessages(group: FormGroup = this.eventForm): void {
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

  formatTheDate(date){ 
    if(date)
      {
        if((date.getMonth() + 1) <= 9){
          var month = '0'+(date.getMonth() + 1);
        }else{
          month = '' + (date.getMonth() + 1);
        }

        if((date.getDate()) <= 9){
          var day = '0'+(date.getDate());
        }else{
          day = '' + date.getDate();
        }

        return  date.getFullYear() + '-' + month + '-' + day;
      }
  }

}
 