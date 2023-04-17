import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',

})
export class UploadComponent {
  constructor(
    private readonly http:HttpClient
  ){}
name!:string;
file:any;

  getName(name:string){
this.name=name;
  }
getFile(event:any){
  this.file=event.target.files[0];
  console.log('file',this.file);
}

submitData(){
  let formData=new FormData();
  formData.set('name',this.name)
  formData.set('file',this.file)

this.http.post('localhost/3400',formData).subscribe(res=>{
  
})
}

}
