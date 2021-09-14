import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  formProfile: FormGroup | undefined;
  userID: any;
  data: any;


  constructor(private userService: UserService,
              private active: ActivatedRoute,
              private router: Router,
              private form: FormBuilder,
              private storage: AngularFireStorage) {
  }

  // @ts-ignore
  id = +this.active.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.userService.findUserById(this.id).subscribe(res => {
      this.userID = res;
      this.formProfile = this.form.group({
        avatar: [this.userID.user.avatar],
        name: [this.userID.user.name],
        email: [this.userID.user.email],
        address: [this.userID.user.address],
        phone: [this.userID.user.phone]
      })
    })

  }

  update() {
    let data = this.formProfile?.value;
    this.userService.update(this.id, data).subscribe(res => {
      this.data = res;
      return this.router.navigate([ '/'+this.id+'/profile']);
    })
  }

  onFileSelectedImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.formProfile?.get('avatar')?.setValue(url);
      })))
    ).subscribe();
  }

}
