import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeReporteAnnualComponent } from './datos-de-reporte-annual.component';

describe('DatosDeReporteAnnualComponent', () => {
  let component: DatosDeReporteAnnualComponent;
  let fixture: ComponentFixture<DatosDeReporteAnnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeReporteAnnualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDeReporteAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
