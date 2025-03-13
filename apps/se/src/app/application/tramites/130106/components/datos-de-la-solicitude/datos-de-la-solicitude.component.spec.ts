import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeLaSolicitudeComponent } from './datos-de-la-solicitude.component';

describe('DatosDeLaSolicitudeComponent', () => {
  let component: DatosDeLaSolicitudeComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDeLaSolicitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
