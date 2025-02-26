import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioTransporteComponent } from './medio-transporte.component';
import { SagarpaService } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let service: SagarpaService;
  let fixture: ComponentFixture<MedioTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedioTransporteComponent],
      imports: [HttpClientTestingModule],
      providers: [SagarpaService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedioTransporteComponent);
    service = TestBed.inject(SagarpaService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    spyOn(component, 'obtenerMercancia');
    component.modificarSaldosMercancia();
    expect(component.obtenerMercancia).toHaveBeenCalled();
    expect(component.mostrarAgregarMercancia).toBe(true);
  });
  
  it('should set mostrarAgregarMercancia when obtenerAgregarMercanciaEvent is called', () => {
    component.obtenerAgregarMercanciaEvent(true);
    expect(component.mostrarAgregarMercancia).toBe(true);
    component.obtenerAgregarMercanciaEvent(false);
    expect(component.mostrarAgregarMercancia).toBe(false);
  });
});
