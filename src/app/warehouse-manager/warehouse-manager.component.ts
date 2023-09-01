import { Component } from '@angular/core';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Inventory } from '../warehouse';
import { Id } from '../warehouse';


@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css']
})
export class WarehouseManagerComponent {
  warehouse: any;
  id: number = 0;
  products: Product[] = [];
  stockMock: stockMock[] = [];
  visible: boolean = false;
  totalStock: number = 0;

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private location: Location,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getWarehouse();
    this.getStock();
  }
  
  //shows modal
  showDialog() {
      this.visible = true;
  }

  //gets the warehouse then gets products for stock
  getWarehouse(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.id = id;
    this.warehouseService.getWarehouse(id)
      .subscribe(warehouse => { this.warehouse = warehouse; this.getProducts(); });
  }

  //navigate back a page
  goBack(): void {
    window.location.reload();
    this.location.back();
  }

  //saves warehouse. if capacity exceeded then modal popup warning is shown
  save(): void {
    if (this.warehouse) {
      this.totalStock = 0;
      for (let i = 0; i < this.stockMock.length; i++) {
        this.totalStock += this.stockMock[i].stock;
      }
      if (this.totalStock > this.warehouse.capacity) {
        this.showDialog();
      } else {
        this.setStock();
        this.warehouseService.updateWarehouse(this.warehouse, this.id)
          .subscribe(data => {
            if (data) {
              this.goBack();
            }
          });
      }
    }
  }

  //deletes warehouse and goes back to warehouse list
  delete(): void {
    if (this.warehouse !== undefined) {
      this.warehouseService.deleteWarehouse(this.warehouse.id).subscribe();
    }
    this.goBack();
  }

  //gets product list to check stock then calls method to get stock
  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => { this.products = products; this.getStock() });
  }

//function that iterates through each product to find the relationship in the database where stock is stored
  getStock(): void {
    let tempInv: Inventory[] = this.warehouse?.inventory;
    let tempIdKey: Id;
    this.stockMock = [];

    if (tempInv) {
      for (let i = 0; i < tempInv.length; i++) {
        tempIdKey = tempInv[i].id;
        for (let x = 0; x < this.products.length; x++) {
          if (tempIdKey.productId == this.products[x].productId) {
            let tempStock: stockMock = { productId: 0, productName: "", stock: 0 };
            tempStock.productId = this.products[x].productId;
            tempStock.productName = this.products[x].name;
            tempStock.stock = tempInv[i].stock;
            this.stockMock.push(tempStock);
          }
        }
      }
    }
  }

  //sets stock for warehouse save
  setStock(): void {
    for (let i = 0; i < this.warehouse.inventory.length; i++) {
      for (let x = 0; x < this.stockMock.length; x++) {
        if(this.warehouse.inventory[i].id.productId == this.stockMock[x].productId){
          this.warehouse.inventory[i].stock = this.stockMock[x].stock
        }
      }
    }
  }
}

//mock stock used to store product information
export interface stockMock {
  productId: number;
  productName: string;
  stock: number;
}
