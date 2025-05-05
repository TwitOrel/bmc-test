import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: { product: Product; quantity: number }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const { email } = JSON.parse(userData);
    const cartKey = `cart__${email}`;
    const rawCart: { id: number; quantity: number }[] = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const allProducts = this.productService.getProducts();

    this.cartItems = rawCart.map(item => {
      const product = allProducts.find(p => p.id === item.id);
      return product
        ? { product, quantity: item.quantity }
        : null;
    }).filter(Boolean) as { product: Product; quantity: number }[];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  addItem(productId: number): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;
  
    const { email } = JSON.parse(userData);
    const cartKey = `cart__${email}`;
    const rawCart: { id: number; quantity: number }[] = JSON.parse(localStorage.getItem(cartKey) || '[]');
  
    const item = rawCart.find(p => p.id === productId);
    if (item) {
      item.quantity += 1;
    } else {
      rawCart.push({ id: productId, quantity: 1 });
    }
  
    localStorage.setItem(cartKey, JSON.stringify(rawCart));
    this.ngOnInit(); 
  }
  
  removeItem(productId: number): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;
  
    const { email } = JSON.parse(userData);
    const cartKey = `cart__${email}`;
  
    const rawCart: { id: number; quantity: number }[] = JSON.parse(localStorage.getItem(cartKey) || '[]');
  
    const itemIndex = rawCart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
  
    rawCart[itemIndex].quantity -= 1;
  
    if (rawCart[itemIndex].quantity <= 0) {
      rawCart.splice(itemIndex, 1);
    }
  
    localStorage.setItem(cartKey, JSON.stringify(rawCart));
  
    this.ngOnInit();
  }
}
