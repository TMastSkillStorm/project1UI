import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent {
  product: any;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWarehouse();
  }

  getWarehouse(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.id = id;
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    window.location.reload();
    this.location.back();
  }

  save(): void {
    if (this.product) {
      this.productService.updateProduct(this.product, this.id)
      .subscribe(data => {if (data) {
        this.goBack();
      }
      });
    }
  }

    delete (): void {
      if(this.product !== undefined){
      this.productService.deleteProduct(this.product.productId).subscribe();
    }
    this.goBack();
  }

}