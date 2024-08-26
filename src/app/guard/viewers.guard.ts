import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ViewersGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getRole() === 'viewer') {
      return true;
    } else {
      this.router.navigateByUrl('/forbidden');
      return false;
    }
  }
}
