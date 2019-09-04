import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, timeout } from 'rxjs/operators';
const TIMEOUT = 5000;
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private http: HttpClient,
    ) { }

    get(type: string, endpoint: string): Promise<object> {
        console.log(type, ' ', endpoint);
        return this.http.get(environment.rest[type] + endpoint, { headers: this.headers }).pipe(timeout(TIMEOUT), retry(2)).toPromise();
    }

    post(type: string, endpoint: string, body: object): Promise<object> {
        return this.http.post(environment.rest[type] + endpoint, body, { headers: this.headers }).pipe(timeout(TIMEOUT), retry(2)).toPromise();
    }

    put(type: string, endpoint: string, body: object): Promise<object> {
        return this.http.put(environment.rest[type] + endpoint, body, { headers: this.headers }).pipe(timeout(TIMEOUT), retry(2)).toPromise();
    }

    patch(type: string, endpoint: string, body: object): Promise<object> {
        return this.http.patch(environment.rest[type] + endpoint, body, { headers: this.headers }).pipe(timeout(TIMEOUT), retry(2)).toPromise();
    }

    delete(type: string, endpoint: string): Promise<object> {
        return this.http.delete(environment.rest[type] + endpoint, { headers: this.headers }).pipe(timeout(TIMEOUT), retry(2)).toPromise();
    }

    get headers(): HttpHeaders {
        const header = new HttpHeaders();
        // header.append('Authorization', `Bearer ${this.userS.Token}`);
        header.append('Content-Type', 'application/json');
        return header;
    }

}
