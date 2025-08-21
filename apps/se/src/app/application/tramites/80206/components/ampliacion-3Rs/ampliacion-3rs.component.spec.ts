import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { Ampliacion3RsComponent } from './ampliacion-3rs.component';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { Tramite80206Store } from '../../estados/tramite80206.store';
import { HttpClient } from '@angular/common/http';

class MockAmpliacionServiciosService {
  obtenerReglaSelectList = jest.fn();
  obtenerSectorSelectList = jest.fn();
  enviarDeberiaMostrar = jest.fn();
}

class MockAmpliacionServiciosQuery {
  // Se reasigna en cada prueba si es necesario
  selectSolicitudTramite$ = of({});
}

class MockTramite80206Store {
  setReglaSeleccionada = jest.fn();
  setSectorDesplegable = jest.fn();
  setDatosSector = jest.fn();
  setIsSelectedRegla = jest.fn();
  setSeleccionarRegla = jest.fn();
  setSector = jest.fn();
}

class MockHttpClient {
  post() {}
}

describe('Ampliacion3RsComponent (Jest en español)', () => {
  let fixture: ComponentFixture<Ampliacion3RsComponent>;
  let component: Ampliacion3RsComponent;

  let svc: MockAmpliacionServiciosService;
  let query: MockAmpliacionServiciosQuery;
  let store: MockTramite80206Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [Ampliacion3RsComponent],
      providers: [
        FormBuilder,
        { provide: AmpliacionServiciosService, useClass: MockAmpliacionServiciosService },
        { provide: AmpliacionServiciosQuery, useClass: MockAmpliacionServiciosQuery },
        { provide: Tramite80206Store, useClass: MockTramite80206Store },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Ampliacion3RsComponent);
    component = fixture.componentInstance;

    svc = TestBed.inject(AmpliacionServiciosService) as any;
    query = TestBed.inject(AmpliacionServiciosQuery) as any;
    store = TestBed.inject(Tramite80206Store) as any;

    svc.obtenerReglaSelectList.mockReturnValue(of({ data: [{ id: 1, descripcion: 'R1' }] }));
    svc.obtenerSectorSelectList.mockReturnValue(of({ data: [{ id: 10, descripcion: 'S1' }] }));

    (query as any).selectSolicitudTramite$ = of({
      reglaSeleccionada: [{ id: 1, descripcion: 'R1' }],
      sectorDesplegable: [{ id: 10, descripcion: 'S1' }],
      datosSector: [],
      isSelectedRegla: false,
      seleccionaLaModalidad: 'MODO',
      seleccionarRegla: '',
      sector: '',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    fixture.destroy();
  });

  it('debería crearse y tener el formulario inicializado en el constructor', () => {
    expect(component).toBeTruthy();
    expect(component.formularioInfoRegistro).toBeTruthy();
    expect(component.formularioInfoRegistro.get('seleccionaLaModalidad')).toBeTruthy();
    expect(component.formularioInfoRegistro.get('seleccionarRegla')).toBeTruthy();
    expect(component.formularioInfoRegistro.get('sector')).toBeTruthy();
  });

  


  it('debería inicializar el formulario al invocar inicializarFormularioInfoRegistro()', () => {
    const spy = jest.spyOn((component as any).fb, 'group');
    component.inicializarFormularioInfoRegistro();
    expect(spy).toHaveBeenCalled();
    expect(component.formularioInfoRegistro.get('seleccionaLaModalidad')).toBeTruthy();
  });

  it('debería cargar y propagar datos desde el almacén en inicializarFormularioDesdeAlmacen()', () => {
    (query as any).selectSolicitudTramite$ = of({
      datosSector: [{ descripcion: 'A' }],
      isSelectedRegla: true,
      seleccionaLaModalidad: 'X',
      seleccionarRegla: '2',
      sector: '3',
    });

    const patchSpy = jest.spyOn(component.formularioInfoRegistro, 'patchValue');
    component.inicializarFormularioDesdeAlmacen();

    expect(patchSpy).toHaveBeenCalledWith({
      seleccionaLaModalidad: 'X',
      seleccionarRegla: '2',
      sector: '3',
    });
    expect(component.datosSector).toEqual([{ descripcion: 'A' }]);
    expect(component.isSelectedRegla).toBe(true);
    expect(svc.enviarDeberiaMostrar).toHaveBeenCalledWith(true);
  });

  it('debería obtener reglas y actualizar el store en obtenerReglaSelectList()', () => {
    svc.obtenerReglaSelectList.mockReturnValue(of({ data: [{ id: 7, descripcion: 'R7' }] }));
    (query as any).selectSolicitudTramite$ = of({ reglaSeleccionada: [{ id: 99, descripcion: 'RX' }] });

    component.obtenerReglaSelectList();

    expect(svc.obtenerReglaSelectList).toHaveBeenCalled();
    expect(store.setReglaSeleccionada).toHaveBeenCalledWith([{ id: 7, descripcion: 'R7' }]);
    expect(component.reglaSeleccionada).toEqual([{ id: 99, descripcion: 'RX' }]);
  });

  it('debería obtener sectores y actualizar el store en obtenerSectorSelectList()', () => {
    svc.obtenerSectorSelectList.mockReturnValue(of({ data: [{ id: 55, descripcion: 'S55' }] }));
    (query as any).selectSolicitudTramite$ = of({ sectorDesplegable: [{ id: 77, descripcion: 'S77' }] });

    component.obtenerSectorSelectList();

    expect(svc.obtenerSectorSelectList).toHaveBeenCalled();
    expect(store.setSectorDesplegable).toHaveBeenCalledWith([{ id: 55, descripcion: 'S55' }]);
    expect(component.sectorDesplegable).toEqual([{ id: 77, descripcion: 'S77' }]);
  });

  it('debería eliminar filas seleccionadas en eliminarServiciosGrid()', () => {
    component.datosSector = [
      { descripcion: 'A' } as any,
      { descripcion: 'B' } as any,
      { descripcion: 'C' } as any,
    ];
    component.domiciliosSeleccionados = [{ descripcion: 'A' } as any, { descripcion: 'C' } as any];

    component.eliminarServiciosGrid();

    expect(store.setDatosSector).toHaveBeenCalledWith([{ descripcion: 'B' }]);
    expect(component.domiciliosSeleccionados).toEqual([]);
  });

  it('debería agregar servicios en agregarServiciosAmpliacion()', () => {
    component.datosSector = [{ descripcion: 'EXISTENTE' } as any];
    component.recibioSector = [{ descripcion: 'NUEVO', descripcionSector: 'S-NUEVO' } as any];

    component.agregarServiciosAmpliacion();

    expect(store.setDatosSector).toHaveBeenCalledWith([
      { descripcion: 'EXISTENTE' },
      { descripcion: 'NUEVO', descripcionSector: 'S-NUEVO' },
    ]);
  });

  it('debería marcar selección de domicilios en seleccionarDomicilios()', () => {
    const entrada = [{ descripcion: 'D1' } as any, { descripcion: 'D2' } as any];
    component.seleccionarDomicilios(entrada);
    expect(component.domiciliosSeleccionados).toEqual(entrada);
    expect(component.domiciliosSeleccionados).not.toBe(entrada); // copia (spread)
  });

  it('debería procesar datos del hijo con coincidencia de regla (isSelectedRegla=true)', () => {
    component.reglaSeleccionada = [{ id: 5, descripcion: 'R5' }] as any;

    component.procesarDatosDelHijo({ id: 5 } as any);

    expect(component.isSelectedRegla).toBe(true);
    expect(svc.enviarDeberiaMostrar).toHaveBeenCalledWith(true);
    expect(store.setIsSelectedRegla).toHaveBeenCalledWith(true);
    expect(store.setSeleccionarRegla).toHaveBeenCalledWith('5');
    expect(component.formularioInfoRegistro.get('seleccionarRegla')?.value).toBe(5);
  });

  it('debería procesar datos del hijo sin coincidencia de regla (isSelectedRegla=false) y mostrar alerta', () => {
    component.reglaSeleccionada = [{ id: 10, descripcion: 'R10' }] as any;

    component.procesarDatosDelHijo({ id: 99 } as any);

    expect(component.isSelectedRegla).toBe(false);
    expect(svc.enviarDeberiaMostrar).toHaveBeenCalledWith(false);
    expect(store.setIsSelectedRegla).toHaveBeenCalledWith(false);
    expect(store.setSeleccionarRegla).toHaveBeenCalledWith('99');
    expect(component.mostrarAlerta).toBe(true);
    expect((component as any).mensajeDeAlerta).toBeTruthy(); // tiene algún mensaje
  });

  it('debería cambiar el sector en cambioDeSector()', () => {
    const dato = { id: 123, descripcion: 'Sector 123' } as any;
    component.cambioDeSector(dato);

    expect(component.formularioInfoRegistro.get('sector')?.value).toBe(123);
    expect(component.recibioSector).toEqual([dato]);
    expect(store.setSector).toHaveBeenCalledWith('123');
  });

  it('debería activar y cerrar el modal (activarModal / aceptar / cerrarModal)', () => {
    expect(component.mostrarAlerta).toBe(false);
    component.activarModal();
    expect(component.mostrarAlerta).toBe(true);
    component.aceptar();
    expect(component.mostrarAlerta).toBe(false);
    component.activarModal();
    component.cerrarModal();
    expect(component.mostrarAlerta).toBe(false);
  });

  it('debería ejecutar ngOnDestroy limpiando suscripciones y notificando al servicio', () => {
    const notifier = (component as any).destroyNotifier$ as Subject<void>;
    const nextSpy = jest.spyOn(notifier, 'next');
    const completeSpy = jest.spyOn(notifier, 'complete');

    component.ngOnDestroy();

    expect(svc.enviarDeberiaMostrar).toHaveBeenCalledWith(true);
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
