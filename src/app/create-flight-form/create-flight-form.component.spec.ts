import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlightFormComponent } from './create-flight-form.component';

describe('CreateFlightFormComponent', () => {
  let component: CreateFlightFormComponent;
  let fixture: ComponentFixture<CreateFlightFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFlightFormComponent]
    });
    fixture = TestBed.createComponent(CreateFlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
