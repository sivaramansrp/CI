import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsoEspecificoDeLaMercanciaComponent } from './uso-especifico-de-la-mercancia.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { of } from 'rxjs';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';

describe('UsoEspecificoDeLaMercanciaComponent', () => {
  let component: UsoEspecificoDeLaMercanciaComponent;
  let fixture: ComponentFixture<UsoEspecificoDeLaMercanciaComponent>;
  const mockImportacionState = { 
    some: 'state', 
    especifico: {
      id: 1,
      descripcion: 'Producto de prueba',
      fraccionArancelariaTigie: '1234.56.78',
      cantidad: 10,
      totalUsd: 100,
      unidadDeMedida: 'Caja'
    }
  };
  const tramite130103QueryMock = {
    selectImportacion$: of(mockImportacionState),
  };
  let storeMock: any;
  const mockService = {
    getSolicitudMercancia: jest.fn().mockReturnValue(of([])),
    getFraccionArancelaria: jest.fn().mockReturnValue(of([
      { id: 1, descripcion: 'Fracción 1' },
      { id: 2, descripcion: 'Fracción 2' }
    ]))
  };
  beforeEach(async () => {
    storeMock = {
      setDynamicFieldValue: jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [UsoEspecificoDeLaMercanciaComponent, HttpClientTestingModule],
      providers: [
        { provide: Tramite130103Query, useValue: tramite130103QueryMock },
        { provide: Tramite130103Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsoEspecificoDeLaMercanciaComponent);
    component = fixture.componentInstance;
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

  it('should push ESPECIFICO to datosTabla and call store when form is valid', () => {
    component.ninoFormGroup.patchValue({
      descripcion: 'Producto agregado',
      fraccionArancelaria: 'dummy'
    });
    component.prosec = 'PROSEC Sample';
    component.datosTabla = [];
    component.agregar();
    expect(component.datosTabla.length).toBe(1);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('especifico', {
      id: 1,
      fraccion_arancelaria_prosec: 'PROSEC Sample',
      descripcion: 'Producto agregado',
    });
  });
    
  it('should push producto to datosTabla if not already added', () => {
    const producto = {
      id: 1,
      descripcion: 'Producto de prueba',
      fraccionArancelariaTigie: '1234.56.78',
      cantidad: 10,
      totalUsd: 100,
      unidadDeMedida: 'Caja'
    };
    tramite130103QueryMock.selectImportacion$ = of({ 
      some: 'state', 
      especifico: producto 
    });
    tramite130103QueryMock.selectImportacion$ = of({ some: 'state', especifico: producto });
    component.datosTabla = [];
    component.ngOnInit();
    expect(component.datosTabla).toContainEqual(producto);
  });
  
  
  it('should complete destroyNotifier$ on destroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  
});
