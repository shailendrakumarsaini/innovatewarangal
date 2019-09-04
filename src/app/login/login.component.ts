import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../shared/Directives/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loading : boolean;

  constructor(private fb:FormBuilder,private loginService : LoginService, private router : Router,private alertService:AlertService ) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      username : ['',[Validators.required]],
      password : ['',[Validators.required,Validators.minLength(4)]]
    });
  }

  onSubmit(formData){
    this.loading = true;
    this.loginService.login(formData).subscribe(res=>{
      if(res){
        this.loading = false;
        sessionStorage.setItem('obj',JSON.stringify(res));
        sessionStorage.setItem("Islogin","true");
        this.router.navigate(['admin']);
        this.alertService.success('Login Successfully');
      }
      else{
        this.loading = false;
        this.alertService.error('Login Failed');
      }
    },err => this.loading = false )
  }

}
