import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioTransporteComponent } from './medio-transporte.component';

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<MedioTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedioTransporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
