import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from 'src/app/Service/productos.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  datos = {
    nombre: '',
    cantidad: '',
    precio: '',
    Proveedor: '',
  };

  privateTasks = [];

  bandera = false;
  banderaEdicion = {
    actualzar: false,
    uid: '',
  };

  constructor(private analistaService: ProductosService) {}

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
        this.privateTasks = res.producto;
        if (res.producto.length > 0) {     
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
        _id: this.banderaEdicion.uid,
      };
      this.analistaService.ActualizarAnalista(newUser).subscribe((res) => {
        this.obtenerAnalista();
        this.myForm.resetForm();
        this.banderaEdicion.actualzar = false;
      });
    } else {
      const newUser = {
        ...this.datos,
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
      nombre: analista.nombre,
      cantidad: analista.cantidad,
      precio: analista.precio,
      proveedor: analista.Proveedor
    });
  }
}
