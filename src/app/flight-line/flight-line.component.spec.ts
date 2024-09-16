import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLineComponent } from './flight-line.component';

describe('FlightLineComponent', () => {
  let component: FlightLineComponent;
  let fixture: ComponentFixture<FlightLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightLineComponent]
    });
    fixture = TestBed.createComponent(FlightLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
