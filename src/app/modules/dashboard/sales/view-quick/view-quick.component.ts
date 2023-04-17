import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuickService } from '@apiquicksale.service';

@Component({
  selector: 'app-view-quick',
  templateUrl: './view-quick.component.html',

})
export class ViewQuickComponent {
  constructor(
    private readonly quickService:QuickService,
    private route: ActivatedRoute,
  ){}
sales!:any;

ngOnInit(){
  this.route.paramMap.subscribe((params)=>{
    const sale_id=Number(params.get('id'))
 this.quickService.getById(sale_id).subscribe((sale)=>this.sales=sale)
    console.log(this.sales)
  })
}
}
