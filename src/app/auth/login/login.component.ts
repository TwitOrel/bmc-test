import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    const result = this.auth.login(this.email, this.password);

    if (result === 'Success') {
      this.router.navigate(['/dashboard']);
    } else if (result === 'Wrong-email') {
      this.error = 'Email does not exist';
    } else if (result === 'Wrong-password') {
      this.error = 'Incorrect password';
    }
  }
}
