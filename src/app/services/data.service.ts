import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import CITIES_QUERY from '../apollo/queries/city/cities';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  get cities(): Observable<any[]> {
    return this._cities.asObservable();
  }
  private _cities: BehaviorSubject<any[]>
    = new BehaviorSubject<any[]>([]);

  constructor(
    private apollo: Apollo,
  ) { }

  public initialize(): void {
    this.getCities();
  }

  private getCities(): void {
    this.apollo
      .watchQuery({
        query: CITIES_QUERY
      })
      .valueChanges.subscribe((result: any) => {
        this._cities.next(result.data.cities);
      });
  }

}
