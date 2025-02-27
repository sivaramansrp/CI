import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoFirmarSolicitudComponent } from './paso-firmar-solicitud.component';

describe('PasoFirmarSolicitudComponent', () => {
  let component: PasoFirmarSolicitudComponent;
  let fixture: ComponentFixture<PasoFirmarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoFirmarSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoFirmarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
