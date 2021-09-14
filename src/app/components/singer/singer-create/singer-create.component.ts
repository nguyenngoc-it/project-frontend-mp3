import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song/song.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import {SingerService} from "../../../services/singer.service";

@Component({
  selector: 'app-singer-create',
  templateUrl: './singer-create.component.html',
  styleUrls: ['./singer-create.component.css']
})
export class SingerCreateComponent implements OnInit {
  createFormSinger: FormGroup | any;
  categories: any;
  singer:any;
  uploadProgress$?: Observable<any>;
  constructor(private singerSerVice: SingerService, private fb: FormBuilder,private songService: SongService,private storage:AngularFireStorage,private router:Router) {
    this.createFormSinger = this.fb.group({
      name: ['',Validators.required],
      image: ['',Validators.required],
      gender: ['Giới tính',Validators.required],
      date: ['',Validators.required],
      music_category: ['Lựa chọn thể loại nhạc',Validators.required],
      band: ['',Validators.required],
      description: ['',Validators.required],
      famousSong: ['',Validators.required],
      moreInfo: ['',Validators.required],
      user_id: [this.user.id]
    });

  }
  user = JSON.parse(<string>localStorage.getItem('user'));

  ngOnInit(): void {
    this.getAllCategory();

  }
  onSubmit() {
    this.singerSerVice.createSinger(this.createFormSinger.value).subscribe((res:any) => {
      console.log(this.createFormSinger.value);
      this.router.navigate(['singer']);
    })
  }
  getAllCategory() {

    this.songService.getAllCategory().subscribe(res => {
      this.categories = res;
    })
  }
  onFileSelectedImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.createFormSinger?.get('image')?.setValue(url);
      })))
    ).subscribe();
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
        this.createFormSinger?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }
  get name(){
    return this.createFormSinger?.get('name');
  }
  get image(){
    return this.createFormSinger?.get('image');
  }
  get gender(){
    return this.createFormSinger?.get('gender');
  }
  get date(){
    return this.createFormSinger?.get('date');
  }
  get music_category(){
    return this.createFormSinger?.get('music_category');
  }
  get band(){
    return this.createFormSinger?.get('band');
  }
  get description(){
    return this.createFormSinger?.get('description');
  }
  get famousSong(){
    return this.createFormSinger?.get('famouseSong');
  }
  get moreInfo(){
    return this.createFormSinger?.get('moreInfo');
  }
}
