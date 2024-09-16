import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBoardComponent } from './flight-board.component';

describe('FlightBoardComponent', () => {
  let component: FlightBoardComponent;
  let fixture: ComponentFixture<FlightBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightBoardComponent]
    });
    fixture = TestBed.createComponent(FlightBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
