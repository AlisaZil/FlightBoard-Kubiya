import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FlightsService } from './flights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private flightService: FlightsService) { }
  
  ngOnInit(): void {

    this.flightService.getFlights().subscribe(res => {
      console.log(res);
      
    })
  }
}
