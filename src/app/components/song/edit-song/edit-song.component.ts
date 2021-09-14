import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../../services/song/song.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {SingerService} from "../../../services/singer.service";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

  updateForm: FormGroup | any;
  songEdit: any;
  categories: any;
  singers: any;
  id = this.activa.snapshot.params.id;
  user=JSON.parse(<string>localStorage.getItem('user'));
  uploadProgress$?: Observable<number>;
  uploadProgress$1?: Observable<number>;

  constructor(private fb: FormBuilder,
              private songService: SongService,
              private route: Router,
              private activa: ActivatedRoute,
              private storage: AngularFireStorage,
              private singerService: SingerService,
  ) {

  }

  ngOnInit(): void {
    this.songService.findSongById(this.id).subscribe(res => {
      this.songEdit = res;
      this.updateForm = this.fb.group({
        song_name: [this.songEdit.song_name],
        song_image: [this.songEdit.song_image],
        path: [this.songEdit.path],
        author: [this.songEdit.author],
        singer_id: [this.songEdit.singer_id],
        category_id: [this.songEdit.category_id],
        lyric: [this.songEdit.lyric, Validators.required]
      })
    });
    this.allCategory();
    this.getAllSinger();
  }

  onSubmit() {
    let data = this.updateForm?.value;
    this.songService.update(this.id, data).subscribe(res => {
      this.route.navigate([ '/'+this.user.id+'/profile'])
    })
  }

  onFileSelectedFile(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    // @ts-ignore
    this.uploadProgress$ = this.storage.upload(filePath, file).percentageChanges();
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.updateForm?.get('path')?.setValue(url);

      })))
    ).subscribe();
  }

  onFileSelectedImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    // @ts-ignore
    this.uploadProgress$1 = this.storage.upload(filePath, file).percentageChanges();
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.updateForm?.get('song_image')?.setValue(url);
      })))
    ).subscribe();
  }

  allCategory() {
    this.songService.getAllCategory().subscribe(res => {
      this.categories = res;
    })
  }

  getAllSinger() {
    this.singerService.getAllSinger().subscribe(res => {
      this.singers = res;
    })
  }

  get name() {
    return this.updateForm?.get('song_name');
  }

  get author() {
    return this.updateForm?.get('author');
  }

  get singer() {
    return this.updateForm?.get('singer_id');
  }

  get category() {
    return this.updateForm?.get('category_id');
  }

  get des() {
    return this.updateForm?.get('lyric');
  }


}
