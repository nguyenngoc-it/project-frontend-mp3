import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../../services/playlist/playlist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../../../services/song/song.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentService} from "../../../services/comment/comment.service";
import {StreamState} from "../../../interfaces/stream-state";
import {Song} from "../../../song";
import {AudioServiceService} from "../../../services/audio-service.service";

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlist: any;
  mySongs: any;
  songs: any;
  count: any;
  commentt: any;
  state!: StreamState;
  listSong:Song[]=[];
  currentFile: any = {};
  formComment?: FormGroup;
  ur: any
  cmtid:any;

  constructor(private service: PlaylistService,
              private active: ActivatedRoute,
              private router: Router,
              private songService: SongService,
              private fb: FormBuilder,
              private commentService: CommentService,
              public audioService: AudioServiceService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  id = this.active.snapshot.params.id
  user = JSON.parse(<string>localStorage.getItem('user'))

  ngOnInit(): void {
    this.getPlaylist();
    this.getMySong();
    this.getAllSong();
    this.getCount();
    this.getComment();
    this.formComment = this.fb.group({
      content: [''],
      user_id: [this.user.id],
      play_list_id: [this.id]
    });
    this.currentFile.index=0;
  }

  getPlaylist() {
    this.service.edit(this.id).subscribe(res => {
      this.playlist = res;
    })
  }

  getMySong() {
    this.service.getSongPlaylist(this.id).subscribe(res => {
      this.mySongs = res;
    })
  }

  getAllSong() {
    this.songService.getAllSong().subscribe(res => {
      this.songs = res;
    })
  }

  removeSong(songid: any) {
    if (confirm('bạn có muốn xóa bài hát ra khỏi playlist? ')) {
      this.service.removeSongToPlaylist(this.id, songid).subscribe(res => {
        this.getMySong();
        this.getCount();
      })
    }
  }

  addSong(songid: any) {
    this.service.addSongToPlaylist(this.id, songid).subscribe(res => {
      this.getMySong();
    })
  }

  getCount() {
    this.service.getCountSong(this.id).subscribe(res => {
      this.count = res;
    })
  }

  comment() {
    let data = this.formComment?.value;
    this.commentService.createComment(data).subscribe(res => {
    this.load();
    })
  }

  getComment() {
    this.commentService.getComment(this.id).subscribe(res => {
      this.commentt = res
    })
  }
  load(){
    window.location.reload();
  }
  delete(id:any){
 if(confirm('bạn có chắc muốn xóa comment')){
   this.commentService.delete(id).subscribe(res=>{
     this.load();
   })
 }
  }
 check(id:any){
    if (this.user.id=id){
      return false;
    }else {
      return true;
    }
 }
 check1(){
    if (this.user.id==this.playlist.user_id){
      return false;
    }else {
      return true;
    }
 }

  playStream(url:any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }
  openFile(file:any) {
    this.currentFile =  file ;
    this.audioService.stop();
    this.playStream(file);
  }
  pause() {
    this.audioService.pause();
  }
  play() {
    this.audioService.play();
  }
  stop() {
    this.audioService.stop();
  }


}
