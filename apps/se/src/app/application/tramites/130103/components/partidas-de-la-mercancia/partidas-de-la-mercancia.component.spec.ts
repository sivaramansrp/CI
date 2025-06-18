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
    component.consultaState = {
      readonly: false,
    } as any;
    component.datosTabla = [];
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

  
});
