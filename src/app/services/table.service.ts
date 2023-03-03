import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class TableService{
 private apiUrl='https://63be80d8585bedcb36aecdeb.mockapi.io'
 constructor(private http:HttpClient){}


}

// export class DeleteService{
//     constructor(private http: HttpClient) { }

//     deleteTableRow(id: number): Observable<any> {
//         return this.http.delete(`https://63be80d8585bedcb36aecdeb.mockapi.io/ecart/${id}`);
//       }
// }