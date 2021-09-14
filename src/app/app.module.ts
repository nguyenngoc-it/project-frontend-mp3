import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './components/layouts/master/master.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SingerListComponent } from './components/singer/singer-list/singer-list.component';
import { SingerCreateComponent } from './components/singer/singer-create/singer-create.component';
import { SingerDetailComponent } from './components/singer/singer-detail/singer-detail.component';
import {HttpClient} from "@angular/common/http";
import { ResetComponent } from './components/users/reset/reset.component';
import {CreateSongComponent} from "./components/song/create-song/create-song.component";

import {RegisterComponent} from "./components/users/register/register.component";
import { LoginComponent } from './components/users/login/login.component';
import { ForgotComponent } from './components/users/forgot/forgot.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ShowSongUserComponent } from './components/song/show-song-user/show-song-user.component';
import { EditSongComponent } from './components/song/edit-song/edit-song.component';
import { EditprofileComponent } from './components/users/editprofile/editprofile.component';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import { PlaylistComponent } from './components/playlist/playlist/playlist.component';
import { MyPlaylistComponent } from './components/playlist/my-playlist/my-playlist.component';
import { EditPlaylistComponent } from './components/playlist/edit-playlist/edit-playlist.component';
import { PlaylistDetailComponent } from './components/playlist/playlist-detail/playlist-detail.component';
import { PlaylistAllComponent } from './components/playlist/playlist-all/playlist-all.component';
import {CommonModule} from "@angular/common";
import {AudioServiceService} from "./services/audio-service.service";
import { PlayComponent } from './components/play/play.component';
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CreateSongComponent,
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    ProfileComponent,
    DashboardComponent,
    SingerListComponent,
    SingerCreateComponent,
    SingerDetailComponent,
    ShowSongUserComponent,
    EditSongComponent,
    SingerDetailComponent,
    ResetComponent,
    EditprofileComponent,
    ChangePasswordComponent,
    PlaylistComponent,
    MyPlaylistComponent,
    EditPlaylistComponent,
    PlaylistDetailComponent,
    PlaylistAllComponent,
    PlayComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    FormsModule,
   ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [AudioServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
