import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  message:any;
  error={email:null}
  constructor(public http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              public userService: UserService) {
    this.forgotForm= formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }
  get f(){
    return this.forgotForm.controls;
  }

  ngOnInit(): void {
  }
  forgot(){
    const email=this.forgotForm.value.email;
    this.userService.forgot(email).subscribe((res:any)=>{
      this.message= res.message;
    }, (err)=>{
      this.error=err.error.errors;
    })
  }
}
