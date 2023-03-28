import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
constructor(
  private readonly apiService:ApiService,
  private route: ActivatedRoute,
  
){}
public sale$!: Observable<any>;

ngOnInit(){
this.route.paramMap.subscribe((params)=>{
  const sale_id=Number(params.get('id'))
  this.sale$=this.apiService.viewSale(sale_id)
})

}

}
