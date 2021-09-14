import { Component, OnInit } from '@angular/core';
import {StreamState} from "../../interfaces/stream-state";
import {SongService} from "../../services/song/song.service";
import {AudioServiceService} from "../../services/audio-service.service";
import {Song} from "../../song";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  state!: StreamState;
  listSong:Song[]=[];
  currentFile: any = {};
  constructor(private songService:SongService,
              public audioService: AudioServiceService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    this.currentFile.index=0;
    this.songService.getAllSong().subscribe(res=>{
      this.listSong=res;

    })
  }
  playStream(url:any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }
  openFile(file:Song,index:number) {
    this.currentFile = { file,index} ;
    this.audioService.stop();
    this.playStream(file.path);
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

  next() {
    const index = this.currentFile.index + 1;
    console.log(index)
    const file = this.listSong[index];
    console.log(file)
    this.openFile(file, index);
  }
  previous() {
    const index = this.currentFile.index - 1;
    const file = this.listSong[index];
    this.openFile(file, index);
  }
  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.listSong.length - 1;
  }
  onSliderChangeEnd(change:Event) {
    const value=(change.target as HTMLInputElement).value;
    console.log(change)
    this.audioService.seekTo(value);
  }


}
