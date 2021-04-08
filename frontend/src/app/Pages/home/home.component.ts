import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalistaService } from 'src/app/Service/analista.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  datos = {
    Nombre: '',
    Correo: '',
    password: '',
    Identificacion: '',
    Telefono: '',
    Permisos: '',
  };

  privateTasks = [];

  bandera = false;
  banderaEdicion = {
    actualzar: false,
    uid: '',
  };

  constructor(private analistaService: AnalistaService) {}

  @ViewChild('myForm', { static: false }) myForm: NgForm;

  ngOnInit(): void {
    if (!localStorage.getItem('recargado')) {
      this.refrescarPagina();
    }
    this.obtenerAnalista();
  }
  refrescarPagina(): void {
    window.location.reload();
    localStorage.setItem('recargado', 'true');
  }

  obtenerAnalista() {
    this.analistaService.GetAnalistas().subscribe(
      (res) => {
        this.privateTasks = res.analistas;
        if (res.analistas.length > 0) {
          this.bandera = true;
        } else {
          this.bandera = false;
        }
      },
      (err) => (this.bandera = false)
    );
  }

  RegistrarUsuario() {
    if (this.banderaEdicion.actualzar) {
      const newUser = {
        ...this.datos,
        Contraseña: this.datos.password,
        _id:this.banderaEdicion.uid
      };
      this.analistaService.ActualizarAnalista(newUser).subscribe((res) => {
        this.obtenerAnalista();
        this.myForm.resetForm();
        this.banderaEdicion.actualzar = false;
      });

    } else {
      const newUser = {
        ...this.datos,
        Contraseña: this.datos.password,
      };
      this.analistaService.crearAnalista(newUser).subscribe((res) => {
        this.obtenerAnalista();
        this.myForm.resetForm();
      });
    }
  }
  EliminarAnalista(id) {
    this.analistaService.EliminarAnalista(id).subscribe((res) => {
      console.log(res);
      this.obtenerAnalista();
    });
  }
  editarAnalista(analista) {
    this.banderaEdicion.actualzar = true;
    this.banderaEdicion.uid = analista._id;
    console.log(this.myForm.controls);
    this.myForm.control.patchValue({
      email: analista.Correo,
      name: analista.Nombre,
      password: '',
      phone: analista.Telefono,
      select: analista.Permisos,
      uid: analista.Identificacion,
    });
  }
}
