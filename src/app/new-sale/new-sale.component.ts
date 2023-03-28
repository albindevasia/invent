import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit {
  newSale: any;

  constructor(
    private readonly http: HttpClient,
    private apiService: ApiService,
    private readonly toastr:ToastrService
  ) {}
  isClientSelected: boolean = false;
 public selectedClientId!: number;
  public clients$!: Observable<any>;
  public filteredClients: any[] = [];
  public url: string = 'https://api-sales-app.josetovar.dev/clients';
  public saleApi: string = 'https://api-sales-app.josetovar.dev/sales';
  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required),
    products: new FormArray([]),
  });
  get saleProducts(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }

  addProductTolist(): void {
    const newProduct: FormGroup = new FormGroup({
      id: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
    });
    this.saleProducts.push(newProduct);
  }
  removeProduct(productIndex: any): void {
    this.saleProducts.removeAt(productIndex);
  }
  editing = false;
  cancel() {
    this.editing = false;
  }
  addSale() {
    
    this.editing = true;
  }
  confirmSale(){
    
  console.log(this.saleForm.value)
  this.http.post(`${this.saleApi}`, this.saleForm.value).subscribe({next:(res) => {
    console.log(res);
 this.toastr.success('New sale added successfully');
  },
  error:(error)=>{
    this.toastr.error('Product Id is not found')
  },
 complete:()=>{
  console.log('Is good')
 }
  })
  this.editing = false;
}
  ngOnInit() {


   this.apiService.addClient()


    
  }



  

  // public getClient(){

      

 
     searchValue: string = '';



     searchName() {
      console.log(this.searchValue);
      this.apiService.addClient()
        .pipe(
          map((client: any) => {
            return client.filter((client: any) =>
              client.first_name.toLowerCase().includes(this.searchValue.toLowerCase())
            );
          })
        )
        .subscribe((filteredClients) => {
          console.log(filteredClients);
          this.filteredClients = filteredClients;
        });
    }
  
    selectClient(clientId: any, value: string) {
      // console.log(clientId);
      this.saleForm.get('client_id')?.setValue(clientId);
      console.log(this.saleForm.value);
      this.searchValue = value;
      this.filteredClients=[]
      this.isClientSelected = false;
    }
  
      
      
}