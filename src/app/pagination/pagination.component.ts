import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  
 @Input()  currentPage!:number;





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









