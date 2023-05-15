import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileApiModel } from "../../models/profile-api-model.model";


const baseUrl = '/api/get_profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(private http: HttpClient) { }

  get(): Observable<ProfileApiModel> {
    return this.http.get(`${baseUrl}`);
  }
}