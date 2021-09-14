import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import {UserService} from "../../../services/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  token: any;
  constructor(private router: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
  this.router.queryParams.subscribe(param=>{
   this.token= param.token;
  })
  }

  onSubmit(form: NgForm){
    console.log(123)
    const password= form.value.password;
    const password_confirm= form.value.password_confirmation;
    this.userService.reset(this.token, password,password_confirm).subscribe(res=>{
      console.log(res)
    })
  }
}
