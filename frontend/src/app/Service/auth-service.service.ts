import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _UrlBase = 'http://localhost:3000/api/';
  constructor(private http: HttpClient,private router:Router) {}
  Login(user) {
    return this.http.post<any>(this._UrlBase + 'login', user);
  }
  EstaLogueado() {
    return !!localStorage.getItem('token');
  }
  CerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('recargado');
    this.router.navigate(['/Login']);
  }
}
