import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  //go back a page
  goBack(): void {
    window.location.reload();
    this.location.back();
  }

  //call to add a new product
  add(name: string,description: string, imageURL: string): void {
    name = name.trim();
    if (!name||!description||!imageURL) { return; }
    let product: Product = {productId: 0,name: name, description:description, imageURL: imageURL, inventory: []};
    
    this.productService.addProduct(product)
      .subscribe(() => this.goBack());

  }
}
