import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit{
  warehouses: Warehouse[] =[];

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses(): void {
    this.warehouseService.getWarehouses()
    .subscribe(warehouses => this.warehouses = warehouses);
  }

}