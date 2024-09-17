import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  public flightNumberInput: String = "";
  
   public landingAirportList: string[] = ["BEN-GORION", "LONDON-AIR", "FRANCE-PARIS"];
  public takingOffAirportList: string[] = ["BEN-GORION", "LONDON-AIR", "FRANCE-PARIS"];

  filterdLandingAirportList!: Observable<string[]>;
  filterdTakingOffAirportList!: Observable<string[]>;

  @Output() sendFlightNumberInput = new EventEmitter<String>();
  @Output() sendLandingAirport = new EventEmitter<string>();
  @Output() sendTakeoffAirport = new EventEmitter<string>();

  landingAirport = new FormControl();
  takeOffAirport = new FormControl();

  constructor() { }

  ngOnInit() {
    // Assign the filtered list by calling filterList and assigning it to the variable
    this.filterdLandingAirportList = this.filterList(this.landingAirportList, this.landingAirport);
    this.filterdTakingOffAirportList = this.filterList(this.takingOffAirportList, this.takeOffAirport);
  }

  // The method should return an Observable
  filterList(list: string[], control: FormControl): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value as string, list) : list.slice();
      })
    );
  }

  private _filter(value: string, list: string[]) {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }


  getTakeoffAirportList() {
    
  }

  getLandingAirportList() {
    
  }

  handleFlightNumberInput() {
    this.sendFlightNumberInput.emit(this.flightNumberInput);
  }

  handleDropdownClick(clickEvent:Event) {
    
  }

}
