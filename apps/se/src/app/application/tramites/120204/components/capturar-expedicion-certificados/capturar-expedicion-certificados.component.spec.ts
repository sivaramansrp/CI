import { CapturarExpedicionCertificadosComponent } from './capturar-expedicion-certificados.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('CapturarExpedicionCertificadosComponent', () => {
  let component: CapturarExpedicionCertificadosComponent;
  let serviceMock: any;
  let consultaioQueryMock: any;
  let expedicion120204StoreMock: any;
  let expedicion120204QueryMock: any;
  let fb: FormBuilder;

  beforeEach(() => {
    serviceMock = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Entidad' }])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([{ id: 2, nombre: 'RepFed' }])),
      getDetallesDelalicitacion: jest.fn().mockReturnValue(of({
        numeraDelicitacion: 'LIC123',
        fechaDelEventoDelicitacion: '2024-01-01',
        descripcionDelProducto: 'Producto'
      })),
      obtenerDatosTabla: jest.fn().mockReturnValue(of({ id: 1, nombre: 'Dato' })),
      getDistribucionSaldo: jest.fn().mockReturnValue(of({ montoDisponible: '100' }))
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };
    expedicion120204StoreMock = {
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setMontoExpedir: jest.fn(),
      setMontoExpedirCheck: jest.fn(),
      setTotalExpedir: jest.fn()
    };
    expedicion120204QueryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'Entidad',
        representacionFederal: 'RepFed',
        numeraDelicitacion: 'LIC123',
        fechaDelEventoDelicitacion: '2024-01-01',
        descripcionDelProducto: 'Producto',
        montoDisponible: '100',
        montoAExpedir: '10',
        montoAExpedirCheck: true,
        totalAExpedir: '10'
      })
    };
    fb = new FormBuilder();
    component = new CapturarExpedicionCertificadosComponent(
      serviceMock,
      fb,
      consultaioQueryMock,
      expedicion120204StoreMock,
      expedicion120204QueryMock
    );
    component.solicitudState = {
      entidadFederativa: 'Entidad',
      representacionFederal: 'RepFed',
      numeraDelicitacion: 'LIC123',
      fechaDelEventoDelicitacion: '2024-01-01',
      descripcionDelProducto: 'Producto',
      montoDisponible: '100',
      montoAExpedir: '10',
      montoAExpedirCheck: true,
      totalAExpedir: '10'
    } as any;
    component.inicializarExpedicionCertificadoFormulario();
  });

  it('should call getEntidadFederativa and set entidadFederativaOptions on ngOnInit', () => {
    component.getEntidadFederativa();
    expect(serviceMock.getEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativaOptions).toEqual([{ id: 1, nombre: 'Entidad' }]);
  });

  it('should call getRepresentacionFederal and set representacionFederalOptions on ngOnInit', () => {
    component.getRepresentacionFederal();
    expect(serviceMock.getRepresentacionFederal).toHaveBeenCalled();
    expect(component.representacionFederalOptions).toEqual([{ id: 2, nombre: 'RepFed' }]);
  });

  it('should patch detalledelaLicitacionForm on getDetallesDelalicitacion', () => {
    component.getDetallesDelalicitacion();
    expect(component.detalledelaLicitacionForm.get('numeraDelicitacion')?.value).toBe('LIC123');
    expect(component.detalledelaLicitacionForm.get('fechaDelEventoDelicitacion')?.value).toBe('2024-01-01');
    expect(component.detalledelaLicitacionForm.get('descripcionDelProducto')?.value).toBe('Producto');
  });

  it('should set datos as array on obtenerDatosTabla', () => {
    component.obtenerDatosTabla();
    expect(Array.isArray(component.datos)).toBe(true);
    expect(component.datos[0]).toEqual({ id: 1, nombre: 'Dato' });
  });

  it('should patch distribucionSaldoForm on getDistribucionSaldo', () => {
    component.getDistribucionSaldo();
    expect(component.distribucionSaldoForm.get('montoDisponible')?.value).toBe('100');
  });

  it('should call setEntidadFederativa on onCambiarEntiadFederative', () => {
    component.formulario.get('entidadFederativa')?.setValue('EntidadX');
    component.onCambiarEntiadFederative();
    expect(expedicion120204StoreMock.setEntidadFederativa).toHaveBeenCalledWith('EntidadX');
  });

  it('should call setRepresentacionFederal on onCambiarRepresentacionFederal', () => {
    component.formulario.get('representacionFederal')?.setValue('RepFedX');
    component.onCambiarRepresentacionFederal();
    expect(expedicion120204StoreMock.setRepresentacionFederal).toHaveBeenCalledWith('RepFedX');
  });

  it('should call setMontoExpedir on onCambiarMontoAExpedir', () => {
    component.distribucionSaldoForm.get('montoAExpedir')?.setValue('55');
    component.onCambiarMontoAExpedir();
    expect(expedicion120204StoreMock.setMontoExpedir).toHaveBeenCalledWith('55');
  });

  it('should call setMontoExpedirCheck on onCambiarMontoAExpedirCheck', () => {
    component.distribucionSaldoForm.get('montoAExpedirCheck')?.setValue(true);
    component.onCambiarMontoAExpedirCheck();
    expect(expedicion120204StoreMock.setMontoExpedirCheck).toHaveBeenCalledWith(true);
  });

  it('should add montoAExpedir to totalAExpedir and call setTotalExpedir on AgregarMontoExpedir', () => {
    component.distribucionSaldoForm.get('montoAExpedir')?.setValue('10');
    component.distribucionSaldoForm.get('totalAExpedir')?.setValue('20');
    component.AgregarMontoExpedir();
    expect(component.distribucionSaldoForm.get('totalAExpedir')?.value).toBe('30');
    expect(expedicion120204StoreMock.setTotalExpedir).toHaveBeenCalledWith(30);
  });

  it('should disable all forms if esFormularioSoloLectura is true in inicializarExpedicionCertificadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarExpedicionCertificadoFormulario();
    expect(component.formulario.disabled).toBe(true);
    expect(component.detalledelaLicitacionForm.disabled).toBe(true);
    expect(component.distribucionSaldoForm.disabled).toBe(true);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
