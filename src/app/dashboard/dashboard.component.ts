import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { TableService } from '../services/table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
editingUser: any;
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
  })

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



