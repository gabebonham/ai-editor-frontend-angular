import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly PATH = environment.apiUrl + '/profile'
    private platformId = inject(PLATFORM_ID);
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    // getAnthropicKey(): string | undefined {
    //     this.authService.getEmail();
    //     this.http.get(this.PATH +/)
    // }
}