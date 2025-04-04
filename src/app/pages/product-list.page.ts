import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'] 
})
export class ProductListPage {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res.data;
    });
  }
  onEdit(id: string) {
    this.router.navigate(['/edit', id]);
  }
  
  goToAdd() {
    this.router.navigate(['/add']);
  }

  editProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.productService.deleteProduct(id).subscribe(() => this.fetchProducts());
    }
  }
}
