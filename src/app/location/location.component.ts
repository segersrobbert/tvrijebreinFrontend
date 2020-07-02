import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'
import { Apollo } from 'apollo-angular';

import CITY_QUERY from '../apollo/queries/city/city';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public city;
  public cityName: string;
  public loading = true;
  private citiesQuery: Subscription;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: RouterEvent) => {
      console.log(event.url);
      console.log(event.url.split('/')[2]);
      this.citiesQuery = this.apollo
        .watchQuery({ query: CITY_QUERY,
          variables: {
            id: 1
          }
        })
        .valueChanges.subscribe((result: any) => {
          console.log('result: ', result);
          this.city = result.data.city;
          this.loading = result.loading;
        });
    });

    // unsub
  }

}
