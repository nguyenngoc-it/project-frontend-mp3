import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {PlaylistService} from "../../../services/playlist/playlist.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  formAdd?: FormGroup;
  uploadProgress$1?: Observable<number>;
  user = JSON.parse(<string>localStorage.getItem('user'));

  constructor(private storage: AngularFireStorage,
              private fb: FormBuilder,
              private route: Router,
              private playlistService: PlaylistService
  ) {
    this.formAdd = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        user_id: [this.user.id],
        image: ['']
      }
    );
  }

  ngOnInit(): void {
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
        this.formAdd?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }

  submit() {
    let data = this.formAdd?.value;
    console.log(data)
    this.playlistService.createPlaylist(data).subscribe(res => {
      this.route.navigate(['']);
    })
  }

  get name() {
    return this.formAdd?.get('name');
  }

  get description() {
    return this.formAdd?.get('description');
  }
}
