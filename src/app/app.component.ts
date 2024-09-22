import { Component } from '@angular/core';
import { FlightsService } from './flights.service';
import { Flight } from './interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public FlightList?: Flight[];
  public filteredFlightList?: Flight[];
  public isCreateFormOpen: boolean = false;
  public currFormAction: 'Edit' | 'Create' = 'Create';
  public editFlightData?: Flight;

  constructor(
    private flightService: FlightsService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllFilghts();
  }

  ngOnChanges(): void {
    this.getAllFilghts();
  }
  
  getAllFilghts() {
    this.flightService.getFlights().subscribe(res => {
      this.FlightList = res;
      this.filteredFlightList = res;
    })
  }

  filterListByFlightNumber(flightNumber: string) {

    flightNumber === "" ? this.getAllFilghts() :
      this.flightService.GetFlightsByFlightNumber(flightNumber).subscribe(res => {
        this.filteredFlightList = res;
      }, err => {
        this.filteredFlightList = [];
      });
  }

  filterListByLandingAirport(landingAirport: string) {
    this.filteredFlightList = this.FlightList?.filter(flight => flight.landingAirport === landingAirport);
  }

  filterListByTakeoffAirport(takeoffAirport: string) {
    this.filteredFlightList = this.FlightList?.filter(flight => flight.landingAirport === takeoffAirport);
  }

  handleCreateFormClick() {
    this.isCreateFormOpen = true;
    this.currFormAction = 'Create';
    this.editFlightData = undefined;
  }

  handleFlightLineClick(flightData:Flight) {
    this.isCreateFormOpen = true;
    this.currFormAction = 'Edit';
    this.editFlightData = flightData;
  }
  
}
