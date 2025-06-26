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
      getPaises: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'India' }] })),
      buscarContribuyente: jest.fn()
    };
    mockTramite10303Store = {
      setCvePaisPersonaAutorizada: jest.fn()
    };
    mockTramite10303Query = {
      selectSeccionState$: of({ rfcPersonaAutorizada: 'ABC123', nombrePersonaAutorizada: 'John Doe' })
    };
    mockToastr = {
      error: jest.fn(),
      success: jest.fn()
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
    component.ngOnInit();
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
    component.ngOnInit();
    mockDonacionesExtranjerasService.buscarContribuyente.mockReturnValue(of({ data: [null] }));
    component.buscarContribuyenteRfc(1, 'ABC123');
    expect(mockToastr.error).toHaveBeenCalledWith('Valor erronio');
  });

  it('should call construirPOyR with encontrado=true when DATA is not null and valor === 4', () => {
    const mockData = {
      rfc: 'RFC1234567890',
      razonSocial: 'Empresa S.A.',
      nombre: 'Nombre',
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
      calle: 'Calle',
      numeroExterior: '1',
      numeroInterior: '2',
      estado: 'Estado',
      colonia: 'Colonia',
      codigoPostal: '00000',
      pais: 'MX',
      correoElectronico: 'correo@empresa.com',
      telefono: '5555555555'
    };
    const mockResponse = { data: [mockData] };
    jest.spyOn(mockDonacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of(mockResponse));
    const construirPOyRSpy = jest.spyOn(component, 'construirPOyR');

    component.buscarContribuyenteRfc(4, 'RFC1234567890');

    expect(mockDonacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('RFC1234567890');
    expect(construirPOyRSpy).toHaveBeenCalledWith(mockData, true);
  });

  it('should call toastr.error when DATA is not null and valor !== 4', () => {
    const mockData = { rfc: 'RFC1234567890' };
    const mockResponse = { data: [mockData] };
    jest.spyOn(mockDonacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of(mockResponse));

    component.buscarContribuyenteRfc(1, 'RFC1234567890');

    expect(mockDonacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('RFC1234567890');
    expect(mockToastr.error).toHaveBeenCalledWith('Valor erronio');
  });

  it('should call construirPOyR with encontrado=false when DATA is null and valor === 4', () => {
    const mockResponse = { data: [null] };
    jest.spyOn(mockDonacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of(mockResponse));
    const construirPOyRSpy = jest.spyOn(component, 'construirPOyR');

    component.buscarContribuyenteRfc(4, 'RFC1234567890');

    expect(construirPOyRSpy).toHaveBeenCalledWith(null, false);
  });

  it('should call toastr.error when DATA is null and valor !== 4', () => {
    const mockResponse = { data: [null] };
    jest.spyOn(mockDonacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of(mockResponse));

    component.buscarContribuyenteRfc(2, 'RFC1234567890');

    expect(mockToastr.error).toHaveBeenCalledWith('Valor erronio');
  });

  it('should patch form and call all store setters when encontrado is true', () => {
    const mockData = {
      rfc: 'RFC123456789',
      razonSocial: 'Empresa S.A.',
      nombre: 'Nombre',
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
      calle: 'Calle',
      numeroExterior: '1',
      numeroInterior: '2',
      estado: 'Estado',
      colonia: 'Colonia',
      codigoPostal: '00000',
      pais: 'MX',
      correoElectronico: 'correo@empresa.com',
      telefono: '5555555555'
    };
    component.datosPersonaOirRecibirForm = new FormBuilder().group({
      nombrePersonaAutorizada: [''],
      callePersonaAutorizada: [''],
      numExteriorPersonaAutorizada: [''],
      numInteriorPersonaAutorizada: [''],
      estadoPersonaAutorizada: [''],
      coloniaPersonaAutorizada: [''],
      codigoPostalPersonaAutorizada: [''],
      cvePaisPersonaAutorizada: [''],
      correoElectronicoPersonaAutorizada: [''],
      telefonoPersonaAutorizada: ['']
    });

    mockTramite10303Store.setNombrePersonaAutorizada = jest.fn();
    mockTramite10303Store.setCallePersonaAutorizada = jest.fn();
    mockTramite10303Store.setNumExteriorPersonaAutorizada = jest.fn();
    mockTramite10303Store.setNumInteriorPersonaAutorizada = jest.fn();
    mockTramite10303Store.setEstadoPersonaAutorizada = jest.fn();
    mockTramite10303Store.setColoniaPersonaAutorizada = jest.fn();
    mockTramite10303Store.setCodigoPostalPersonaAutorizada = jest.fn();
    mockTramite10303Store.setCvePaisPersonaAutorizada = jest.fn();
    mockTramite10303Store.setCorreoElectronicoPersonaAutorizada = jest.fn();
    mockTramite10303Store.setTelefonoPersonaAutorizada = jest.fn();

    component.construirPOyR(mockData, true);

    expect(component.datosPersonaOirRecibirForm.value.nombrePersonaAutorizada).toBe('Empresa S.A.');
    expect(mockTramite10303Store.setNombrePersonaAutorizada).toHaveBeenCalledWith('Empresa S.A.');
    expect(mockTramite10303Store.setCallePersonaAutorizada).toHaveBeenCalledWith('Calle');
    expect(mockTramite10303Store.setNumExteriorPersonaAutorizada).toHaveBeenCalledWith('1');
    expect(mockTramite10303Store.setNumInteriorPersonaAutorizada).toHaveBeenCalledWith('2');
    expect(mockTramite10303Store.setEstadoPersonaAutorizada).toHaveBeenCalledWith('Estado');
    expect(mockTramite10303Store.setColoniaPersonaAutorizada).toHaveBeenCalledWith('Colonia');
    expect(mockTramite10303Store.setCodigoPostalPersonaAutorizada).toHaveBeenCalledWith('00000');
    expect(mockTramite10303Store.setCvePaisPersonaAutorizada).toHaveBeenCalledWith('MX');
    expect(mockTramite10303Store.setCorreoElectronicoPersonaAutorizada).toHaveBeenCalledWith('correo@empresa.com');
    expect(mockTramite10303Store.setTelefonoPersonaAutorizada).toHaveBeenCalledWith('5555555555');
  });

  it('should call restablecerFormulario when encontrado is false', () => {
    component.datosPersonaOirRecibirForm = new FormBuilder().group({
      nombrePersonaAutorizada: ['test'],
      callePersonaAutorizada: [''],
      numExteriorPersonaAutorizada: [''],
      numInteriorPersonaAutorizada: [''],
      estadoPersonaAutorizada: [''],
      coloniaPersonaAutorizada: [''],
      codigoPostalPersonaAutorizada: [''],
      cvePaisPersonaAutorizada: [''],
      correoElectronicoPersonaAutorizada: [''],
      telefonoPersonaAutorizada: ['']
    });
    
    const restablecerFormularioSpy = jest.spyOn(component, 'restablecerFormulario');
    component.construirPOyR(null as any, false);
    expect(restablecerFormularioSpy).toHaveBeenCalled();
  });

  it('should call the correct store method with the form value', () => {
    const form = new FormBuilder().group({
      testField: ['testValue']
    });
    mockTramite10303Store.setNombreDonatario = jest.fn();

    component.setValoresStore(form, 'testField', 'setNombreDonatario');

    expect(mockTramite10303Store.setNombreDonatario).toHaveBeenCalledWith('testValue');
  });

  it('should call the store method with undefined if the field does not exist', () => {
    mockTramite10303Store.setNombreDonatario = jest.fn();

    const form = new FormBuilder().group({});
    component.setValoresStore(form, 'nonExistentField', 'setNombreDonatario');

    expect(mockTramite10303Store.setNombreDonatario).toHaveBeenCalledWith(undefined);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn((component as any).destruirNotificador$, 'next');
    const completeSpy = jest.spyOn((component as any).destruirNotificador$, 'complete');

    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});