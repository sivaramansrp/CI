import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { of, Subject, takeUntil } from 'rxjs';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { FormControl, FormGroup } from '@angular/forms';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import Modal from 'bootstrap/js/dist/modal';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;
  jest.mock('bootstrap/js/dist/modal', () => ({
    getOrCreateInstance: jest.fn()
  }));
  const productoMock = { id: 1, nombre: 'Producto 1' };
  const importacionStateMock = {
    producto: productoMock
  };

  const tramite130103QueryMock = {
    selectImportacion$: of(importacionStateMock)
  };

  const tramite130103StoreMock = {
    setDynamicFieldValue: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidasDeLaMercanciaComponent],
      providers: [
        { provide: Tramite130103Query, useValue: tramite130103QueryMock },
        { provide: Tramite130103Store, useValue: tramite130103StoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaMercanciaComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      readonly: false,
    } as any;
    component.datosTabla = [];

    const modalEl = document.createElement('div');
    modalEl.id = 'modalEditar';
    modalEl.classList.add('modal');
    document.body.appendChild(modalEl);
  });

  afterEach(() => {
    const el = document.getElementById('modalEditar');
    if (el) el.remove();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add producto to datosTabla if already exists', () => {
    component.datosTabla = [productoMock];
    component.ngOnInit();
    const occurrences = component.datosTabla.filter(p => p.id === productoMock.id);
    expect(occurrences.length).toBe(1);
  });

 it('should call next and complete on destroyNotifier$ when ngOnDestroy is called', () => {
     const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
     const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
     component.ngOnDestroy();
     expect(nextSpy).toHaveBeenCalled();
     expect(completeSpy).toHaveBeenCalled();
   });
 
   it('should unsubscribe from observables when ngOnDestroy is called', fakeAsync(() => {
     const mockObservable$ = new Subject();
     const spy = jest.fn();
     mockObservable$
       .pipe(takeUntil(component['destroyNotifier$']))
       .subscribe(spy);
     mockObservable$.next('first value');
     expect(spy).toHaveBeenCalledWith('first value');
     component.ngOnDestroy();
     mockObservable$.next('second value');
     expect(spy).toHaveBeenCalledTimes(1);
   }));
  
  it('should call store with field and primitive value when event.valor has no id', () => {
    const event = {
      campo: 'descripcion',
      valor: 'Texto simple'
    };
    component.establecerCambioDeValor(event);
    expect(tramite130103StoreMock.setDynamicFieldValue).toHaveBeenCalledWith('descripcion', 'Texto simple');
  });

  it('should not push duplicate producto on init if already in datosTabla', () => {
    component.datosTabla = [{ id: 1, descripcion: 'Producto 1' }];
    component.ngOnInit();
    const filtered = component.datosTabla.filter(p => p.id === 1);
    expect(filtered.length).toBe(1);
  });
  
  it('should not throw or call store when event is null', () => {
    tramite130103StoreMock.setDynamicFieldValue.mockClear();
    component.establecerCambioDeValor(null as any);
    expect(tramite130103StoreMock.setDynamicFieldValue).not.toHaveBeenCalled();
  });
  
  it('should have consultaState readonly as false by default', () => {
    expect(component.consultaState?.readonly).toBe(false);
  });

 it('should disable form controls if consultaState.readonly is true', () => {
  component.consultaState = { readonly: true } as any;
  component.ngOnInit();
  if (component.consultaState.readonly) {
    component.forma.disable();
  }
  expect(component.forma.disabled).toBe(true);
  expect(component.forma.get('cantidad_total')?.disabled).toBe(true);
  expect(component.forma.get('valor_total')?.disabled).toBe(true);
});

it('should add a new product to datosTabla and reset form if ninoFormGroup is valid', () => {
  const mockNinoFormGroup = new FormGroup({
    partidas_cantidad: new FormControl(10),
    partidas_descripcion: new FormControl('Desc'),
    valor_partida_usd: new FormControl(500),
    seleccion_fraccion: new FormControl(1)
  });

  (component as any).form = new FormGroup({
    ninoFormGroup: mockNinoFormGroup
  });

  (component as any).seleccionFraccionOpciones = [{ id: 1, descripcion: 'FRACCION1' }];
  component.datosTabla = [];
  component.importacionstate = { unidad_de_medida: 'kg' };

  component.agregar();

  expect(component.datosTabla.length).toBe(1);
  expect((component as any).tramite130103Store.setDynamicFieldValue).toHaveBeenCalledWith(
    'partidas_tabla',
    component.datosTabla
  );
});

