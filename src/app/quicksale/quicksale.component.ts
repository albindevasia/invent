import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-quicksale',
  templateUrl: './quicksale.component.html',
  styleUrls: ['./quicksale.component.scss']
})
export class QuicksaleComponent {
  quickSale$!:Observable<any>;

  constructor(
    private readonly toastr: ToastrService,
    private readonly http: HttpClient,
    private readonly apiService:ApiService,
    private readonly router:Router
  ){

  }
  public productApi: string = 'https://api-sales-app.josetovar.dev/products';
  public quickApi: string = 'https://api-sales-app.josetovar.dev/quick-sales';
  public filteredProducts: any[] = [];
  public products$!: Observable<any>;
  ngOnInit(){
   this.getQuickSale();
   this.products$=this.http.get(this.productApi);
    }

    getQuickSale(){
      this.quickSale$=this.apiService.getQuick();
      this.quickSale$.subscribe((sales:any)=>{

      })
    }

    getNavigate(id:number){
      this.router.navigate(['dashboard/sales/newsale'],{queryParams:{quick_sale:id}})
    
    }

    posting:boolean=false;
    

  public postNew(){
    this.posting=true;
  }  
  public closeNew(){
    this.posting=false;

  }
  
  public quickForm:FormGroup = new FormGroup ({
    name: new FormControl('',Validators.required),
    products:new FormArray([])
  })

  get selectedQuick():FormArray{
    return this.quickForm.get('products') as FormArray

  }

  public addToquick(){
    const newProduct:FormGroup= new FormGroup({
      id:new FormControl(null,Validators.required),
    })
    this.selectedQuick.push(newProduct);
  }
  public removeProduct(productIndex: any): void {
        this.selectedQuick.removeAt(productIndex);
      }

  searchText:string='';
  searchProduct(){
this.products$.pipe(
  (map((products:any)=>{
    return products.filter((product:any)=>
    product.active == true &&
    product.stock>0 &&
    product.name.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }))
).subscribe((filteredProducts)=>{
  this.filteredProducts=filteredProducts
})
  }

  selectProduct(productId:any,value:string){
    const product=this.filteredProducts.find((product)=>product.id === productId);
    const productIndex=this.selectedQuick.length -1;
    const productFormGroup=this.selectedQuick.at(productIndex) as FormGroup;
    productFormGroup.controls['id'].setValue(product.id);
    this.searchText=value;
    this.filteredProducts=[];
  }
    public confirmQuick() {
    
    console.log(this.quickForm.value);
    this.http.post(`${this.quickApi}`, this.quickForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('New sale added successfully');
      },
      error: (error) => {
        this.toastr.error('Product Quantity is Out of Range');
      },
      complete: () => {
        console.log('Is good');
      },
    });
    this.quickForm.reset();
    this.searchText='';
  
  }
}
