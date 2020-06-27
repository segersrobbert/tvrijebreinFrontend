import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import MEETINGS_QUERY from '../apollo/queries/meeting/meetings';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit, OnDestroy {
  data: any = {};
  loading = true;
  errors: any;
  pastMeetings: any[];
  futureMeetings: any[];

  private eventsQuery: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.eventsQuery = this.apollo
      .watchQuery({
        query: MEETINGS_QUERY
      })
      .valueChanges.subscribe((result: any) => {
        console.log('meetings: ', result);
        this.data = result.data.meetings;
        this.pastMeetings = this.data.filter(meeting => meeting.date > new Date().toISOString());
        this.futureMeetings = this.data.filter(meeting => meeting.date < new Date().toISOString());
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.eventsQuery.unsubscribe();
  }
}
