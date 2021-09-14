import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
user=JSON.parse(<string>localStorage.getItem('user'))
  constructor(private userService: UserService,
              private router: Router) { }
  isLogin(){
    return this.userService.status();
  }
  ngOnInit(): void {
  }
  logout(){
    this.userService.logOut().subscribe(res=>{

        localStorage.clear();
        this.router.navigate(['']);


    })
  }

}
