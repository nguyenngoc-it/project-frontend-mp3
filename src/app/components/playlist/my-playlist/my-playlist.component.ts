import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../../../services/playlist/playlist.service";

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent implements OnInit {

  playlists: any;

  constructor(private playlistService: PlaylistService,
              private active: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getPlaylist();
  }

  user = JSON.parse(<string>localStorage.getItem('user'))

  getPlaylist() {
    this.playlistService.myPlaylist(this.user.id).subscribe(res => {
      this.playlists = res;
    })

  }

  delete(id: any) {
    if (confirm('bạn có chắc muốn xóa')) {
      this.playlistService.delete(id).subscribe(res => {
    this.getPlaylist();
      })
    }
  }


}
