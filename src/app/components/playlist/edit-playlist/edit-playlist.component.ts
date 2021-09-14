import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../../services/playlist/playlist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  formEdit?: FormGroup;
  playlistEdit: any;
  uploadProgress$1?: Observable<number>;


  constructor(private services: PlaylistService,
              private router: Router,
              private active: ActivatedRoute,
              private storage: AngularFireStorage,
              private fb: FormBuilder,) {
  }
user=JSON.parse(<string>localStorage.getItem('user'));
  id = this.active.snapshot.params.id
  ngOnInit(): void {
    this.services.edit(this.id).subscribe(res => {
      this.playlistEdit = res;
      this.formEdit = this.fb.group({
        name: [this.playlistEdit.name],
        description: [this.playlistEdit.description],
        image: [''],
      })
    })
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
        this.formEdit?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }
  submit(){
    let data=this.formEdit?.value;
    console.log(data)
    this.services.update(this.id,data).subscribe(res=>{
      this.router.navigate(['/'+this.user.id+'/profile'])
    })

  }
  get name() { return this.formEdit?.get('name'); }
  get description() { return this.formEdit?.get('description'); }


}
