import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AnalistaService {
  private _UrlBase = 'http://localhost:3000/api/';
  constructor(private http: HttpClient, private router: Router) {}
  GetAnalistas() {
    return this.http.get<any>(`${this._UrlBase}analistas`);
  }
  crearAnalista(datos) {
    return this.http.post(`${this._UrlBase}analistas/create`, datos);
  }
  EliminarAnalista(id) {
    return this.http.delete(`${this._UrlBase}analistas/_id/${id}`);
  }
  ActualizarAnalista(datos) {
    return this.http.put(`${this._UrlBase}analistas/_id/${datos._id}`, datos);
  }
}
