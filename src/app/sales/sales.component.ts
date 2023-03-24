import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  

  clients:any[]=[];

  ngOnInit(){
this.clients=[
  {id:1,name:'rocky'},
  {id:2,name:'ram'},
  {id:3,name:'raju'},
  {id:4,name:'veera'}
]
  }

  refreshModule(){
    this.clients=[
  {id:1,name:'rocky'},
  {id:2,name:'ram'},
  {id:3,name:'raju'},
  {id:4,name:'veera'},
  {id:5,name:'raghav'}
  ]
  }

trackById(index:any,client:any){
return client.id
}
}