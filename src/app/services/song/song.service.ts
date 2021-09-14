import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BaseService} from "../base.service";

@Injectable({
  providedIn: 'root'
})
export class SongService extends BaseService {

  create(data: any): Observable<any> {

    return this.http.post(environment.url_api + 'song/create', data,this.httpOption );

  }

  getAllSong():Observable<any> {
    return this.http.get(environment.url_api + 'song/list');
  }

  getAllCategory(): Observable<any> {
    return this.http.get(environment.url_api + 'category');
  }

  get5Song(): Observable<any> {
    return this.http.get(environment.url_api + 'song/new');
  }

  mySong(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'song/' + id + '/my-song',this.httpOption );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(environment.url_api + 'song/' + id + '/delete',this.httpOption);
  }

  findSongById(id: any) {
    return this.http.get(environment.url_api+'song/'+id+'/find-song',this.httpOption);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.post(environment.url_api + 'song/' + id + '/update', data, this.httpOption)
  }
  // @ts-ignore
  getSingerBySongId(id:any):Observable<any>{
    return this.http.get(environment.url_api +id +'/singer',this.httpOption)
  }
}
