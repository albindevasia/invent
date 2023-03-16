import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalItems!: number;
  @Input() pageSize: number = 5;
  @Output() pageChanged = new EventEmitter();
 

 
  get totalPages(): number {
    return Math.ceil(this.totalItems/ this.pageSize);
  }


  get pages(): number[] {
    const pages: number[] = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems']) {
      console.log(changes);
       this.currentPage = 1;
      // this.pageChanged.emit({
      //   currentPage: this.currentPage,
      // });
    }
  }
  nextPage(currentPage: number): void {
    this.pageChanged.emit(currentPage);
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(currentPage: number): void {
    this.pageChanged.emit(currentPage);
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onPageChange(pageNumbe: number): void {
    this.pageChanged.emit(pageNumbe);
    if (this.currentPage) {
      this.currentPage = pageNumbe;
    }
  }
}
