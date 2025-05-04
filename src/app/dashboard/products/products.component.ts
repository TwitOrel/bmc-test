import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

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
    const cartKey = `cart__${email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const item = cart.find((p: any) => p.id === productId);
    if (item) {
      item.quantity += 1;
    } 
    else {
      cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));

    console.log('Adding to cart:', item);
  }
}
