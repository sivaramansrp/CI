import { FusionOEscisionComponent } from './fusion-o-escision.component';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';

describe('FusionOEscisionComponent', () => {
  let component: FusionOEscisionComponent;
  let routerMock: any;
  let routeMock: any;
  let tercerosServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    routeMock = {};
    tercerosServiceMock = {
      obtenerDatosPersona: jest.fn()
    };
    tramiteStoreMock = {
      setAvisoDatos: jest.fn()
    };
    tramiteQueryMock = {
      selectSolicitud$: of({
        capacidadAlmacenamiento2: '100',
        numeroTotalCarros: '1',
        cantidadBienes: '1',
        fechaInspeccion: '2024-01-01',
        descripcionClobGenerica2: 'desc',
        rfcIdc: 'RFC123',
        razonSocial: 'Empresa',
        razonSocialSC: 'EmpresaSC',
        numFolioTramite: 'FOLIO1',
        fechaInicioVigencia: '2024-01-01',
        fechafinVigencia2: '2024-12-31',
        fusionEscisionData: [{ id: 1 }]
      })
    };
    component = new FusionOEscisionComponent(
      new FormBuilder(),
      routerMock,
      routeMock,
      tercerosServiceMock,
      tramiteStoreMock,
      tramiteQueryMock
    );
    component.avisoState = {
      capacidadAlmacenamiento2: '100',
      numeroTotalCarros: '1',
      cantidadBienes: '1',
      fechaInspeccion: '2024-01-01',
      descripcionClobGenerica2: 'desc',
      rfcIdc: 'RFC123',
      razonSocial: 'Empresa',
      razonSocialSC: 'EmpresaSC',
      numFolioTramite: 'FOLIO1',
      fechaInicioVigencia: '2024-01-01',
      fechafinVigencia2: '2024-12-31',
      fusionEscisionData: [{ id: 1 }]
    } as any;
  });

  it('should initialize form and set visibility flags on inicializarFormulario', () => {
    component.inicializarFormulario();
    expect(component.formulario).toBeDefined();
    expect(component.divCompletoVisible).toBe(true);
    expect(component.conCertificacionPrincipalVisible).toBe(true);
    expect(component.gridFusionEscisionData).toEqual([{ id: 1 }]);
  });

  it('should call setAvisoDatos on mostrarFusionada', () => {
    component.inicializarFormulario();
    component.formulario.get('capacidadAlmacenamiento')?.setValue('200');
    component.mostrarFusionada();
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('200', 'capacidadAlmacenamiento2');
  });

  it('should show and reset fields on mostrarFusionOEscision', () => {
    component.inicializarFormulario();
    component.formulario.get('numeroTotalCarros')?.setValue('1');
    component.mostrarFusionOEscision();
    expect(component.divCompletoVisible).toBe(true);
    component.formulario.get('numeroTotalCarros')?.setValue('2');
    component.mostrarFusionOEscision();
    expect(component.divCompletoVisible).toBe(false);
  });

  it('should set visibility and reset fields on mostrarCertificacionFusionada', () => {
    component.inicializarFormulario();
    component.formulario.get('cantidadBienes')?.setValue('1');
    component.mostrarCertificacionFusionada();
    expect(component.conCertificacionPrincipalVisible).toBe(true);
    expect(component.sinCertificacionPrincipalVisible).toBe(false);

    component.formulario.get('cantidadBienes')?.setValue('0');
    component.mostrarCertificacionFusionada();
    expect(component.conCertificacionPrincipalVisible).toBe(false);
    expect(component.sinCertificacionPrincipalVisible).toBe(true);
  });

  it('should patch form and call setAvisoDatos on cargarDatosPersonaFusion success', () => {
    component.inicializarFormulario();
    const datos = {
      razonSocial: 'EmpresaX',
      numFolioTramite: 'FOLIOX',
      fechaInicioVigencia: '2024-02-01',
      fechaFinVigencia: '2024-12-01'
    };
    tercerosServiceMock.obtenerDatosPersona.mockReturnValue(of(datos));
    component.formulario.get('rfc')?.setValue('RFCX');
    component.cargarDatosPersonaFusion();
    expect(component.formulario.get('razonSocial')?.value).toBe('EmpresaX');
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('EmpresaX', 'razonSocial');
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('FOLIOX', 'numFolioTramite');
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('2024-02-01', 'fechaInicioVigencia');
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('2024-12-01', 'fechaFinVigencia2');
  });

  it('should set dvMessageVisible true on cargarDatosPersonaFusion error', () => {
    component.inicializarFormulario();
    tercerosServiceMock.obtenerDatosPersona.mockReturnValue(throwError(() => new Error('error')));
    component.formulario.get('rfc')?.setValue('RFCX');
    component.cargarDatosPersonaFusion();
    expect(component.dvMessageVisible).toBe(true);
  });

  it('should set dvMessageVisible true if RFC is empty on cargarDatosPersonaFusion', () => {
    component.inicializarFormulario();
    component.formulario.get('rfc')?.setValue('');
    component.cargarDatosPersonaFusion();
    expect(component.dvMessageVisible).toBe(true);
  });

  it('should navigate on abrirModalFusionEscision', () => {
    component.abrirModalFusionEscision();
    expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-fusion-escision'], { relativeTo: routeMock });
  });

  it('should call setAvisoDatos on cambioRFC', () => {
    component.inicializarFormulario();
    component.formulario.get('rfc')?.setValue('RFCNEW');
    component.cambioRFC();
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('RFCNEW', 'rfc');
  });

  it('should call setAvisoDatos on cambioFechaInspeccion', () => {
    component.inicializarFormulario();
    component.formulario.get('fechaInspeccion')?.setValue('2024-03-01');
    component.cambioFechaInspeccion();
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('2024-03-01', 'razonSocial');
  });

  it('should call setAvisoDatos on cambioRazonSocialSC', () => {
    component.inicializarFormulario();
    component.formulario.get('razonSocialSC')?.setValue('SCX');
    component.cambioRazonSocialSC();
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('SCX', 'razonSocialSC');
  });

  it('should call setAvisoDatos on cambioFechaInicio', () => {
    component.inicializarFormulario();
    component.formulario.get('fechaInicioVigencia')?.setValue('2024-04-01');
    component.cambioFechaInicio();
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('2024-04-01', 'fechaInicioVigencia');
  });

  it('should call setAvisoDatos on cambioFechaFin', () => {
    component.inicializarFormulario();
    component.formulario.get('fechaFinVigencia')?.setValue('2024-05-01');
    component.cambioFechaFin();
    expect(tramiteStoreMock.setAvisoDatos).toHaveBeenCalledWith('2024-05-01', 'fechaFinVigencia');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
