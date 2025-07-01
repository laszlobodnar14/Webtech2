import { Injectable } from '@angular/core';
import {Gep} from '../shared/models/gep';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, GEPS_REGISTER_URL} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class GepService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/api/geps`);
  }

  getGepById(gepId: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/api/geps/${gepId}`);
  }
  createGep(gep: Gep): Observable<Gep> {
    return this.http.post<Gep>(GEPS_REGISTER_URL, gep);
  }
}
