import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  
 @Input()  currentPage:number=1;

//   @Output() PageChange:EventEmitter<number>=new EventEmitter<number>();
//   products:any;

//   onPageChange(pageNumber:number){
//     this.currentPage=pageNumber;
//     this.PageChange.emit(pageNumber);
//   }
// get totalPages():number{
//   return Math.ceil(this.products /  5);
// }

// get pages():number[]{
// const pagesArray=[];
// for(let i=1;i<=this.totalPages;i++){
//   pagesArray.push(i);
// }
// return pagesArray;
// }



@Input() totalItems: number=18;
@Input() pageSize: number=3;
@Output() pageChanged = new EventEmitter<number>();

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

onPageChange(pageNumber: number): void {
  this.pageChanged.emit(pageNumber);
}
}









