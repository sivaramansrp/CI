import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoMercanciasSolicitudComponent } from './despacho-mercancias-solicitud.component';

describe('DespachoMercanciasSolicitudComponent', () => {
  let component: DespachoMercanciasSolicitudComponent;
  let fixture: ComponentFixture<DespachoMercanciasSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DespachoMercanciasSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DespachoMercanciasSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
