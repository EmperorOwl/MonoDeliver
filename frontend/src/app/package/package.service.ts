import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BASE_API_URL } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = `${BASE_API_URL}/packages`;

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(`${apiUrl}`, data, httpOptions);
  }

  retrieve() {
    return this.http.get(`${apiUrl}`, httpOptions);
  }

  update(data: any) {
    return this.http.patch(`${apiUrl}`, data, httpOptions);
  }

  delete(_id: string) {
    return this.http.delete(`${apiUrl}/${_id}`, httpOptions);
  }
}
