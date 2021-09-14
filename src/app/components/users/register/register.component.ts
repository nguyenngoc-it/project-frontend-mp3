import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  messageEmailError?: string;

  constructor(public http: HttpClient,
              public form: FormBuilder,
              public router: Router,
              public userService: UserService) {
    this.registerForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      password_confirmation: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get vali() {
    return this.registerForm.controls;
  }

  register() {
    let data = this.registerForm.value;
    this.userService.singUp(data).subscribe(res => {
      this.router.navigate(['/login']);
    }, error => {
    this.getMessageError(error.error)
    })
  }

  getMessageError(error:any) {
    if (error && error.message.email){
     this.messageEmailError = 'Email đã tồn tại'
    }
  }

}
