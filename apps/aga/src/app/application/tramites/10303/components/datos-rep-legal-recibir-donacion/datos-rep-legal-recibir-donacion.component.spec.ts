import { DatosRepLegalRecibirDonacionComponent } from './datos-rep-legal-recibir-donacion.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('DatosRepLegalRecibirDonacionComponent', () => {
  let component: DatosRepLegalRecibirDonacionComponent;
  let mockDonacionesExtranjerasService: any;
  let mockTramite10303Store: any;
  let mockTramite10303Query: any;
  let mockToastr: any;

  beforeEach(() => {
    mockDonacionesExtranjerasService = {
      getPaises: jest.fn(),
      buscarContribuyente: jest.fn(),
    };
    mockTramite10303Store = {
      setCvePaisRepLegalAutorizado: jest.fn(),
    };
    mockTramite10303Query = {
      selectSeccionState$: of({
        rfcRepLegalAutorizado: 'ABC123',
        nombreRepLegalAutorizado: 'Jane Smith',
      }),
    };
    mockToastr = {
      error: jest.fn(),
    };

    component = new DatosRepLegalRecibirDonacionComponent(
      mockDonacionesExtranjerasService,
      new FormBuilder(),
      mockTramite10303Store,
      mockTramite10303Query,
      mockToastr
    );
  });

  it('should create the form during initialization', () => {
    component.ngOnInit();
    expect(component.datosRepLegalRecibirDonacionForm).toBeDefined();
  });

  it('should initialize catalogs', () => {
    mockDonacionesExtranjerasService.getPaises.mockReturnValue(
      of({ data: [{ id: 1, nombre: 'India' }] })
    );
    component.inicializaCatalogos();
    expect(mockDonacionesExtranjerasService.getPaises).toHaveBeenCalled();
  });

  it('should set the selected country in the store', () => {
    component.datosRepLegalRecibirDonacionForm = new FormBuilder().group({
      cvePaisRepLegalAutorizado: ['IN'],
    });
    component.paisSeleccion();
    expect(
      mockTramite10303Store.setCvePaisRepLegalAutorizado
    ).toHaveBeenCalledWith('IN');
  });

  it('should reset the form', () => {
    component.datosRepLegalRecibirDonacionForm = new FormBuilder().group({});
    const resetSpy = jest.spyOn(
      component.datosRepLegalRecibirDonacionForm,
      'reset'
    );
    component.restablecerFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should fetch contributor and update form when found', () => {
    const mockData = {
      data: [
        {
          rfc: 'ABC123',
          nombre: 'Jane',
          apellidoPaterno: 'Smith',
          apellidoMaterno: '',
          calle: 'Park Street',
          numeroExterior: '10',
          estado: 'Tamil Nadu',
          colonia: 'Central',
          codigoPostal: '600001',
          pais: 'India',
          correoElectronico: 'jane.smith@example.com',
          telefono: '9876543210',
        },
      ],
    };

    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(
      of(mockData)
    );

    component.buscarContribuyenteRfc(3, 'ABC123');
    expect(mockDonacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith(
      'ABC123'
    );
  });

  it('should handle error when contributor is not found', () => {
    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(
      of({ data: [null] })
    );
    component.buscarContribuyenteRfc(3, 'ABC123');
    expect(mockToastr.error).toHaveBeenCalledWith('Valor erronio');
  });

  it('should patch form values when contributor is found', () => {
    const mockContributor = {
      rfc: 'ABC123',
      nombre: 'Jane',
      apellidoPaterno: 'Smith',
      apellidoMaterno: '',
      calle: 'Park Street',
      numeroExterior: '10',
      numeroInterior: '2B',
      estado: 'Tamil Nadu',
      colonia: 'Central',
      codigoPostal: '600001',
      pais: 'India',
      correoElectronico: 'jane.smith@example.com',
      telefono: '9876543210',
    };

    component.construirRepLegalAutorizado(mockContributor, true);
    expect(component.datosRepLegalRecibirDonacionForm.value).toEqual({
      rfcRepLegalAutorizado: undefined,
      nombreRepLegalAutorizado: 'Jane Smith ',
      calleRepLegalAutorizado: 'Park Street',
      numExteriorRepLegalAutorizado: '10',
      numInteriorRepLegalAutorizado: '2B',
      cvePaisRepLegalAutorizado: 'India',
      codigoPostalRepLegalAutorizado: '600001',
      estadoRepLegalAutorizado: 'Tamil Nadu',
      coloniaRepLegalAutorizado: 'Central',
      correoElectronicoRepLegalAutorizado: 'jane.smith@example.com',
      telefonoRepLegalAutorizado: '9876543210',
    });
  });

  it('should reset form if contributor is not found', () => {
    const resetSpy = jest.spyOn(
      component.datosRepLegalRecibirDonacionForm,
      'reset'
    );
    component.construirRepLegalAutorizado(null as any, false);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(
      (component as any).destruirNotificador$,
      'next'
    );
    const completeSpy = jest.spyOn(
      (component as any).destruirNotificador$,
      'complete'
    );

    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});