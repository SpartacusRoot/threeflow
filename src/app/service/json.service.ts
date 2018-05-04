import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor( private http: HttpClient) { }
 url = '../../assets/flow-example.json';

  getJson() {
   return this.http.get<any>(this.url);
  }

  firstStep() {
    return this.http.get<any>(this.url).pipe(
      map(res => res.filter(resp =>{
        resp._id = "5a8b3836e07dee4ec559dedc";
      }))
    );
  }
}
