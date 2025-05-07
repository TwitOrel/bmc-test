import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addToCart(productId: number): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.warn('Problem: user not logged in');
      return;
    }
  
    const { email } = JSON.parse(userData);
  
    this.cartService.addProduct(email, productId).subscribe({
      next: (res) => {
        console.log('Product added:', res);
      },
      error: (err) => {
        console.error('Failed to add product:', err);
      }
    });
  }
}