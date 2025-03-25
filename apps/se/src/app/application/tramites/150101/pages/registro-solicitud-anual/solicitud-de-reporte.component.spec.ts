import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDeReporteComponent } from './solicitud-de-reporte.component';

describe('SolicitudDeReporteComponent', () => {
  let component: SolicitudDeReporteComponent;
  let fixture: ComponentFixture<SolicitudDeReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudDeReporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudDeReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
