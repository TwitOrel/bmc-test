import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';

// app.routes.ts
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [
        // { path: 'products', component: ProductsComponent },
        // { path: 'cart', component: CartComponent }
        { path: 'products', loadComponent: () => import('./dashboard/products/products.component').then(m => m.ProductsComponent)},
        { path: 'cart', loadComponent: () => import('./dashboard/cart/cart.component').then(m => m.CartComponent)}
      ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
  