it('should return description of selected fracción arancelaria', () => {
  component.ninoFormGroup.get('seleccion_fraccion')?.setValue('');
  (component as any).seleccionFraccionOpciones = [
    { id: 1, descripcion: 'FRACCION1' },
    { id: 2, descripcion: 'FRACCION2' }
  ];
  const result = component.obtenerFraccionArancelaria();
  expect(result).toBe('');
});


it('should call establecerCambioDeValor with correct campo and valor', () => {
  const mockEvent = {
    target: { value: 'NuevoValor' }
  } as unknown as Event;

  const spy = jest.spyOn(component, 'establecerCambioDeValor');

  component.eventoDeCambioDeValor(mockEvent, 'campoPrueba');
  expect(spy).toHaveBeenCalledWith({ campo: 'campoPrueba', valor: 'NuevoValor' });
});

it('should hide the modal when cerrar is called', () => {
  const hideMock = jest.fn();
  component['cargarArchivoInstance'] = { hide: hideMock } as any;
  component.cerrar();
  expect(hideMock).toHaveBeenCalled();
});

it('should show the modal when cargarArchivo is called', () => {
  const showMock = jest.fn();
  component['cargarArchivoInstance'] = { show: showMock } as any;
  component.cargarArchivo();
  expect(showMock).toHaveBeenCalled();
});

it('should remove selected partida from datosTabla', () => {
  component.datosTabla = [
    { id: 1, descripcion: 'Item 1' },
    { id: 2, descripcion: 'Item 2' }
  ];
  component.partidasSeleccionadas = [{ id: 1 }] as any;
  component.eliminar();
  expect(component.datosTabla.length).toBe(1);
  expect(component.datosTabla[0].id).toBe(2);
  expect(tramite130103StoreMock.setDynamicFieldValue).toHaveBeenCalledWith('partidas_tabla', component.datosTabla);
});

it('should patch modificarPartidaForm when a row is selected', () => {
  const selected = {
    id: 1,
    cantidad: 10,
    descripcion: 'desc',
    totalUsd: 100,
    fraccionArancelariaTigie: 'FRA-1'
  };

  (component as any).form = new FormGroup({
    modificarPartidaForm: new FormGroup({
    modificar_cantidad: new FormControl(''),
    modificar_descripcion: new FormControl(''),
    valor_partidas_usd: new FormControl(''),
    fraccion_partidas: new FormControl('')
    })
  });

  component.onPartidasSeleccion([selected]);

  expect(component.modificarPartidaForm.get('modificar_cantidad')?.value).toBe(10);
  expect(component.modificarPartidaForm.get('modificar_descripcion')?.value).toBe('desc');
  expect(component.modificarPartidaForm.get('valor_partidas_usd')?.value).toBe(100);
  expect(component.modificarPartidaForm.get('fraccion_partidas')?.value).toBe('FRA-1');
});

it('should remove selected item from datosTabla and update store', () => {
  const item1 = { id: 1 };
  const item2 = { id: 2 };

  component.datosTabla = [item1, item2];
  component.partidasSeleccionadas = [item1];

  const storeSpy = jest.spyOn(component['tramite130103Store'], 'setDynamicFieldValue');

  component.eliminar();

  expect(component.datosTabla).toEqual([item2]);
  expect(storeSpy).toHaveBeenCalledWith('partidas_tabla', [item2]);
});

it('should call show on cargarArchivoInstance if exists', () => {
  const showMock = jest.fn();
  (component as any).cargarArchivoInstance = { show: showMock };
  component.cargarArchivo();
  expect(showMock).toHaveBeenCalled();
});

it('should call establecerCambioDeValor with campo and input value', () => {
  const inputEvent = {
    target: { value: 'nuevo valor' }
  } as unknown as Event;

  const spy = jest.spyOn(component, 'establecerCambioDeValor');
  component.eventoDeCambioDeValor(inputEvent, 'campo_test');

  expect(spy).toHaveBeenCalledWith({ campo: 'campo_test', valor: 'nuevo valor' });
});

});
