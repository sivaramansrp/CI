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
  const mockReglas = [{ id: 7, descripcion: 'R7' }];
  component['catalogoServices'] = {
    seleccionarReglaCatalogo: jest.fn().mockReturnValue(of({ datos: mockReglas }))
  } as any;

  (component as any).ampliacionServiciosQuery = {
    selectSolicitudTramite$: of({ reglaSeleccionada: [{ id: 99, descripcion: 'RX' }] })
  };

  component['tramite80206Store'] = {
    setReglaSeleccionada: jest.fn()
  } as any;

  component.obtenerReglaSelectList('someTramite');

  expect(component['catalogoServices'].seleccionarReglaCatalogo).toHaveBeenCalledWith('someTramite');
  expect(component['tramite80206Store'].setReglaSeleccionada).toHaveBeenCalledWith(mockReglas);
  expect(component.reglaSeleccionada).toEqual([{ id: 99, descripcion: 'RX' }]);
});

it('debería obtener sectores y actualizar el store en obtenerSectorSelectList()', () => {
  const mockSectores = [{ id: 55, descripcion: 'S55' }];
  component['catalogoServices'] = {
    sectoresCatalogo: jest.fn().mockReturnValue(of({ datos: mockSectores }))
  } as any;

  (component as any).ampliacionServiciosQuery = {
    selectSolicitudTramite$: of({ sectorDesplegable: [{ id: 77, descripcion: 'S77' }] })
  };

  component['tramite80206Store'] = {
    setSectorDesplegable: jest.fn()
  } as any;

  // Use string if your component expects string
  component['tramiteID'] = '123';

  component.obtenerSectorSelectList();

  expect(component['catalogoServices'].sectoresCatalogo).toHaveBeenCalledWith('123');
  expect(component['tramite80206Store'].setSectorDesplegable).toHaveBeenCalledWith(mockSectores);
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
  // Arrange: reglaSeleccionada tiene un objeto con id 5
  component.reglaSeleccionada = [{ id: 5, descripcion: 'R5' }] as any;
  // Simula que el usuario seleccionó la regla con id 5
  component.formularioInfoRegistro.get('seleccionarRegla')?.setValue(5);

  // Act
  component.procesarDatosDelHijo();

  // Assert
  expect(component.isSelectedRegla).toBe(true);
  expect(component.mostrarAlerta).toBe(false);
  expect(svc.enviarDeberiaMostrar).toHaveBeenCalledWith(true);
  expect(store.setIsSelectedRegla).toHaveBeenCalledWith(true);
  expect(store.setSeleccionarRegla).toHaveBeenCalledWith('5');
  expect(component.formularioInfoRegistro.get('seleccionarRegla')?.value).toBe(5);
});

it('debería procesar datos del hijo sin coincidencia de regla (isSelectedRegla=false) y mostrar alerta', () => {
  // Arrange: reglaSeleccionada tiene un objeto con id 10
  component.reglaSeleccionada = [{ id: 10, descripcion: 'R10' }] as any;
  // Simula que el usuario seleccionó una regla que NO existe en reglaSeleccionada
  component.formularioInfoRegistro.get('seleccionarRegla')?.setValue(99);

  // Act
  component.procesarDatosDelHijo();

  // Assert
  expect(component.isSelectedRegla).toBe(false);
  expect(component.mostrarAlerta).toBe(true);
  expect((component as any).mensajeDeAlerta).toBeTruthy();
  expect(svc.enviarDeberiaMostrar).toHaveBeenCalledWith(false);
  expect(store.setIsSelectedRegla).toHaveBeenCalledWith(false);
  expect(store.setSeleccionarRegla).toHaveBeenCalledWith('99');
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
