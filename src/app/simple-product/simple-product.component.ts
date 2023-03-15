import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
  styleUrls: ['./simple-product.component.scss']
})
export class SimpleProductComponent {
 constructor(private readonly route:ActivatedRoute,
  private readonly http:HttpClient,
  private readonly apiservice:ApiService){}

  public product:any

  ngOnInit(){
    this.route.params.subscribe((params)=>{

      //  const url:string='https://63be80d8585bedcb36aecdeb.mockapi.io/ecart';
      this.apiservice.getSingle(params['productId']).subscribe((response:any)=>{
        if(response){
        this.product=response;

        }
      })
    })
  }
}
