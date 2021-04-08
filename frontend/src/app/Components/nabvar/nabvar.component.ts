import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css'],
})
export class NabvarComponent implements OnInit {
  constructor(private authService: AuthServiceService) {}
  Nombre = '';
  Imagen = ''
  ngOnInit(): void {
    this.obtenerdatos()
  }
  cerrarSesion() {
    this.authService.CerrarSesion();
  }
  obtenerdatos() {
    const datos = JSON.parse(localStorage.getItem('token'));
    this.Nombre = datos.Nombre
    this.Imagen = datos.imgPerfil
  }
}
