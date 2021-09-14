import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formChange: FormGroup;
  user=JSON.parse(<string>localStorage.getItem('user'));
  constructor(private userSevice: UserService,
              private form: FormBuilder,
              private router: Router,
              ) {
    this.formChange= this.form.group({
      old_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.minLength(10)]],
      password_confirmation:['',[Validators.required]]
    })
  }

  ngOnInit(): void {

  }
  get vali(){
    return this.formChange.controls;
  }
  changePass(){
    let data= this.formChange.value;
    this.userSevice.changePassword(data).subscribe(res=>{
      this.router.navigate(['/'+this.user.id+'/profile'])
    })

  }
}
