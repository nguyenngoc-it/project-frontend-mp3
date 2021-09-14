import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  messageError?:string;

  constructor(public http: HttpClient,
              public userService: UserService,
              private form: FormBuilder,
              private router: Router,
              ) {
    this.loginForm = this.form.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.min(6)]],
    })
  }
  get f(){
    return this.loginForm.controls;
  }
  ngOnInit(): void {

  }
  login() {
    let data= this.loginForm.value;
    this.userService.login(data).subscribe(res=>{
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token',JSON.stringify(res.token));
      this.router.navigate(['']);

    },(err) => {
      this.checkLogin(err.error)
    })
  }

  checkLogin(error:any){
    if (error){
      this.messageError= 'Sai tài khoản hoặc mật khẩu'
    }
  }
}
