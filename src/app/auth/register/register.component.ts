import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
  
    const passwordValidationError = this.validatePassword();
    if (passwordValidationError) {
      this.error = passwordValidationError;
      return;
    }
  
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        console.log(`Wellcome ${this.email}`)
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed';
      }
    });
  }
  
  validatePassword(): string | null {
    if (this.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/[A-Z]/.test(this.password)) {
      return 'Password must contain at least one uppercase letter';
    }
    return null;
  }
  
}
