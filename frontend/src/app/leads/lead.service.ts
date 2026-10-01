import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead, LeadRequest } from './lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private readonly apiUrl = 'http://localhost:8080/api/leads';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }

  getById(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`);
  }

  create(request: LeadRequest): Observable<Lead> {
    return this.http.post<Lead>(this.apiUrl, request);
  }

  update(id: number, request: LeadRequest): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
