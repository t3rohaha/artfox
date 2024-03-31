import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { LoginRequest } from '../services/requests/auth/login.request';
import { environment }  from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

    protected baseUrl = environment.artfox.apiUrl + '/auth';

    constructor(private http: HttpClient) { }

    login(data: LoginRequest): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/login', data);
    }

    authorize(): Observable<any> {
        return this.http.get<any>(this.baseUrl);
    }

    removeToken(): void {
        localStorage.removeItem('auth_token');
    }

    saveToken(token: string): void {
        localStorage.setItem('auth_token', token);
    }
}
