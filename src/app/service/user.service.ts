import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegisterPayload } from '../store/action/user.action';
import { User } from '../store/constant/interface';
import { environment } from '../../environments/environment';

const API_BASE_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  register(registerData: RegisterPayload): Observable<any> {
    return this.http.post(`${API_BASE_URL}auth/register`, registerData);
  }

  login(payload:any) {
    console.log(payload);
        return this.http.post(`${API_BASE_URL}auth/login`, payload);
  }

  refreshToken(token:any): Observable<User> {
    return this.http.post<User>(`${API_BASE_URL}auth/refresh-token`, token);
  }

  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}auth/users/${userId}`);
  }

  logout(): void {
    console.log('User logged out locally.');
  }
}