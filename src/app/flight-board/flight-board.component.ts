import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'flight-board',
  templateUrl: './flight-board.component.html',
  styleUrls: ['./flight-board.component.scss']
})
  
export class FlightBoardComponent {

  public flightFormControl = this.formBuilder.group({
    FlightNumber: new FormControl("",Validators.required),
    Status: new FormControl(),
    TakeoffTime: new FormControl(),
    LandingTime: new FormControl(),
    TakeofAirport: new FormControl(),
    LandingAirport: new FormControl(),
  });

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void { }

  transformInputPlaceholder(formControlName: string) {

    let newPlaceholder = formControlName.match(/[A-Z][a-z]+/g);
    return newPlaceholder ? newPlaceholder.join(" ") : 'Status';
    
  }
  

}
