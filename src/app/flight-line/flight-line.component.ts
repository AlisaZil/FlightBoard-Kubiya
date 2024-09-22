import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../interfaces';

@Component({
  selector: 'flight-line',
  templateUrl: './flight-line.component.html',
  styleUrls: ['./flight-line.component.scss']
})
  
export class FlightLineComponent {

  @Input() flightData: Flight | undefined;
  @Output() sendClick = new EventEmitter<Flight>();

  constructor() { }

  ngOnInit(): void {}

}
