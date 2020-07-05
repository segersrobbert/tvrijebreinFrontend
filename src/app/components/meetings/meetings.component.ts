import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

import MEETINGS_QUERY from '../../apollo/queries/meeting/meetings';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit, OnDestroy {

  public meetings = [];
  public pastMeetings: any[];
  public futureMeetings: any[];

  private eventsQuery: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.eventsQuery = this.apollo
      .watchQuery({ query: MEETINGS_QUERY })
      .valueChanges.subscribe((result: any) => {
        this.meetings = result.data.meetings;
        this.pastMeetings = this.meetings.filter(meeting => meeting.date > new Date().toISOString());
        this.futureMeetings = this.meetings.filter(meeting => meeting.date < new Date().toISOString());
      });
  }

  ngOnDestroy() {
    this.eventsQuery.unsubscribe();
  }
}
