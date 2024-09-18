import { Component, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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

  // @Output() sendExit

  public flightFormControl?: FormGroup;
  public flightFormFields: { key: string }[] = [
    { key: 'FlightNumber' },
    { key: 'Status' },
    { key: 'TakeoffTime' },
    { key: 'LandingTime' },
    { key: 'TakeofAirport' },
    { key: 'LandingAirport' }
  ];

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void { 
    this.arrangeFormFields();
  }

  arrangeFormFields() {
    this.flightFormControl = this.fb.group({});
    
    this.flightFormFields.forEach(field => {
      this.flightFormControl?.addControl(field.key, this.fb.control('' ,field.key === "FlightNumber"? Validators.required: null));
    });
  }

  transformInputPlaceholder(formControlName: string) {

    let newPlaceholder = formControlName.match(/[A-Z][a-z]+/g);
    return newPlaceholder ? newPlaceholder.join(" ") : 'Status';
    
  }

  submitForm() {
    console.log("Dddd");
    
    console.log(this.flightFormControl?.value);
    
  }
  

}
