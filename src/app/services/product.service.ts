import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CreateProduct } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = 'https://e-commerce-product-module-a9gz.onrender.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(`${this.baseUrl}/api/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/product/${id}`);
  }

  createProduct(payload: CreateProduct) {
    return this.http.post(`${this.baseUrl}/api/product`, payload);
  }

  updateProduct(id: string, payload: CreateProduct) {
    return this.http.put(`${this.baseUrl}/api/product/${id}`, payload);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/api/product/${id}`);
  }
}
