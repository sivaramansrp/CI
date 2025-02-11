import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioTransporteComponent } from './medio-transporte.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

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

  it('should set medioTransporteSeleccionada when medioTransporte is called', () => {
    const mockCatalogo: Catalogo = { id: 1, descripcion: 'Transporte 1' };
    component.medioTransporte(mockCatalogo);
    expect(component.medioTransporteSeleccionada).toEqual(mockCatalogo);
  });
  
  it('should emit transporteSeleccionado with true when estableceSeleccionSolicitudFerro is called with value 1', () => {
    spyOn(component.transporteSeleccionado, 'emit');
    const mockEvent = { target: { value: '1' } };
    component.estableceSeleccionSolicitudFerro(mockEvent);
    expect(component.transporteSeleccionado.emit).toHaveBeenCalledWith(true);
  });
  
  it('should emit transporteSeleccionado with false when estableceSeleccionSolicitudFerro is called with value other than 1', () => {
    spyOn(component.transporteSeleccionado, 'emit');
    const mockEvent = { target: { value: '0' } };
    component.estableceSeleccionSolicitudFerro(mockEvent);
    expect(component.transporteSeleccionado.emit).toHaveBeenCalledWith(false);
  });
  
  it('should call obtenerMercanciasDatos and set mostrarAgregarMercancia to true when modificarSaldosMercancia is called', () => {
    spyOn(component, 'obtenerMercanciasDatos');
    component.modificarSaldosMercancia();
    expect(component.obtenerMercanciasDatos).toHaveBeenCalled();
    expect(component.mostrarAgregarMercancia).toBeTrue();
  });
  
  it('should set mercanciasDatos when obtenerMercanciasDatos is called', () => {
    component.obtenerMercanciasDatos();
    expect(component.mercanciasDatos.length).toBeGreaterThan(0);
  });
  
  it('should set mostrarAgregarMercancia when obtenerAgregarMercanciaEvent is called', () => {
    component.obtenerAgregarMercanciaEvent(true);
    expect(component.mostrarAgregarMercancia).toBeTrue();
    component.obtenerAgregarMercanciaEvent(false);
    expect(component.mostrarAgregarMercancia).toBeFalse();
  });
});
