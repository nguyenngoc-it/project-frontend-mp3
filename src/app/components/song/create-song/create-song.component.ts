import { Component, OnInit } from '@angular/core';
import {SongService} from "../../../services/song/song.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {SingerService} from "../../../services/singer.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {

  formAdd?: FormGroup;
  categories: any;
  singers: any;
  uploadProgress$?: Observable<number>;
  uploadProgress$1?: Observable<number>;
  user = JSON.parse(<string>localStorage.getItem('user'));

  constructor(private songService: SongService,
              private singerService:SingerService,
              private storage: AngularFireStorage,
              private fb: FormBuilder,
              private route: Router,
              ) {
    this.formAdd = this.fb.group({
        song_name: ['',Validators.required],
        song_image: ['',Validators.required],
        path: ['',Validators.required],
        singer_id: ['Ca sĩ',Validators.required],
        category_id: ['Thể loại',Validators.required],
        user_id: [this.user.id],
        author:['',Validators.required],
      lyric:['',Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.allCategory();
    this.allSinger();
  }

  onFileSelectedFile(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    // @ts-ignore
    this.uploadProgress$ = this.storage.upload(filePath,file).percentageChanges();
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.formAdd?.get('path')?.setValue(url);

      })))
    ).subscribe();
  }

  onFileSelectedImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    // @ts-ignore
    this.uploadProgress$1 = this.storage.upload(filePath,file).percentageChanges();
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.formAdd?.get('song_image')?.setValue(url);
      })))
    ).subscribe();
  }

  submit() {
    let data = this.formAdd?.value;
    console.log(data)
    this.songService.create(data).subscribe(res => {
      this.route.navigate(['']);
    })
  }

  allCategory() {
    this.songService.getAllCategory().subscribe(res => {
      this.categories = res;

    })
  }
  allSinger(){
    this.singerService.getAllSinger().subscribe(res=>{
      this.singers=res;
    })
  }
  get name() { return this.formAdd?.get('song_name'); }
  get author() { return this.formAdd?.get('author'); }
  get singer() { return this.formAdd?.get('singer_id'); }
  get category() { return this.formAdd?.get('category_id'); }
  get des() { return this.formAdd?.get('lyric'); }

}
