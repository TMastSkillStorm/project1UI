import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WarehouseManagerComponent } from './warehouse-manager/warehouse-manager.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehouseCreateComponent } from './warehouse-create/warehouse-create.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'warehouses/create', component: WarehouseCreateComponent },
  { path: 'warehouses/:id', component: WarehouseManagerComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/:id', component: ProductManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
