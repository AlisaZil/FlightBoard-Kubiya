import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightLineComponent } from './flight-line/flight-line.component';
import { FlightBoardComponent } from './flight-board/flight-board.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CreateFlightFormComponent } from './create-flight-form/create-flight-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FlightLineComponent,
    FlightBoardComponent,
    SearchBarComponent,
    CreateFlightFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
