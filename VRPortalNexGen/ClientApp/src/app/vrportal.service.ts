import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class VrportalService {
  headers: HttpHeaders;
  options: any;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json',
        Accept: 'q=0.8;application/json;q=0.9'});
        this.options = { headers: this.headers };
    }

    createService(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
        .post<any>(url, body, this.options)
        .pipe(map(Data => Data), catchError(Error => Error));
    }

    createGetService(url: string): Observable<any> {
        return this.http
            .get<any>(url)
            .pipe(map(Data => Data), catchError(Error => Error));
        }

    DownloadExcelFile(url: string, param: any): Observable<any> {
        const body = JSON.stringify(param);
        return this.http.post(url, body, { responseType: 'blob'as 'json', headers: this.headers});
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? '${error.status} - ${error.statusText}' : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

