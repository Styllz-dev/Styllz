import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logout } from "../../models/logout.model";


const baseUrl = '/api/logout';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${baseUrl}/`);
  }
}