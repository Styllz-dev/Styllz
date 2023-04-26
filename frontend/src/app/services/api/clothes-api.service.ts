import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clothes } from '../../models/clothes.model';

const baseUrl = '/api/clothes';

@Injectable({
  providedIn: 'root'
})
export class ClothesApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(baseUrl);
  }

  get(id: any): Observable<Clothes> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}