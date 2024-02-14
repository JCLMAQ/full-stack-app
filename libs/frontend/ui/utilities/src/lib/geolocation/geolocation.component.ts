import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './geolocation.service';


@Component({
    selector: 'my-app-geolocation',
    templateUrl: './geolocation.component.html',
    styleUrls: ['./geolocation.component.scss'],
    standalone: true
})

// According: https://www.notion.so/jclmaq5510/Geolocation-b6e2c6030c4a4a06a674a2cbac8d1d76?pvs=4

export class GeolocationComponent implements OnInit {
  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.getGeoLocation();
  }

  getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }
}
