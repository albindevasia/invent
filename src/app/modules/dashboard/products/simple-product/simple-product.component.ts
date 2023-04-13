import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { ProductService } from '../../../../core/Http/Api/products.service';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
  
})
export class SimpleProductComponent {
 constructor(private readonly route:ActivatedRoute,
  private readonly http:HttpClient,
  private readonly productService:ProductService){}

  public product:any

  ngOnInit(){
    this.route.params.subscribe((params)=>{

      //  const url:string='https://63be80d8585bedcb36aecdeb.mockapi.io/ecart';
      this.productService.getSingle(params['productId']).subscribe((response:any)=>{
        if(response){
        this.product=response;

        }
      })
    })
  }
}
