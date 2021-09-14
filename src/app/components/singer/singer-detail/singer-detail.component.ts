import {Component, OnInit} from '@angular/core';
import {SingerService} from "../../../services/singer.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css']
})
export class SingerDetailComponent implements OnInit {
// @ts-ignore
  id = +this.route.snapshot.paramMap.get('id');
  singer: any;
  songs: any;
  constructor(private singerService: SingerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getASinger();
    this.getSongBySinger();
  }

  getASinger() {
    this.singerService.singerDetail(this.id).subscribe(res => {
      this.singer = res;
    })
  }
  getSongBySinger()
  {
    this.singerService.getSongBySinger(this.id).subscribe(res => {
      this.songs = res;
      console.log(this.songs)
    })
  }
}
