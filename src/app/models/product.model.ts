export interface ProductImage {
    prodcut_image_id: string;
    prodcut_image_url: string;
  }
  
  export interface Product {
    prodcut_id: string;
    prodcut_sku: string;
    prodcut_name: string;
    prodcut_price: string;
    images: ProductImage[];
  }
  
  export interface CreateProduct {
    sku: string;
    name: string;
    price: number;
    images: string[];
  }
  