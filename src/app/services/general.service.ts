import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class GeneralService {

  public apiUrl = `${environment.baseUrl}`;
  
  constructor( private _http: HttpClient) { }

  get(url: string): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this._http.get(urlStr).pipe(map( response => response ));
  }

  post(url: string, body): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this._http.post(urlStr, body).pipe(map( response => response ));
  }

  put(url: string, body): Observable<any> {
     var urlStr = this.apiUrl + url;
     return this._http.put(urlStr, body).pipe(map( response => response ));
  }

  delete(url: string): Observable<any> {
    var urlStr = this.apiUrl + url;
    return this._http.delete(urlStr).pipe(map( response => response ));
  }
}
