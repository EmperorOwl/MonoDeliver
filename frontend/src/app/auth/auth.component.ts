import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

class Login {
  username: String = '';
  password: String = '';
}

class Register {
  username: String = '';
  password: String = '';
  password2: String = '';
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  login: Login = new Login();
  register: Register = new Register();
  accountCreated: Boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.login(this.login).subscribe((res) => {
      this.authService.isAuthenticated = true;
      this.router.navigate(['/']);
    });
  }

  registerUser() {
    this.authService
      .register(this.register)
      .subscribe((res) => (this.accountCreated = true));
  }
}
