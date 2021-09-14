import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService{

  createComment(data:any):Observable<any>{
    return  this.http.post(environment.url_api +'comment/create',data,this.httpOption)
  }
  getComment(id:any):Observable<any>{
    return this.http.get(environment.url_api +'comment/'+id+ '/get-comment')
  }
  delete(id:any):Observable<any>{
    return this.http.delete(environment.url_api + 'comment/'+id+'/delete',this.httpOption)
  }
}
