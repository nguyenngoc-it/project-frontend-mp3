import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterComponent} from "./components/layouts/master/master.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CreateSongComponent} from "./components/song/create-song/create-song.component";

import {RegisterComponent} from "./components/users/register/register.component";
import {LoginComponent} from "./components/users/login/login.component";
import {ForgotComponent} from "./components/users/forgot/forgot.component";
import {ProfileComponent} from "./components/users/profile/profile.component";
import {SingerListComponent} from "./components/singer/singer-list/singer-list.component";
import {SingerCreateComponent} from "./components/singer/singer-create/singer-create.component";
import {SingerDetailComponent} from "./components/singer/singer-detail/singer-detail.component";
import {ResetComponent} from "./components/users/reset/reset.component";
import {EditSongComponent} from "./components/song/edit-song/edit-song.component";
import {EditprofileComponent} from "./components/users/editprofile/editprofile.component";
import {ChangePasswordComponent} from "./components/users/change-password/change-password.component";
import {PlaylistComponent} from "./components/playlist/playlist/playlist.component";
import {EditPlaylistComponent} from "./components/playlist/edit-playlist/edit-playlist.component";
import {PlaylistDetailComponent} from "./components/playlist/playlist-detail/playlist-detail.component";
import {PlaylistAllComponent} from "./components/playlist/playlist-all/playlist-all.component";



const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'create-song',
        component: CreateSongComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
      ,
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'reset',
        component: ResetComponent
      },
      {
        path:'change-password',
        component: ChangePasswordComponent
      },
      {
        path:':id/profile',
        component: ProfileComponent
      },
      {
        path:':id/edit-profile',
        component: EditprofileComponent
      },
      {
        path: 'singer',
        component: SingerListComponent
      },
      {
        path: 'singer/create',
        component: SingerCreateComponent
      },
      {
        path: 'singer/detail/:id',
        component: SingerDetailComponent
      },
      {
        path: 'singer/create',
        component: SingerCreateComponent
      },
      {
        path: ':id/edit-song',
        component: EditSongComponent
      },
      {
        path: 'playlist/create',
        component: PlaylistComponent
      },
      {
        path: ':id/playlist/edit',
        component: EditPlaylistComponent
      },
      {
      path:':id/playlist/detail',
        component:PlaylistDetailComponent
      },{
      path:'all-playlist',
        component:PlaylistAllComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
