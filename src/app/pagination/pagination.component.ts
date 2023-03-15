
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

 @Input()  currentPage:number=1;
@Input() totalItems: number=20;
@Input() pageSize: number=5;
@Output() pageChanged= new EventEmitter();


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

  }
}

onPageChange(pageNumber: number): void {
  this.pageChanged.emit(pageNumber);


}
}









