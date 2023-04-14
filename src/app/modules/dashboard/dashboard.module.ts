import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PagePipe } from '../../shared/page.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SalesComponent } from './sales/sales.component';
import { SaleComponent } from './sales/sale/sale.component';
import { NewSaleComponent } from './sales/new-sale/new-sale.component';
import { OverviewComponent } from './overview/overview.component';
import { SaleTableComponent } from './sales/sale-table/sale-table.component';
import { QuicksaleComponent } from './sales/quicksale/quicksale.component';
import { ViewQuickComponent } from './sales/view-quick/view-quick.component';
import { NewquickComponent } from './sales/newquick/newquick.component';
import { ShareModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ClientsComponent,
    ProductsComponent,
    SalesComponent,
    SaleComponent,
  //  PaginationComponent,
//  PagePipe,
    NewSaleComponent,
    OverviewComponent,
    SaleTableComponent,
    QuicksaleComponent,
   ViewQuickComponent,
   NewquickComponent,

 
   
  
   
  ],
  imports: [
  
   ShareModule,
    CommonModule,
   DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  // providers: [
  //   {provide :HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  // ],
  // bootstrap: [AppComponent]
exports:[
  // PagePipe
]

})
export class DashboardModule { }
