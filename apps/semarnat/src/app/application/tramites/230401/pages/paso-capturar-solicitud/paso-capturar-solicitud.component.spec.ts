import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCapturarSolicitudComponent } from './paso-capturar-solicitud.component';

describe('PasoCapturarSolicitudComponent', () => {
  let component: PasoCapturarSolicitudComponent;
  let fixture: ComponentFixture<PasoCapturarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCapturarSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoCapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
