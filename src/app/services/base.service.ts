import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  accessToken = JSON.parse(<string>localStorage.getItem('token'));

  public httpOption = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    )
  }
  constructor(public http: HttpClient) { }
}
