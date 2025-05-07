import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
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
  email: string = "";
  constructor(private productService: ProductService, private cartService: CartService) {}

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const { email } = JSON.parse(userData);
    this.email = email;
    this.cartService.getUserCart(email).subscribe(cartData => {
      const allProducts = this.productService.getProducts();
      this.cartItems = cartData.map(item => {
        const product = allProducts.find(p => p.id === item.product_id);
        return product ? { product, quantity: item.quantity } : null;
      }).filter(Boolean) as { product: Product; quantity: number }[];
    });
  }

  addItem(productId: number): void {
    this.cartService.addProduct(this.email, productId).subscribe(() => this.ngOnInit());
  }

  removeItem(productId: number): void {
    this.cartService.removeProduct(this.email, productId).subscribe(() => this.ngOnInit());
  }
}
