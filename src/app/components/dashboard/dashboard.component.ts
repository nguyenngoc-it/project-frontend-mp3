import {Component, OnInit} from '@angular/core';
import {SongService} from "../../services/song/song.service";
import {StreamState} from "../../interfaces/stream-state";
import {AudioServiceService} from "../../services/audio-service.service";
import {PlaylistService} from "../../services/playlist/playlist.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  songs: any;
  song5: any;
  searchVal: any;
  getAllSingerSong: any
  totalLength:any;
  page:any;
  playlists:any;
  state!: StreamState;
  currentFile: any = {};

  constructor(private songService: SongService,
              public audioService: AudioServiceService,
              private playlistService:PlaylistService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    this.get5Song();
    this.getAllSong();
    this.getPlaylist()
  }

  getAllSong() {
    this.songService.getAllSong().subscribe(res => {
      this.songs = res;
      this.searchVal=this.songs;
    })
  }


  get5Song() {
    this.songService.get5Song().subscribe(res => {
      this.song5 = res;

    })
  }

  findAllKeyWord(key: any) {
    return this.songs.filter((val: { song_name: any; }) => {
      return (val.song_name.toLowerCase().indexOf(key) != -1);
    })
  }

  searchAll(val: any) {
    let keyWord = val.target.value.toLowerCase();
    this.songs=(keyWord)?this.findAllKeyWord(keyWord):this.searchVal;
    return this.findAllKeyWord(keyWord);
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
  getPlaylist(){
    this.playlistService.getAll().subscribe(res=>{
      this.playlists=res;
      console.log(res)

    })
  }


}
