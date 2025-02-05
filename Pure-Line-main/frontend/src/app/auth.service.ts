import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://54.242.242.49:8083/auth'; // URL del backend según el entorno activo

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(user: { username: string; password: string }): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiURL}/login`, user, { observe: 'response' }); 
  }

  // Método para registrar un nuevo usuario
  register(user: { username: string; password: string; email?: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }
}