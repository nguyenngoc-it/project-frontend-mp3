import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class SingerService extends BaseService{



  getAllSinger(): Observable<any> {
    return this.http.get(environment.url_api+'singer')
  }
  singerDetail(id:number): Observable<any>{
    return this.http.get(environment.url_api + 'singer/detail/'+id);
  }
  createSinger(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'store', data,this.httpOption);
  }
  getSongBySinger(id:number):Observable<any>{
    return this.http.get(environment.url_api + 'singer/songs/' + id);
  }
}
