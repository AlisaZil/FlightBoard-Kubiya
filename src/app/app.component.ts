import { Component } from '@angular/core';
import { FlightsService } from './flights.service';
import { Flight } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public FlightList?: Flight[];
  
  constructor( private flightService:FlightsService) { }

  ngOnInit(): void {

    this.getAllFilghts();
  }
  
  getAllFilghts() {
    this.flightService.getFlights().subscribe(res => {
      this.FlightList = res;
    })
  }
  
}
