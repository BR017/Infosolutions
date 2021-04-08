import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css'],
})
export class SiderbarComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.obtenerdatos();
  }
  Nombre = '';
  Imagen = '';
  permisos = false;
  cerrarSesion() {
    this.authService.CerrarSesion();
  }

  cambioPestana(donde) {
    localStorage.removeItem('recargado');
    this.router.navigate([`/${donde}`]);
  }

  obtenerdatos() {
    const datos = JSON.parse(localStorage.getItem('token'));
    this.Nombre = datos.Nombre;
    this.Imagen = datos.imgPerfil;
    this.permisos = (datos.Permisos =="true"); ;
  }
}
