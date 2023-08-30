import { Component } from '@angular/core';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent {

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    window.location.reload();
    this.location.back();
  }

  add(name: string, capacity: string, city: string, country: string): void {
    name = name.trim();
    if (!name||!capacity||!city||!country) { return; }
    let warehouse: Warehouse = {id: 0,name: name, capacity: Number(capacity), city: city, country: country, inventory: []};
    
    this.warehouseService.addWarehouse(warehouse)
      .subscribe(() => this.goBack());

  }
}
