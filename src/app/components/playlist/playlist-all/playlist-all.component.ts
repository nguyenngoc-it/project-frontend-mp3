import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../../../services/playlist/playlist.service";

@Component({
  selector: 'app-playlist-all',
  templateUrl: './playlist-all.component.html',
  styleUrls: ['./playlist-all.component.css']
})
export class PlaylistAllComponent implements OnInit {
playlists:any;
  constructor(private playlistSer:PlaylistService) { }

  ngOnInit(): void {
        this.getAll();
    console.log(this.playlists)
  }
  getAll(){
    this.playlistSer.getAll().subscribe(res=>{
      this.playlists =res;
    })
  }

}
