import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER = 'user';

  register(email: string, password: string): boolean {
    const users = this.getAllUsers();
    if (users[email]) return false;
    users[email] = { password };
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): 'Success' | 'Wrong-password' | 'Wrong-email' {
    const users = this.getAllUsers();

    if (!users[email]) {
      return 'Wrong-email';
    }

    if (users[email].password !== password) {
      return 'Wrong-password';
    }

    localStorage.setItem(this.CURRENT_USER, JSON.stringify({ email }));
    // cartKey used to store all items the current user added to his cart
    const cartKey = `cart__${email}`;
    if (!localStorage.getItem(cartKey)) {
      localStorage.setItem(cartKey, JSON.stringify([]));
    }
    return 'Success';
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER);
  }

  getUser(): { email: string } | null {
    const user = localStorage.getItem(this.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  private getAllUsers(): { [email: string]: { password: string } } {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : {};
  }
}