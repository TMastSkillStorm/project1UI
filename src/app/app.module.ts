import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { WarehouseManagerComponent } from './warehouse-manager/warehouse-manager.component';
import { WarehouseCreateComponent } from './warehouse-create/warehouse-create.component';
import { ProductsComponent } from './products/products.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { ProductCreateComponent } from './product-create/product-create.component';

@NgModule({
  declarations: [
    AppComponent,
    WarehousesComponent,
    HomeComponent,
    WarehouseManagerComponent,
    WarehouseCreateComponent,
    ProductsComponent,
    ProductManagerComponent,
    ProductCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
