import { Routes } from '@angular/router';
import { ProductListPage } from './pages/product-list.page';
import { ProductFormPage } from './pages/product-form.page';

export const routes: Routes = [
  { path: '', component: ProductListPage },
  { path: 'add', component: ProductFormPage },
  { path: 'edit/:id', component: ProductFormPage },
];
