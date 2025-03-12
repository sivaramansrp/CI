import { DatosRepLegalDonatarioComponent } from './datos-rep-legal-donatario.component';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('DatosRepLegalDonatarioComponent', () => {
  let component: DatosRepLegalDonatarioComponent;
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
      setCvePaisRepLegalDonatario: jest.fn()
    };
    mockTramite10303Query = {
      selectSeccionState$: of({ rfcRepLegalDonatario: 'XYZ123', nombreRepLegalDonatario: 'Jane Doe' })
    };
    mockToastr = {
      error: jest.fn()
    };

    component = new DatosRepLegalDonatarioComponent(
      mockDonacionesExtranjerasService,
      new FormBuilder(),
      mockTramite10303Store,
      mockTramite10303Query,
      mockToastr
    );

    component.datosRepLegalDonatarioForm = new FormBuilder().group({
      rfcRepLegalDonatario: [''],
      nombreRepLegalDonatario: [''],
      calleRepLegalDonatario: [''],
      numExteriorRepLegalDonatario: [''],
      numInteriorRepLegalDonatario: [''],
      cvePaisRepLegalDonatario: [''],
      codigoPostalRepLegalDonatario: [''],
      estadoRepLegalDonatario: [''],
      coloniaRepLegalDonatario: [''],
      correoElectronicoRepLegalDonatario: [''],
      telefonoRepLegalDonatario: ['']
    });

    (component as any).destruirNotificador$ = new Subject();
  });

  it('should create the form on initialization', () => {
    component.ngOnInit();
    expect(component.datosRepLegalDonatarioForm).toBeDefined();
  });

  it('should initialize catalogues', () => {
    mockDonacionesExtranjerasService.getPaises.mockReturnValue(of({ data: [{ id: 1, nombre: 'India' }] }));
    component.inicializaCatalogos();
    expect(mockDonacionesExtranjerasService.getPaises).toHaveBeenCalled();
  });

  it('should set the selected country in store', () => {
    component.datosRepLegalDonatarioForm.patchValue({ cvePaisRepLegalDonatario: 'IN' });
    component.paisSeleccion();
    expect(mockTramite10303Store.setCvePaisRepLegalDonatario).toHaveBeenCalledWith('IN');
  });

  it('should reset the form', () => {
    const resetSpy = jest.spyOn(component.datosRepLegalDonatarioForm, 'reset');
    component.restablecerFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should fetch contributor and update the form', () => {
    const mockData = { data: [{ rfc: 'XYZ123', nombre: 'Jane', apellidoPaterno: 'Doe', apellidoMaterno: '', calle: 'Park Avenue', numeroExterior: '10' }] };
    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(of(mockData));

    component.buscarContribuyenteRfc(2, 'XYZ123');
    expect(mockDonacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('XYZ123');
  });

  it('should handle contributor not found scenario', () => {
    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(of({ data: [null] }));
    component.buscarContribuyenteRfc(2, 'XYZ123');
    expect(mockToastr.error).toHaveBeenCalledWith('Valor erronio');
  });

  it('should patch form values when a contributor is found', () => {
    const mockContribuyente = {
      rfc: 'XYZ123',
      razonSocial: 'ABC Corp',
      nombre: 'Jane',
      apellidoPaterno: 'Doe',
      apellidoMaterno: '',
      calle: 'Park Avenue',
      numeroExterior: '10',
      numeroInterior: '2A',
      estado: 'Tamil Nadu',
      colonia: 'Downtown',
      codigoPostal: '123456',
      pais: 'India',
      correoElectronico: 'jane.doe@example.com',
      telefono: '9876543210'
    };

    component.construirRLdonatario(mockContribuyente, true);
    expect(component.datosRepLegalDonatarioForm.value).toEqual({
      rfcRepLegalDonatario: 'XYZ123',
      nombreRepLegalDonatario: 'Jane Doe ',
      calleRepLegalDonatario: 'Park Avenue',
      numExteriorRepLegalDonatario: '10',
      numInteriorRepLegalDonatario: '2A',
      cvePaisRepLegalDonatario: 'India',
      codigoPostalRepLegalDonatario: '123456',
      estadoRepLegalDonatario: 'Tamil Nadu',
      coloniaRepLegalDonatario: 'Downtown',
      correoElectronicoRepLegalDonatario: 'jane.doe@example.com',
      telefonoRepLegalDonatario: '9876543210'
    });
  });

  it('should reset form if contributor is not found', () => {
    const resetSpy = jest.spyOn(component.datosRepLegalDonatarioForm, 'reset');
    component.construirRLdonatario(null as any, false);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn((component as any).destruirNotificador$, 'next');
    const completeSpy = jest.spyOn((component as any).destruirNotificador$, 'complete');

    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});