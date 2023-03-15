import { NumberFormatStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationService } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input () items!:any[]
 @Input()  currentPage:number=1;
@Input() totalItems: number=18;
@Input() pageSize: number=5;
@Output() pageChanged= new EventEmitter();
  pagedItems!: any[];

get totalPages(): number {
  return Math.ceil(this.totalItems / this.pageSize);
}

get pages(): number[] {
  const pages: number[] = [];

  for (let i = 1; i <= this.totalPages; i++) {
    pages.push(i);
  }

  return pages;
}



nextPage(currentPage:number):void{
  this.pageChanged.emit(currentPage)
  if(this.currentPage < this.totalPages){
    this.currentPage ++;
 
  }
}

prevPage(currentPage:number):void{
  this.pageChanged.emit(currentPage)
  if(this.currentPage >1){
    this.currentPage --;
    this.onPageChange;
  }
}

onPageChange(pageNumber: number): void {
  this.pageChanged.emit(pageNumber);


}
}









