import { Component, OnInit } from '@angular/core';
import {SongService} from "../../../services/song/song.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-song-user',
  templateUrl: './show-song-user.component.html',
  styleUrls: ['./show-song-user.component.css']
})
export class ShowSongUserComponent implements OnInit {
songs:any;

  constructor(private songService:SongService,
              private active: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getSong();
  }
user=JSON.parse(<string>localStorage.getItem('user'))
getSong(){
    this.songService.mySong(this.user.id).subscribe(res=>{
      this.songs=res;
    })

}
delete(id:any){
    if (confirm('bạn có chắc muốn xóa không?')){
      this.songService.delete(id).subscribe(res=>{
        this.getSong()
      })
    }
}


}
