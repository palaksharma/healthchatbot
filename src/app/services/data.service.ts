
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NG_AUTH_TOKEN } from '../common/ng-constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  apiPost(url: string, body: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(NG_AUTH_TOKEN));

    const httpOptions = {
      headers: headers
    };

    return this.http.post(url, body, httpOptions);
  }



}
