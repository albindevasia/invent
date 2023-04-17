import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { SalesService } from '@apisales.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',

})
export class SaleComponent implements OnInit {
constructor(
  private readonly saleService:SalesService,
  private route: ActivatedRoute,
  
){}
public sale$!: Observable<any>;

ngOnInit(){
this.route.paramMap.subscribe((params)=>{
  const sale_id=Number(params.get('id'))
  this.sale$=this.saleService.viewSale(sale_id)
})

}

}
