import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PATH = environment.apiUrl + '/auth'
  private readonly JWT_KEY = environment.jwtKey
  private platformId = inject(PLATFORM_ID);
  private authenticated = signal<boolean | null>(null);
  constructor(private http: HttpClient) { }

  isLoading(): boolean {
    return this.authenticated() === null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.PATH + '/login', { email, password });
  }
  register(email: string, password: string, confirmPassword: string, username: string): Observable<any> {
    if (password !== confirmPassword) return of({ success: false, message: 'Senhas são diferentes.' });
    return this.http.post(this.PATH + '/register', { email, password, username });
  }
  logout(): Observable<any> {
    this.authenticated.set(false);
    return this.http.post(this.PATH + '/logout', {}, { withCredentials: true });
  }
  
  checkAuth(): boolean | null {
    return (this.authenticated());
  }
  verifySession(): Observable<boolean> {
    if (this.authenticated() !== null) {
      return of(this.authenticated()!);
    }

    return this.http.get<{ success: boolean }>(this.PATH + '/me', { withCredentials: true }).pipe(
      tap(res => this.authenticated.set(res.success)),
      map(res => res.success),
      catchError(() => {
        this.authenticated.set(false);
        return of(false);
      }),
      shareReplay(1)
    );
  }
  setAuthenticated(value: boolean) {
    this.authenticated.set(value);
  }
  getUsername(): string | undefined {
    if (!isPlatformBrowser(this.platformId)) return;
    const userRaw = localStorage.getItem('user')
    if (!userRaw) return;
    try {
      const user = JSON.parse(userRaw);
      return user.username
    } catch (err) {
      return;
    }
  }
  getEmail(): string | undefined {
    if (!isPlatformBrowser(this.platformId)) return;
    const userRaw = localStorage.getItem('user')
    if (!userRaw) return;
    try {
      const user = JSON.parse(userRaw);
      return user.email
    } catch (err) {
      return;
    }
  }
}