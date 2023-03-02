import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import {  TableService } from '../services/table.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
editingUser: any;


productEnabledControls:{[id:number]:FormControl}={}
constructor(private readonly http: HttpClient,private readonly tableService:TableService,private readonly toastr:ToastrService){}

public url:string='https://63be80d8585bedcb36aecdeb.mockapi.io/ecart'
public products$:any;
ngOnInit(){
  this.products$=this.http.get<{
    id:number;
    Name:string;
    Price:number;
    Department:string;
    Description:string;
  }>(this.url).subscribe((response)=>{
    this.products$=response;

    for(const product of this.products$){
      this.productEnabledControls[product.id]=new FormControl(product.isEnabled);
      this.productEnabledControls[product.id].valueChanges.subscribe((value)=>{
        product.isEnabled=value;

        console.log(value)
      })
      
    }
  })

}

isProductDisabled(product:any):boolean{
  return !product.isEnabled;
}
// product:any;
//  editing!: false;

// edit(product:any){
//   this.product=product;
//   // this.editing=false

// }
// submit(){
//   this.tableService.updateData(this.product).subscribe((response: any)=>{

//     console.log(response)
   

//     this.editing=false
//     this.showToaster('update success');
  
//   })

  
// }
// cancel(){
//   this.editing=false

// }
// showToaster(message:string){
//   this.toastr.success(`${message}`,'success',{
//     timeOut:3000,
//     progressBar:true,
//     progressAnimation:'decreasing',
//     positionClass:'toast-bottom-right',
//     closeButton:true,

    
//   })

editUser(product: any) {
  this.editingUser = product;


}


saveUser() {
  this.http.put(`https://63be80d8585bedcb36aecdeb.mockapi.io/ecart/${this.editingUser.id}`, this.editingUser).subscribe(() => {
    this.editingUser = null;
    this.toastr.success('updated')


  });
}

deleteTableRow(id: number): Observable<any> {
  return this.http.delete(`https://63be80d8585bedcb36aecdeb.mockapi.io/ecart/${id}`);
}


deleteRow(id: number) {
  this.deleteTableRow(id).subscribe(() => {
    console.log('Row deleted successfully.');
  });
}






// showToaster(message:string){
//     this.toastr.success(`${message}`,'success',{
//       timeOut:3000,
//       progressBar:true,
//       progressAnimation:'decreasing',
//       positionClass:'toast-bottom-right',
//       closeButton:true,
  
      
//     })

// }

 

}



