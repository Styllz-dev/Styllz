import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prompt } from '../../models/prompt.model';


const baseUrl = '/api/prompts';

@Injectable({
  providedIn: 'root'
})
export class PromptApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(baseUrl);
  }

  get(id: any): Observable<Prompt> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}