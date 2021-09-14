import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  apiUrl = environment.url_api;
  constructor(public http: HttpClient) {
    super(http)
  }
  status(){
    let token= localStorage.getItem('token');
    if (!token){
      return false;
    }
    else {
      return true}
  }

  singUp(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}` +'register', data)
  }
  login(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}` + 'login', data)
  }
  logOut():Observable<any>{
    return this.http.post<any>(`${this.apiUrl}` + 'logout',null, this.httpOption);
  }
  forgot(email:string):Observable<any>{
    return  this.http.post(`${this.apiUrl}` + 'forgot', {email:email});
  }
  reset(token: string, password: string, password_confirmation:string):Observable<any>{
    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return  this.http.post(`${this.apiUrl}` + 'reset', data);
  }

  findUserById(id:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}` + 'users/'+ id, this.httpOption);
  }
  update(id:any,data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}` + 'users/' + id +'/update', data, this.httpOption)
  }
  changePassword(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}` + 'users/' +'change-password', data,this.httpOption)
  }
}
