// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PATH = environment.apiUrl + '/auth'
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post(this.PATH + '/login', { email, password });
  }
  register(email: string, password: string, username:string): Observable<any> {
    return this.http.post(this.PATH + '/register', { email, password, username });
  }
  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}