import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    Correo: '',
    Password: '',
  };
  constructor(
    private authService: AuthServiceService,
    private router: Router
    ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/Home']);
    }
  }
  signUp() {
    const datosUser = {
      Correo: this.user.Correo,
      Contraseña: this.user.Password,
    };
    this.authService.Login(datosUser)
    .subscribe((res) => {
      console.log(res)
      localStorage.setItem('token', JSON.stringify(res.User));
      if (res.User.Permisos == "true") {
        this.router.navigate(['/Home']);
      }
      else{
        this.router.navigate(['/Inventarios']);
      }
    },
    err=>{
      if (err.status === 404) {
        alert('Verifica tus credenciales')
      }
    }
    );
  }
}
