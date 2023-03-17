import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges  {


  constructor(private cdr: ChangeDetectorRef) {}
  
  
@Input() products$!:Observable<any>
  @Input() currentPage: number = 1;
  // @Input() totalItems!: number;
  @Input() pageSize: number = 5;
  @Output() pageChanged = new EventEmitter();

  toPage!:number

  get totalPages(): number {
    return Math.ceil(this.toPage/ this.pageSize);
  }


    get pages(): number[] {
    const pages: number[] = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }
  
 
  // ngOnInit(){
  //   this.pages()
  // }
   pagetotal!:number
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("jhjht")
    // // console.log(this.currentPage);
    // console.log(changes['totalItems']);

    // if (changes['totalItems']) {
    //   console.log(changes);

    //    this.currentPage = 1;
    //   console.log(this.currentPage);

    this.products$.subscribe((product)=>{
      this.toPage=product.length
      
    })

       this.currentPage = 1;

      // this.pageChanged.emit({
      //   currentPage: this.currentPage,
      // });
  
//
    

// this.cdr.detectChanges();


      // this.pageChanged.emit({
      //   currentPage: this.currentPage,
      // });
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
