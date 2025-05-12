import { DatosPersonaOirRecibirComponent } from './datos-persona-oir-recibir.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('DatosPersonaOirRecibirComponent', () => {
  let component: DatosPersonaOirRecibirComponent;
  let mockDonacionesExtranjerasService: any;
  let mockTramite10303Store: any;
  let mockTramite10303Query: any;
  let mockToastr: any;

  beforeEach(() => {
    mockDonacionesExtranjerasService = {
      getPaises: jest.fn(),
      buscarContribuyente: jest.fn()
    };
    mockTramite10303Store = {
      setCvePaisPersonaAutorizada: jest.fn()
    };
    mockTramite10303Query = {
      selectSeccionState$: of({ rfcPersonaAutorizada: 'ABC123', nombrePersonaAutorizada: 'John Doe' })
    };
    mockToastr = {
      error: jest.fn()
    };

    component = new DatosPersonaOirRecibirComponent(
      mockDonacionesExtranjerasService,
      new FormBuilder(),
      mockTramite10303Store,
      mockTramite10303Query,
      mockToastr
    );
  });

  it('should create the form on initialization', () => {
    component.ngOnInit();
    expect(component.datosPersonaOirRecibirForm).toBeDefined();
  });

  it('should initialize catalogues', () => {
    mockDonacionesExtranjerasService.getPaises.mockReturnValue(of({ data: [{ id: 1, nombre: 'India' }] }));
    component.inicializaCatalogos();
    expect(mockDonacionesExtranjerasService.getPaises).toHaveBeenCalled();
  });

  it('should set selected country in store', () => {
    component.datosPersonaOirRecibirForm = new FormBuilder().group({
      cvePaisPersonaAutorizada: ['IN']
    });
    component.paisSeleccion();
    expect(mockTramite10303Store.setCvePaisPersonaAutorizada).toHaveBeenCalledWith('IN');
  });

  it('should reset the form when no contributor is found', () => {
    const resetSpy = jest.spyOn(component.datosPersonaOirRecibirForm, 'reset');
    component.restablecerFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should fetch contributor and update the form', () => {
    const mockData = { data: [{ rfc: 'ABC123', nombre: 'John', apellidoPaterno: 'Doe', apellidoMaterno: '', calle: 'Main Street', numeroExterior: '123' }] };
    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(of(mockData));

    component.buscarContribuyenteRfc(4, 'ABC123');
    expect(mockDonacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('ABC123');
  });

  it('should handle contributor not found scenario', () => {
    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(of({ data: [null] }));
    component.buscarContribuyenteRfc(4, 'ABC123');
    expect(mockToastr.error).toHaveBeenCalledWith('Valor erronio');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn((component as any).destruirNotificador$, 'next');
    const completeSpy = jest.spyOn((component as any).destruirNotificador$, 'complete');

    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});