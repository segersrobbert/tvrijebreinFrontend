import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import CITY_QUERY from '../../apollo/queries/city/city';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {

  public city;
  public cityName: string;
  public loading = true;
  private cityQuery: Subscription;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    const initialCity = this.route.snapshot.url[1].path;
    this.getCity(parseInt(initialCity,  10));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: RouterEvent) => {
      this.getCity(parseInt(event.url.split('/')[2], 10));
    });

  }

  private getCity(cityId: number) {
    this.cityQuery = this.apollo
      .watchQuery({ query: CITY_QUERY,
        variables: { id: cityId }
      })
      .valueChanges.subscribe((result: any) => {
        this.city = result.data.city;
        this.loading = result.loading;
      });
  }

  ngOnDestroy() {
    this.cityQuery.unsubscribe();
  }

}
