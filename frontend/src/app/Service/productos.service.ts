import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private _UrlBase = 'http://localhost:3000/api/';
  constructor(private http: HttpClient, private router: Router) {}
  GetAnalistas() {
    return this.http.get<any>(`${this._UrlBase}Inventario`);
  }
  crearAnalista(datos) {
    return this.http.post(`${this._UrlBase}Inventario/create`, datos);
  }
  EliminarAnalista(id) {
    return this.http.delete(`${this._UrlBase}Inventario/_id/${id}`);
  }
  ActualizarAnalista(datos) {
    return this.http.put(`${this._UrlBase}Inventario/_id/${datos._id}`, datos);
  }
}
