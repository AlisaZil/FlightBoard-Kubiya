import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private flightsUrl = 'https://localhost:7051/api/Flights'; 

  constructor(private http: HttpClient) { }
  
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  GetFlightsByFlightNumber(flightNumber: string): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.flightsUrl + '/GetFlightsByFlightNumber/' + flightNumber);
  }

  GetFlightsByAirport(Airport: string): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.flightsUrl + '/GetFlightsByAirport/' + Airport);
  }

  GetFlightsByTime(Time: string): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.flightsUrl + '/GetFlightsByTime/' + Time);
  }
}
