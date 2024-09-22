import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'create-flight-form',
  templateUrl: './create-flight-form.component.html',
  styleUrls: ['./create-flight-form.component.scss']
})
  
export class CreateFlightFormComponent implements OnDestroy{
  
  @Input() formAction: 'Edit' | 'Create' = 'Create';
  @Input() openForm: boolean = false;
  @Input() editFlightData?: Flight;
  
  @Output() sendAction = new EventEmitter<boolean>();
  
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

  ngOnChanges(): void {
    this.arrangeFormFields();
    this.addEditToFormValues();
  }

  addEditToFormValues() {
    if (this.editFlightData) {

      for (const key in this.flightFormControl?.value) {

        if (key in this.editFlightData) {

          const formControlKey = key as keyof typeof this.editFlightData;
          this.flightFormControl.get(key)?.setValue(this.editFlightData[formControlKey]);

        }
      }
    }
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
      .subscribe(res => {
        this.toastr.success('the flight was Added!');
      }, (err) => {
        this.toastr.error(err.error);
      });
    
  }


  updateFlight(flight: Flight) {
    
    this.flightService.UpdateFlight(flight)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { 
        this.toastr.success('the flight was updated!');
      }, (err) => {
        this.toastr.error(err.error);
      });
    
  }

  submitForm() {

    if (this.flightFormControl?.valid) {

      this.sendAction.emit(false);

      this.formAction === 'Create' ? this.addFlight(this.flightFormControl.value) : this.updateFlight(this.flightFormControl.value);

    } else {
      this.toastr.error("please enter valid Flight Number");
    }
    
  }

  DeleteFlight(flightNumber: string) {
    
    this.flightService.DeleteFlight(flightNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { 
        this.toastr.success('the flight was Deleted!');
      }, (err) => {
        this.toastr.error(err.error);
      });
    
    this.sendAction.emit(false);

  }

  exitForm() {
    this.openForm = false;
    this.flightFormControl?.reset();
    this.sendAction.emit(false);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

}
