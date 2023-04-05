import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  constructor(
    private readonly apiService:ApiService,
    private readonly router:Router
  ){}
  quickSale:any;
ngOnInit(){
this.apiService.getQuick().subscribe(sales=>{
 
  this.quickSale=sales
})
}
getNavigate(id:number){
  this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

}
}
