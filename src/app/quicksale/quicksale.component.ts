import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quicksale',
  templateUrl: './quicksale.component.html',
  styleUrls: ['./quicksale.component.scss']
})
export class QuicksaleComponent {
  quickSale$!:Observable<any>;

  constructor(
    private readonly apiService:ApiService,
    private readonly router:Router
  ){

  }


  ngOnInit(){
   this.getQuickSale();
    }

    getQuickSale(){
      this.quickSale$=this.apiService.getQuick();
      this.quickSale$.subscribe((sales:any)=>{

      })
    }

    getNavigate(id:number){
      this.router.navigate(['dashboard/sales/newsale'],{queryParams:{quick_sale:id}})
    
    }
}
