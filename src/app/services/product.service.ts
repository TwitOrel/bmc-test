import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    {
      id: 1,
      name: 'Lorem Ipsum Product',
      image: 'assets/images/art.jpg',
      price: 92
    },
    {
      id: 2,
      name: 'Lorem Ipsum Product',
      image: 'assets/images/cash.jpg',
      price: 92
    },
    {
      id: 3,
      name: 'Lorem Ipsum Product',
      image: 'assets/images/chair.jpg',
      price: 92
    },
    {
      id: 4,
      name: 'Another Product',
      image: 'assets/images/horse.jpg',
      price: 120
    },
    {
      id: 5,
      name: 'Cool Hat',
      image: 'assets/images/picture.jpg',
      price: 75
    },
    {
      id: 6,
      name: 'Flowers',
      image: 'assets/images/flowers.jpg',
      price: 192
    },
    {
      id: 7,
      name: 'Sand',
      image: 'assets/images/sand.jpg',
      price: 192
    },
    {
      id: 8,
      name: 'Phone',
      image: 'assets/images/phone.jpg',
      price: 192
    },
    {
      id: 9,
      name: 'Bicycle',
      image: 'assets/images/bicycle.jpg',
      price: 190
    },
    {
      id: 10,
      name: 'Cat',
      image: 'assets/images/cat.jpg',
      price: 275
    }
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }

  getProductsCount(count: number) {
    return this.products.length;
  }
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}
