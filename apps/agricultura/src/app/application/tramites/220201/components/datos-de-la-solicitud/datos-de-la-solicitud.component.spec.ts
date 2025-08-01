import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';

class ModalMock {
  abrir = jest.fn();
}

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fb: FormBuilder;

  let certificadoServiceMock: Partial<CertificadoZoosanitarioServiceService>;
  let certificadoQueryMock: Partial<ZoosanitarioQuery>;
  let fitosanitarioStoreMock: Partial<ZoosanitarioStore>;
  let consultaioQueryMock: Partial<ConsultaioQuery>;
  let routerMock: Partial<Router>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  let seleccionarDatosSolicitudSubject: Subject<any>;

  beforeEach(() => {
    fb = new FormBuilder();

    certificadoServiceMock = {
      getAllDatosForma: jest.fn().mockReturnValue(of({ datos: {}, tablaDatos: [] })),
      updateDatosDeLaSolicitud: jest.fn()
    };

    seleccionarDatosSolicitudSubject = new Subject<any>();
    certificadoQueryMock = {
      seleccionarDatosSolicitud$: seleccionarDatosSolicitudSubject.asObservable()
    };

    fitosanitarioStoreMock = {
      update: jest.fn(),
      getValue: jest.fn().mockReturnValue({
        tablaDatos: [{ id: 1, noPartida: '001', tipoRequisito: 'TR' }],
        selectedDatos: []
      })
    };

    consultaioQueryMock = {
      selectConsultaioState$: new Subject<any>().asObservable()
    };

    routerMock = { navigate: jest.fn() };
    activatedRouteMock = {};

    component = new DatosDeLaSolicitudComponent(
      fb,
      { get: jest.fn().mockReturnValue(of({ data: [] })) } as any,
      certificadoServiceMock as CertificadoZoosanitarioServiceService,
      certificadoQueryMock as ZoosanitarioQuery,
      consultaioQueryMock as ConsultaioQuery,
      fitosanitarioStoreMock as ZoosanitarioStore,
      routerMock as Router,
      activatedRouteMock as ActivatedRoute
    );

    (component as any).modalRef = new ModalMock();

    component.crearFormulario();
    component.initActionFormBuild();
  });

  it('debe crear el componente y inicializar el formulario', () => {
    expect(component).toBeTruthy();
    expect(component.forma).toBeDefined();
    expect(component.datosDelaSolicitud).toBeDefined();
  });

  it('debe actualizar datosDelaSolicitud cuando seleccionarDatosSolicitud$ emite', (done) => {
    const patchValueSpy = jest.spyOn(component.datosDelaSolicitud, 'patchValue');

    seleccionarDatosSolicitudSubject.next({
      tipoMercancia: 'yes',
      aduanaIngreso: 'aduana1',
      oficinaInspeccion: 'ofi1',
      puntoInspeccion: 'p1',
      claveUCON: 'UCON12345',
      establecimientoTIF: 'tif1',
      nombreVeterinario: 'vet1',
      numeroGuia: '1234',
      certificacion: 'cert1',
      regimen: 'reg1'
    });

    setTimeout(() => {
      expect(patchValueSpy).toHaveBeenCalledWith(expect.objectContaining({
        tipoMercancia: 'yes',
        aduanaIngreso: 'aduana1',
        oficinaInspeccion: 'ofi1',
        puntoInspeccion: 'p1'
      }));
      expect(component.notificationCheck).toBe(true);
      done();
    }, 0);
  });

  it('debe alternar la propiedad colapsable', () => {
    const initial = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('debe llamar updateDatosDeLaSolicitud en setValoresStore()', () => {
    component.datosDelaSolicitud.patchValue({
      tipoMercancia: 'yes',
      aduanaIngreso: 'AduanaTest',
      oficinaInspeccion: 'OficinaTest',
      puntoInspeccion: 'PuntoTest',
      regimen: 'RegTest'
    });

    component.setValoresStore();

    expect(certificadoServiceMock.updateDatosDeLaSolicitud).toHaveBeenCalledWith(expect.objectContaining({
      tipoMercancia: 'yes'
    }));
  });

  it('debe mostrar las columnas correctas para tipoMercancia "yes"', () => {
    component.datosDelaSolicitud.patchValue({ tipoMercancia: 'yes' });
    component.radioBotonSeleccionado();

    expect(component.configuracionColumnasoli.some(col => col.encabezado.includes('No. partida'))).toBe(true);
  });

  it('debe mostrar las columnas correctas para tipoMercancia "no"', () => {
    component.datosDelaSolicitud.patchValue({ tipoMercancia: 'no' });
    component.radioBotonSeleccionado();

    expect(component.configuracionColumnasoli.some(col => col.encabezado.includes('Tipo planta'))).toBe(true);
  });

  it('debe abrir el componente modal correcto al llamar modificarMercancia', () => {
    component.datosDelaSolicitud.patchValue({ tipoMercancia: 'yes' });
    component.modificarMercancia();

    expect((component as any).modalRef.abrir).toHaveBeenCalledTimes(1);
  });

  it('debe actualizar selectedDatos en el store al llamar seleccionTabla', () => {
    const selectedRows = [{
      id: 1,
      tipoRequisito: 'req1',
      requisito: '',
      numeroCertificadoInternacional: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      nico: '',
      descripcionNico: '',
      descripcion: '',
      umt: '',
      cantidadUMT: 0,
      umc: '',
      cantidadUMC: 0,
      uso: '',
      tipoDeProducto: '',
      numeroDeLote: '',
      paisDeOrigen: '',
      paisDeProcedencia: '',
      certificadoInternacionalElectronico: '',
      especie: '',
      tipoPresentacion: '',
      tipoPlanta: '',
      plantaAutorizadaOrigen: '',
      presentacion: '',
      noPartida: '001'
    }];

    component.seleccionTabla(selectedRows);

    expect(fitosanitarioStoreMock.update).toHaveBeenCalledWith(expect.any(Function));
  });

  it('debe llamar update en el store en eliminarPedimentoDatos cuando borrar = true', () => {
    fitosanitarioStoreMock.getValue = jest.fn().mockReturnValue({
      tablaDatos: [
        { id: 1, tipoRequisito: 'test' },
        { id: 2, tipoRequisito: 'other' }
      ],
      selectedDatos: [{ id: 1 }]
    });

    component.eliminarPedimentoDatos(true);

    expect(fitosanitarioStoreMock.update).toHaveBeenCalledWith(expect.any(Function));
  });

  it('debe validar el formulario como válido cuando todos los campos están llenos', () => {
    component.datosDelaSolicitud.patchValue({
      tipoMercancia: 'yes',
      aduanaIngreso: 'test',
      oficinaInspeccion: 'test',
      puntoInspeccion: 'test',
      regimen: 'test'
    });

    expect(component.validarFormulario()).toBe(true);
  });

  it('debe validar el formulario como inválido cuando los campos están vacíos', () => {
    component.datosDelaSolicitud.patchValue({
      tipoMercancia: '',
      aduanaIngreso: '',
      oficinaInspeccion: '',
      puntoInspeccion: '',
      regimen: ''
    });

    const markAllTouchedSpy = jest.spyOn(component.forma, 'markAllAsTouched');

    expect(component.validarFormulario()).toBe(false);
    expect(markAllTouchedSpy).toHaveBeenCalled();
  });

  it('debe completar destroyNotifier$ en ngOnDestroy()', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
