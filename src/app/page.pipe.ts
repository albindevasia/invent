import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'page'
})
export class PagePipe implements PipeTransform {

  transform(value:Observable<any[]>, currentPage:number, pageSize:number){
     return value.pipe(

      map(items=>{
       const startIndex=(currentPage-1)*pageSize;
        const endindex=startIndex+pageSize
         return items.slice(startIndex,endindex)
        })
         )
        }
  }


