import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsoEspecificoDeLaMercanciaComponent } from './uso-especifico-de-la-mercancia.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { of } from 'rxjs';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { FormGroup } from '@angular/forms';

describe('UsoEspecificoDeLaMercanciaComponent', () => {
  let component: UsoEspecificoDeLaMercanciaComponent;
  let fixture: ComponentFixture<UsoEspecificoDeLaMercanciaComponent>;
  const mockImportacionState = {
    some: 'state',
    especifico: [
      {
        id: 1,
        descripcion: 'Producto de prueba',
        fraccionArancelariaTigie: '1234.56.78',
        cantidad: 10,
        totalUsd: 100,
        unidadDeMedida: 'Caja',
      },
    ],
  };
  const tramite130103QueryMock = {
    selectImportacion$: of(mockImportacionState),
  };
  let storeMock: any;
  const mockService = {
    getSolicitudMercancia: jest.fn().mockReturnValue(of([])),
    getFraccionArancelaria: jest.fn().mockReturnValue(
      of([
        { id: 1, descripcion: 'Fracción 1' },
        { id: 2, descripcion: 'Fracción 2' },
      ])
    ),
  };
  beforeEach(async () => {
    storeMock = {
      setDynamicFieldValue: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [UsoEspecificoDeLaMercanciaComponent, HttpClientTestingModule],
      providers: [
        { provide: Tramite130103Query, useValue: tramite130103QueryMock },
        { provide: Tramite130103Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsoEspecificoDeLaMercanciaComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer importacionstate desde selectImportacion$', () => {
    component.ngOnInit();
    expect(component.importacionstate).toEqual(mockImportacionState);
  });

  it('debería llamar a setDynamicFieldValue con valor primitivo si valor no es un objeto', () => {
    const event = { campo: 'nombre', valor: 'Juan' };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith(
      'nombre',
      'Juan'
    );
  });

  it('debería no lanzar error cuando event.valor es null', () => {
    const event = { campo: 'otro', valor: null };
    component.establecerCambioDeValor(event);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('otro', null);
  });

  it('no debería lanzar error cuando event es undefined o null', () => {
    expect(() => component.establecerCambioDeValor(null as any)).not.toThrow();
    expect(() =>
      component.establecerCambioDeValor(undefined as any)
    ).not.toThrow();
  });

  it('debería agregar el producto a datosTabla si no se ha agregado previamente', () => {
    const producto = {
      id: 1,
      descripcion: 'Producto de prueba',
      fraccionArancelariaTigie: '1234.56.78',
      cantidad: 10,
      totalUsd: 100,
      unidadDeMedida: 'Caja',
    };
    tramite130103QueryMock.selectImportacion$ = of({
      some: 'state',
      especifico: [producto],
    });
    tramite130103QueryMock.selectImportacion$ = of({
      some: 'state',
      especifico: [producto],
    });
    component.datosTabla = [];
    component.ngOnInit();
    expect(component.datosTabla).toContainEqual(producto);
  });

  it('debería completar destroyNotifier$ en destroy', () => {
    const completeSpy = jest.spyOn(
      (component as any).destroyNotifier$,
      'complete'
    );
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería retornar descripcion desde fraccionArancelariaArray', () => {
    component.ninoFormGroup.get('uso_fraccion_arancelaria')?.setValue(1);
    component['fraccionArancelariaArray'] = [
      { id: 1, descripcion: 'Fracción 1' },
      { id: 2, descripcion: 'Fracción 2' },
    ];
    const result = component.obtenerFraccionArancelariaProsec();
    expect(result).toBe('Fracción 1');
  });

  it('debería agregar fila a datosTabla y reiniciar formulario cuando el formulario es válido', () => {
  component.ninoFormGroup.addControl('uso_fraccion_arancelaria', new FormGroup({}));
  component.ninoFormGroup.addControl('uso_descripcion', new FormGroup({}));
  component.ninoFormGroup.patchValue({ uso_fraccion_arancelaria: 1, uso_descripcion: 'Descripción' });

  jest.spyOn(component.ninoFormGroup, 'valid', 'get').mockReturnValue(true);
  jest.spyOn(component.ninoFormGroup, 'reset');

  component['fraccionArancelariaArray'] = [{ id: 1, descripcion: 'Fracción 1' }];
  component.datosTabla = [];

  component.agregar();

  expect(component.datosTabla.length).toBe(1);
  expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('especifico', component.datosTabla);
  expect(component.ninoFormGroup.reset).toHaveBeenCalled();
});

it('debería retornar descripcion desde fraccionArancelariaArray', () => {
  component.ninoFormGroup.get('uso_fraccion_arancelaria')?.setValue(1);
  component['fraccionArancelariaArray'] = [
    { id: 1, descripcion: 'Fracción 1' },
    { id: 2, descripcion: 'Fracción 2' },
  ];
  const result = component.obtenerFraccionArancelariaProsec();
  expect(result).toBe('Fracción 1');
});


it('debería agregar fila a datosTabla y reiniciar formulario cuando el formulario es válido', () => {
  component.ninoFormGroup.addControl('uso_fraccion_arancelaria', new FormGroup({}));
  component.ninoFormGroup.addControl('uso_descripcion', new FormGroup({}));
  component.ninoFormGroup.patchValue({ uso_fraccion_arancelaria: 1, uso_descripcion: 'Descripción' });

  jest.spyOn(component.ninoFormGroup, 'valid', 'get').mockReturnValue(true);
  jest.spyOn(component.ninoFormGroup, 'reset');

  component['fraccionArancelariaArray'] = [{ id: 1, descripcion: 'Fracción 1' }];
  component.datosTabla = [];

  component.agregar();

  expect(component.datosTabla.length).toBe(1);
  expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('especifico', component.datosTabla);
  expect(component.ninoFormGroup.reset).toHaveBeenCalled();
});


it('debería eliminar el elemento seleccionado de datosTabla', () => {
  component.datosTabla = [
    { id: 1, descripcion: 'desc1', fraccionArancelariaProsec: 'F1' },
    { id: 2, descripcion: 'desc2', fraccionArancelariaProsec: 'F2' },
  ];
  (component as any).seleccionadaId = 1;

  component.eliminar();

  expect(component.datosTabla.length).toBe(1);
  expect(component.datosTabla[0].id).toBe(2);
  expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('especifico', component.datosTabla);
});

it('debería actualizar seleccionadaId con el ID de la fila seleccionada', () => {
  const selectedRow = [{ id: 7 }];
  component.listaDeFilaSeleccionada(selectedRow);
  expect((component as any).seleccionadaId).toBe(7);
});


});
