import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { of } from 'rxjs';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  const mockImportacionState = { some: 'state' };
  const tramite130103QueryMock = {
    selectImportacion$: of(mockImportacionState),
  };
  let storeMock: any;
  beforeEach(async () => {
    storeMock = {
      setDynamicFieldValue: jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [RepresentacionFederalComponent],
      providers: [
        { provide: Tramite130103Query, useValue: tramite130103QueryMock },
        { provide: Tramite130103Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set importacionstate from selectImportacion$', () => {
    component.ngOnInit();
    expect(component.importacionstate).toEqual(mockImportacionState);
  });

  it('should call setDynamicFieldValue with object.id if valor is an object with id', () => {
    const event = { campo: 'entidad', valor: { id: 42, descripcion: 'CDMX' } };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('entidad', 42);
  });

  it('should call setDynamicFieldValue with primitive value if valor is not object', () => {
    const event = { campo: 'nombre', valor: 'Juan' };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('nombre', 'Juan');
  });

  it('should call setDynamicFieldValue with full object if valor is object without id', () => {
    const event = { campo: 'custom', valor: { nombre: 'sin ID' } };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('custom', { nombre: 'sin ID' });
  });

  it('should not throw when event.valor is null', () => {
    const event = { campo: 'otro', valor: null };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('otro', null);
  });

  it('should not throw when event is undefined or null', () => {
    expect(() => component.establecerCambioDeValor(null as any)).not.toThrow();
    expect(() => component.establecerCambioDeValor(undefined as any)).not.toThrow();
  });
});
