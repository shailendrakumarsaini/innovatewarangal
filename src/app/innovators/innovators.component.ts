import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { UserModel } from '../models/user';
import { InnovatorsModel } from '../models/innovators';
import { InnovatorsVM } from '../models/InnovatorsVm';
import { EventService } from '../services/event.service';
import { InnovatorsService } from '../services/innovators.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/Directives/alert/alert.service';

@Component({
  selector: 'app-innovators',
  templateUrl: './innovators.component.html',
  styleUrls: ['./innovators.component.css']
})
export class InnovatorsComponent implements OnInit {
  formDataObj = new FormData();  
  InnovatorsForm ;
  validationMessages  = {
    'ProjectName' : {
                    'required': 'Project Name is required'
                  },
    'ProjectDescription' : {
                'required': 'Project Description is required'
              },
    'UploadFile' : {
                'required': 'This fiels is required'
              },
    'UseCases' : {
                'required': 'Use Cases field is required'
              },
    'Specialties' : {
                      'required': 'Specialties is required'
                    },
    'Link' : {
                'required': 'This field is required'
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
    'ProjectName' : '',
    'ProjectDescription' : '',
    'UseCases' : '',
    'Specialties' : '',
    'UploadFile' : '',
    'Link' : '',
    'Name' : '',
    'PhoneNo' : '',
    'Email' : '',
    'ContactPreference' : ''
  };
  submmited : boolean;
  public file;
  loading: boolean;
  base64textString: string;
  @ViewChild('form') form;

  constructor(private fb : FormBuilder,private eventService : EventService,private innovatorsService :InnovatorsService, private router :Router,private alertService:AlertService) {}

  ngOnInit() {
    this.InnovatorsForm = this.fb.group({
      InnovatorsDetails : this.fb.group({
            ProjectName : [null ,[Validators.required]],
            ProjectDescription : [null ,[Validators.required]],
            UseCases : [null ,[Validators.required]],
            Specialties : [null ,[Validators.required]],
            UploadFile : [null ,[Validators.required]],
            Link : [null ,[Validators.required]]
          }), 
          PersonalDetails :this.fb.group({
            Name : [null, [Validators.required]],
            PhoneNo : [null, [Validators.required]],
            Email : [null, [Validators.required,Validators.email]],
            ContactPreference : this.fb.array([], Validators.required)
          })
        });
    this.onChange('Phone', true);
    
    this.InnovatorsForm.valueChanges.subscribe(value =>{
      this.logValidationMessages();
    });
  }

  onChange( ContactPreferenceElement: string, isChecked: boolean) {
    const ContactPreferenceFormArray = <FormArray>this.InnovatorsForm.get('PersonalDetails').get('ContactPreference');
      if (isChecked) {
        ContactPreferenceFormArray.push(new FormControl(ContactPreferenceElement));
      } else {
        let index = ContactPreferenceFormArray.controls.findIndex(x => x.value == ContactPreferenceElement)
        ContactPreferenceFormArray.removeAt(index);
      }
  }

  blurFunc(isChecked: boolean){
    // console.log(<FormArray>this.eventForm.get('PersonalDetails').get('ContactPreference').length);
    if(this.InnovatorsForm.get('PersonalDetails').get('ContactPreference')['length'] == 0){
      this.onChange('Phone', true);
    }
  }
   
  onSubmit(formData){
    this.submmited = true; 
    this.logValidationMessages();
    if(this.InnovatorsForm.valid){
    let innovators  = new InnovatorsModel();
    innovators.ProjectName = formData['InnovatorsDetails']['ProjectName'];
    innovators.Description = formData['InnovatorsDetails']['ProjectDescription'];
    innovators.UseCases = formData['InnovatorsDetails']['UseCases'];
    innovators.Specialities = formData['InnovatorsDetails']['Specialties'];
    innovators.Flyer = this.base64textString;
    innovators.Link = formData['InnovatorsDetails']['Link'];
    
    let userModel = new UserModel();
    userModel.Name = formData['PersonalDetails']['Name'];
    userModel.PhoneNumber = formData['PersonalDetails']['PhoneNo'];
    userModel.Email = formData['PersonalDetails']['Email'];
    userModel.WayToReach = formData['PersonalDetails']['ContactPreference'].join(',');

    let innovatorsVM = new InnovatorsVM();
    innovatorsVM.userDetails = userModel;
    innovatorsVM.innovations = innovators;

    this.loading = true;
    this.innovatorsService.saveInnovators(innovatorsVM).subscribe(res =>{
      // console.log(res);
      if(res >= 1){
        this.loading = false;
        this.alertService.success('Innovation Created successfully');
        this.submmited = false;
        this.InnovatorsForm.reset();
        this.form.resetForm();
        this.ngOnInit();
      }else{
        this.loading = false;
        this.alertService.error('Innovation Creation Failed');
      }
    },err => this.loading = false);
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
      this.base64textString= btoa(binaryString);
    }
  
  resetForm(){
    this.submmited = false;
    this.InnovatorsForm.reset();
    this.ngOnInit();
  }
 
  logValidationMessages(group: FormGroup = this.InnovatorsForm): void {
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

 