import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr'


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
  
export class FlightBoardComponent implements OnDestroy{
  
  @Output() sendAction = new EventEmitter<string>();

  private destroy$: Subject<void> = new Subject<void>();
  
  public flightFormControl?: FormGroup;
  public flightFormFields: { key: string, type:string, options?: string[] }[] = [
    { key: 'flightNumber', type:'number'},
    { key: 'status', type:'dropdown', options: ['Scheduled', 'Delayed', 'Cancelled'] },
    { key: 'takeoffTime', type:'time' },
    { key: 'landingTime', type:'time' },
    { key: 'takeoffAirport', type:'text' },
    { key: 'landingAirport', type:'text' }
  ];
  
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private flightService: FlightsService,
    private toastr: ToastrService) { }
  
  ngOnInit(): void { 
    this.arrangeFormFields();
  }

  arrangeFormFields() {

    this.flightFormControl = this.fb.group({});
    
    this.flightFormFields.forEach(field => {

      
      if (field.key === "flightNumber") {
        this.flightFormControl?.addControl(field.key, this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]+$/)]));
      }
      
      this.flightFormControl?.addControl(field.key, this.fb.control(''));
    });

  }

  transformInputPlaceholder(formControlName: string) {

    let formattedKey = formControlName.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedKey = formattedKey.replace(/\b\w/g, char => char.toUpperCase());
    
    return formattedKey;
    
  }

  addFlight(flight:Flight) {

    this.flightService.PostFlight(flight)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { }, (err) => {

        this.toastr.error(err.error);
      });
    
  }


  updateFlight() {
    
  }

  submitForm() {

    if (this.flightFormControl?.valid) {
      this.sendAction.emit("submit");
      this.addFlight(this.flightFormControl.value);
    }
    
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

}
