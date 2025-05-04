import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  repeatPassword = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.repeatPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const success = this.auth.register(this.email, this.password);
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'Email already exists';
    }
  }
  
}
