import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Styles } from '../../models/styles.model';

const baseUrl = '/api/styles';

@Injectable({
  providedIn: 'root'
})
export class StylesApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Styles[]> {
    return this.http.get<Styles[]>(baseUrl);
  }

  get(id: any): Observable<Styles> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}