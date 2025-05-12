import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { of, Subject, takeUntil } from 'rxjs';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { FormControl, FormGroup } from '@angular/forms';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let fixture: ComponentFixture<PartidasDeLaMercanciaComponent>;

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
    component.datosTabla = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set importacionstate and push producto to datosTabla if not already added', () => {
    component.datosTabla = [];
    component.ngOnInit();
    expect(component.importacionstate).toEqual(importacionStateMock);
    expect(component.datosTabla).toContain(productoMock);
  });

  it('should not add producto to datosTabla if already exists', () => {
    component.datosTabla = [productoMock];
    component.ngOnInit();
    const occurrences = component.datosTabla.filter(p => p.id === productoMock.id);
    expect(occurrences.length).toBe(1);
  });

  it('should push product to datosTabla and call store when form is valid', () => {
    const mockFormGroup = new FormGroup({
      cantidad: new FormControl(10),
      fraccionArancelariaTigie: new FormControl('1234.56.78'),
      descripcion: new FormControl('Producto de prueba'),
      valorPartidaUsd: new FormControl(100)
    });
  
    jest.spyOn(component as any, 'ninoFormGroup', 'get').mockReturnValue(mockFormGroup);
    component.agregar();
    expect(component.datosTabla.length).toBe(1);
    expect(component.datosTabla[0]).toEqual({
      id: 1,
      cantidad: 10,
      unidadDeMedida: 'Caja',
      fraccionArancelariaTigie: '1234.56.78',
      descripcion: 'Producto de prueba',
      precioUnitario: '1.000',
      totalUsd: 100
    });
    expect(tramite130103StoreMock.setDynamicFieldValue).toHaveBeenCalledWith(
      'producto',
      component.datosTabla[0]
    );
    expect(component.ninoFormGroup.pristine).toBe(true);
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

   it('should call store with field and id value when event.valor has id', () => {
    const event = {
      campo: 'productoId',
      valor: { id: 99, nombre: 'Producto 99' }
    };
    component.establecerCambioDeValor(event);
    expect(tramite130103StoreMock.setDynamicFieldValue).toHaveBeenCalledWith('productoId', 99);
  });
  
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
  
  
});
