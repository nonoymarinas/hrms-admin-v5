import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // adjust path

@Component({
  selector: 'app-auth-layout',
  imports: [],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  constructor(private router: Router, private auth: AuthService) {} // ✅ inject Router and AuthService
  onLogInClick(): void {
    this.auth.setLoggedIn(true);
    this.router.navigate(['/']);
  }
}
