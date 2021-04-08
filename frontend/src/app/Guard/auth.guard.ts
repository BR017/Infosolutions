import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../Service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.authService.EstaLogueado()) {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
}
