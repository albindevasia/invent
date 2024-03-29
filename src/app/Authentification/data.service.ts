import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  public newSale_state!:{
    selectedClient:any,
    salesForm:FormGroup,
    searchingClients:boolean,
    searchingProducts:boolean
  }
public allsale_state!:{
    sales:any[],
    currentPage:number,
    numberOfPages: number,
    numberOfSales: number,
    pageSize:number,

  }


}