import { Component } from '@angular/core';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Nullable } from 'primeng/ts-helpers';

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

  //goes back to last page
  //known bug is that when making new warehouse from capacity error it takes you back to warehoue manager of that warehouse
  goBack(): void {
    window.location.reload();
    this.location.back();
  }

  //saves new warehosue
  add(name: string, capacity: Nullable<number>, city: string, country: string): void {
    name = name.trim();
    if (!name||!capacity||!city||!country) { return; }
    let warehouse: Warehouse = {id: 0,name: name, capacity: Number(capacity), city: city, country: country, inventory: []};
    
    this.warehouseService.addWarehouse(warehouse)
      .subscribe(() => this.goBack());

  }
}
