import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { HomeComponent } from './home/home.component';
import { WarehouseManagerComponent } from './warehouse-manager/warehouse-manager.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'warehouses/:id', component: WarehouseManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
