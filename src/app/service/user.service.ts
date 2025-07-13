// // src/app/services/user.service.ts (AFTER FIX)

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { catchError, Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { User } from '../store/constant/interface';
// import { ErrorService } from './Error/error.service';

// const API_BASE_URL = environment.BACKEND_URL;

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   _login: string = 'auth/login';
//   _register: string = 'auth/register';
//   _logout: string = 'auth/logout';
//   _userProfile: string = 'users/profile';
//   _allUsers: string = 'users';
//   _userById: string = 'users';

//   constructor(private http: HttpClient, private error:ErrorService) { }

//   login(credentials: Pick<User, 'identifier' | 'password' | 'rememberMe'>): Observable<User> {
//     console.log('Attempting login with:', credentials);
//     return this.http.post<User>(`${API_BASE_URL}${this._login}`, credentials).pipe(catchError(this.error.handleError));
//   }

//   register(user: User): Observable<User> {
//     console.log('Attempting registration for:', user.identifier);
//     return this.http.post<User>(`${API_BASE_URL}${this._register}`, user);
//   }

//   logout(): Observable<any> {
//     console.log('Attempting logout');
//     return this.http.post<any>(`${API_BASE_URL}${this._logout}`, {});
//   }

//   getUserById(userId: number): Observable<User> {
//     console.log('Attempting to fetch user by ID:', userId);
//     return this.http.get<User>(`${API_BASE_URL}${this._userById}/${userId}`);
//   }

//   getAllUsers(): Observable<User[]> {
//     console.log('Attempting to fetch all users');
//     return this.http.get<User[]>(`${API_BASE_URL}${this._allUsers}`);
//   }
// }