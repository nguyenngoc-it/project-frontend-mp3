
import {Component, OnInit} from '@angular/core';
import {SingerService} from "../../../services/singer.service";

@Component({
  selector: 'app-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.css']
})
export class SingerListComponent implements OnInit {
  singers: any[] = [];
  totalLength:any;
  page: number=1;
  data:any;
  constructor(private singerService: SingerService) {
  }

  ngOnInit(): void {
    this.getAllSingers();
  }

  getAllSingers() {
    this.singerService.getAllSinger().subscribe(res => {
      this.singers = res;
      this.totalLength = res.length;
    })
  }


}
