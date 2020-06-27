import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import CITIES_QUERY from '../apollo/queries/city/cities';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit, OnDestroy {
  data: any = {};
  loading = true;
  errors: any;
  meetings: any[];

  private eventsQuery: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.eventsQuery = this.apollo
      .watchQuery({
        query: CITIES_QUERY
      })
      .valueChanges.subscribe(result => {
        console.log('result: ', result);
        this.data = result.data;
        this.meetings = this.data.cities;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.eventsQuery.unsubscribe();
  }
}
