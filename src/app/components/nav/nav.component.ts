import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  cities: any[];

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.cities.subscribe((cities) => {
      this.cities = cities;
    });
  }

  onCitySelect(cityId: number): void {
    if (isNaN(cityId)) { return; }
    this.router.navigate([`location/${cityId}`]);
  }

}
