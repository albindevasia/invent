import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { PagePipe } from './page.pipe';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations:[
          PaginationComponent,
        PagePipe
    ],
    imports: [
  
   
        CommonModule,
   
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
     
      ],
      exports:[
        PagePipe,
        PaginationComponent
      ]
})
export class ShareModule { }