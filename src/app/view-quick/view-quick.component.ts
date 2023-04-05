import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-quick',
  templateUrl: './view-quick.component.html',
  styleUrls: ['./view-quick.component.scss']
})
export class ViewQuickComponent {
  constructor(
    private readonly apiService:ApiService,
    private route: ActivatedRoute,
  ){}
sales!:any;

ngOnInit(){
  this.route.paramMap.subscribe((params)=>{
    const sale_id=Number(params.get('id'))
 this.apiService.getById(sale_id).subscribe((sale)=>this.sales=sale)
    console.log(this.sales)
  })
}
}
