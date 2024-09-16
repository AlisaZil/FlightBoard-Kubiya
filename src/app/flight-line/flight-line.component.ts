import { Component, Input } from '@angular/core';
import { Flight } from '../interfaces';

@Component({
  selector: 'flight-line',
  templateUrl: './flight-line.component.html',
  styleUrls: ['./flight-line.component.scss']
})
  
export class FlightLineComponent {

  @Input() flightData: Flight | undefined;

  constructor() { }

  ngOnInit(): void {}

}
