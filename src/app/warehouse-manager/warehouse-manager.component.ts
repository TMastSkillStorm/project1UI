import { Component } from '@angular/core';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css']
})
export class WarehouseManagerComponent {
  warehouse: any;


  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.warehouseService.getWarehouse(id)
      .subscribe(warehouse => this.warehouse = warehouse);
  }

  goBack(): void {
    window.location.reload();
    this.location.back();
  }

  save(): void {
    if (this.warehouse) {
      this.warehouseService.updateWarehouse(this.warehouse)
        .subscribe(() => this.goBack());
    }
  }

  delete(): void {
    if(this.warehouse !==undefined){
    this.warehouseService.deleteWarehouse(this.warehouse.id).subscribe();
    }
    this.goBack();
  }
}
