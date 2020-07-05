import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  cities: any[];
  initialCityId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const url = this.route.snapshot.url;
    if (url[1]) {
      this.initialCityId = parseInt(url[1].path, 10);
      console.log('initialCity: ', this.initialCityId);
    }

    this.dataService.cities.subscribe((cities) => {
      console.log('cities: ', cities);
      this.cities = cities;
      if (this.initialCityId) {
        this.cities.find(city => city.id === this.initialCityId);
      }
    });
  }

  onCitySelect(cityId: number): void {
    if (isNaN(cityId)) { return; }
    this.router.navigate([`location/${cityId}`]);
  }

}
