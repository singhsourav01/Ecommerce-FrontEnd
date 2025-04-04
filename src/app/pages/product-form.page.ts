import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CreateProduct } from '../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'] 

})
export class ProductFormPage implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId = '';

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      sku: [''],
      name: [''],
      price: [0],
      images: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = id;
  
      this.service.getProduct(id).subscribe((res) => {
        const product = res.data; 

        this.productForm.patchValue({
          sku: product.prodcut_sku || "",  
          name: product.prodcut_name || "",
          price: +product.prodcut_price || 0,
        });
 
        const urls = product.images.map((img) => img.prodcut_image_url);
        this.productForm.setControl('images', this.fb.array(urls.map(url => this.fb.control(url))));
      });
    }
  }
  

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.fb.control(''));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  onSubmit() {
    const data: CreateProduct = this.productForm.value;
    if (this.isEditMode) {
      this.service.updateProduct(this.productId, data).subscribe(() => this.router.navigate(['/']));
    } else {
      this.service.createProduct(data).subscribe(() => this.router.navigate(['/']));
    }
  }
}
