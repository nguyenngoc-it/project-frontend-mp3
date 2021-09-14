import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {user} from "@angular/fire/auth";
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../../services/playlist/playlist.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  playlists:any;
  userFindId: any;
  userId= JSON.parse(<string>localStorage.getItem('user'));
  id= this.active.snapshot.paramMap.get('id');
  constructor(private playlistService: PlaylistService,
              private userService:UserService,
              private active: ActivatedRoute) { }




  ngOnInit(): void {
  this.find()
    this.getPlaylist();
  }
  user=JSON.parse(<string>localStorage.getItem('user'))
  getPlaylist(){
    this.playlistService.myPlaylist(this.id).subscribe(res=>{
      this.playlists=res;
    })

  }

  find(){
    this.userService.findUserById(this.id).subscribe(res=>{
      this.userFindId=res;
    })
  }

  delete(id:any){

  }

  checkUser(){
    if (this.id==this.user.id){
      return true
    }else {
      return false
    }
  }

  check(){
    if (this.user.id==this.id){
      return false;
    }else {
      return true;
    }
  }

}
