import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BASE_API_URL } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = `${BASE_API_URL}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${apiUrl}/login`, data, httpOptions);
  }

  register(data: any) {
    return this.http.post(`${apiUrl}/register`, data, httpOptions);
  }
}
