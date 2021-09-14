import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService {

  // @ts-ignore
  createPlaylist(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'playlist/create', data, this.httpOption)
  }

  // @ts-ignore
  myPlaylist(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'playlist/' + id + '/show', this.httpOption)
  }

  // @ts-ignore
  delete(id: any): Observable<any> {
    return this.http.delete(environment.url_api + 'playlist/' + id + '/delete', this.httpOption)
  }

  // @ts-ignore
  edit(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'playlist/' + id + '/edit', this.httpOption)
  }

  update(id: any, data: any): Observable<any> {
    return this.http.post(environment.url_api + 'playlist/' + id + '/update', data, this.httpOption)
  }

  // @ts-ignore
  getSongPlaylist(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'playlist/' + id + '/song', this.httpOption)

  }

  // @ts-ignore
  removeSongToPlaylist(id: any, songid: any): Observable<any> {
    return this.http.delete(environment.url_api + 'playlist/' + id + '/' + songid + '/remove-song', this.httpOption);
  }

  addSongToPlaylist(id: any, songid: any): Observable<any> {

    return this.http.post(environment.url_api + 'playlist/' + id + '/' + songid + '/add-song', {}, this.httpOption)}


  getCountSong(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'playlist/' + id + '/count', this.httpOption);
  }
  getAll():Observable<any>{
    return this.http.get(environment.url_api+'all-playlist');
  }

}
