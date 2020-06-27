import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import CITIES_QUERY from '../apollo/queries/city/cities';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  data: any = {};
  loading = true;
  errors: any;

  private citiesQuery: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.citiesQuery = this.apollo
      .watchQuery({
        query: CITIES_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.citiesQuery.unsubscribe();
  }

}
