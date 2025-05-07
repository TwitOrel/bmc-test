import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  getUserCart(email: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/get_products`, { email });
  }

  addProduct(email: string, product_id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_product`, { email, product_id });
  }

  removeProduct(email: string, product_id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/remove_product`, { email, product_id });
  }
}