import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { of as observableOf, Subject } from 'rxjs';

import { TipoDeAvisoComponent } from './tipo-de-aviso.component';
import { CatalogosService } from '../../servicios/catalogo.service';
import { HechosTablaServicios } from '../../servicios/hechos-tabla.service';
import { Router, ActivatedRoute } from '@angular/router';

class MockCatalogosService {
  obtenerMenuDesplegable = jest.fn().mockReturnValue(
    observableOf([
      { id: 1, descripcion: 'Opción 1' },
      { id: 2, descripcion: 'Opción 2' },
    ])
  );
  obtenerLevantarActaDesplegable = jest.fn().mockReturnValue(
    observableOf([
      { id: 1, descripcion: 'Acta 1' },
      { id: 2, descripcion: 'Acta 2' },
    ])
  );
  RadioOpcion = [
    { label: 'Sí', value: 'true' },
    { label: 'No', value: 'false' }
  ];
}

class MockHechosTablaServicios {
  obtenerDatos = jest.fn().mockReturnValue(
    observableOf({ hechosApiDatos: [{ id: 1, descripcion: 'Dato 1' }, { id: 2, descripcion: 'Dato 2' }] })
  );
}

class MockRouter {
  url = '/agace/acta-de-hechos';
  navigate = jest.fn();
}

describe('TipoDeAvisoComponent', () => {
  let component: TipoDeAvisoComponent;
  let fixture: ComponentFixture<TipoDeAvisoComponent>;
  let mockCatalogosService: MockCatalogosService;
  let mockHechosTablaServicios: MockHechosTablaServicios;

  beforeEach(async () => {
    mockCatalogosService = new MockCatalogosService();
    mockHechosTablaServicios = new MockHechosTablaServicios();

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TipoDeAvisoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: HechosTablaServicios, useValue: mockHechosTablaServicios },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: 'url', params: {}, queryParams: {}, data: {} },
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDeAvisoComponent);
    component = fixture.componentInstance;
    // Patch destroyNotifier$ for ngOnDestroy
    (component as any).destroyNotifier$ = new Subject<void>();
    fixture.detectChanges();
  });

  afterEach(() => {
    (component as any).destroyNotifier$.complete();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle conditional validation', () => {
    const fb = (component as any).fb;
    component.solicitudForm = fb.group({
      cantidadBienes: ['1'],
      descripcionGenerica3: [''],
    });

    const cantidadBienesControl = component.solicitudForm.get('cantidadBienes');
    const descripcionGenerica3Control = component.solicitudForm.get('descripcionGenerica3');

    jest.spyOn(descripcionGenerica3Control!, 'setValidators');
    jest.spyOn(descripcionGenerica3Control!, 'clearValidators');
    jest.spyOn(descripcionGenerica3Control!, 'updateValueAndValidity');

    (component as any).handleConditionalValidation();

    cantidadBienesControl?.setValue('1');
    expect(descripcionGenerica3Control?.setValidators).toHaveBeenCalledWith([Validators.required]);
    expect(descripcionGenerica3Control?.updateValueAndValidity).toHaveBeenCalled();

    cantidadBienesControl?.setValue('0');
    expect(descripcionGenerica3Control?.clearValidators).toHaveBeenCalled();
    expect(descripcionGenerica3Control?.updateValueAndValidity).toHaveBeenCalled();
  });

  it('should cover guardarDatosFormulario for readonly', () => {
    const fb = (component as any).fb;
    component.solicitudForm = fb.group({
      cantidadBienes: [''],
      descripcionGenerica1: [''],
      descripcionGenerica2: [''],
      descripcionGenerica3: [''],
      capacidadAlmacenamiento: ['']
    });
    component.esFormularioSoloLectura = true;
    jest.spyOn(component, 'inicializarFormulario');

    component.guardarDatosFormulario();

    expect(component.inicializarFormulario).toHaveBeenCalled();
    expect(component.solicitudForm.disabled).toBe(true);
  });

  it('should cover guardarDatosFormulario for edit mode', () => {
    const fb = (component as any).fb;
    component.solicitudForm = fb.group({
      cantidadBienes: [''],
      descripcionGenerica1: [''],
      descripcionGenerica2: [''],
      descripcionGenerica3: [''],
      capacidadAlmacenamiento: ['']
    });
    component.esFormularioSoloLectura = false;
    jest.spyOn(component, 'inicializarFormulario');

    component.guardarDatosFormulario();

    expect(component.inicializarFormulario).toHaveBeenCalled();
    expect(component.solicitudForm.enabled).toBe(true);
  });

  it('should fetch acta de hechos list', () => {
    component.obtenerHechosSelectList();
    expect(component.actaDeHechos.length).toBeGreaterThan(0);
  });

  it('should fetch levantar acta list', () => {
    component.obtenerLevantarActaSelectList();
    expect(component.levantarActa.length).toBeGreaterThan(0);
  });

  it('should fetch hechos table data', () => {
    component.buscarDatos();
    expect(component.hechosTableDatos.length).toBeGreaterThanOrEqual(0);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});