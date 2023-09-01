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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';


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
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    InputNumberModule,
    InputTextareaModule,
    DialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
