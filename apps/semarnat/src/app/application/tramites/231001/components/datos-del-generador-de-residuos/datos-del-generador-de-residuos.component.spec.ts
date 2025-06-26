import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDelGeneradorDeResiduosComponent } from './datos-del-generador-de-residuos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import { Tramite231001Store } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosDelGeneradorDeResiduosComponent', () => {
  let component: DatosDelGeneradorDeResiduosComponent;
  let fixture: ComponentFixture<DatosDelGeneradorDeResiduosComponent>;
  let mockCatalogosService: any;
  let mockTramiteQuery: any;
  let mockTramiteStore: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Aduana 1' }])),
    };
    mockTramiteQuery = {
      selectSolicitud$: of({
        numeroRegistroAmbiental: 'ABC',
        descripcionGenerica1: 'Desc',
        numeroProgramaImmex: 'IMMEX',
        aduanas: 1,
      }),
    };
    mockTramiteStore = {
      actualizarEstado: jest.fn(),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDelGeneradorDeResiduosComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: Tramite231001Query, useValue: mockTramiteQuery },
        { provide: Tramite231001Store, useValue: mockTramiteStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelGeneradorDeResiduosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and aduanas on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
    expect(component.datosForm).toBeDefined();
    expect(component.aduanas).toEqual([{ id: 1, descripcion: 'Aduana 1' }]);
  });

  it('should set aduanas from service', () => {
    component.aduanasdata();
    expect(mockCatalogosService.getCatalogo).toHaveBeenCalled();
    expect(component.aduanas).toEqual([{ id: 1, descripcion: 'Aduana 1' }]);
  });

  it('should set esFormularioSoloLectura and disable forms', () => {
    component.esFormularioSoloLectura = true;
    component.solicitudForm = new FormBuilder().group({ test: ['value'] });
    component.datosForm = new FormBuilder().group({ aduanas: ['Aduana 1'] });
    component.guardarDatosFormulario();
    expect(component.solicitudForm.disabled).toBe(true);
    expect(component.datosForm.disabled).toBe(true);
  });

  it('should enable forms if not readonly', () => {
    component.esFormularioSoloLectura = false;
    component.solicitudForm = new FormBuilder().group({ test: ['value'] });
    component.datosForm = new FormBuilder().group({ aduanas: ['Aduana 1'] });
    component.guardarDatosFormulario();
    expect(component.solicitudForm.enabled).toBe(true);
    expect(component.datosForm.enabled).toBe(true);
  });

  it('should update store with setValoresStore', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    component.setValoresStore(form, 'campo');
    expect(mockTramiteStore.actualizarEstado).toHaveBeenCalledWith({ campo: 'valor' });
  });

  it('should return true for isInvalid if control is invalid and touched', () => {
    component.solicitudForm = new FormBuilder().group({
      datosdelForm: new FormBuilder().group({
        test: ['', Validators.required],
      }),
    });
    const control = component.solicitudForm.get('datosdelForm.test');
    control?.markAsTouched();
    expect(component.isInvalid('test')).toBe(true);
  });

  it('should mark all as touched on submit', () => {
    component.solicitudForm = new FormBuilder().group({
      datosdelForm: new FormBuilder().group({
        test: ['', Validators.required],
      }),
    });
    const spy = jest.spyOn(component.solicitudForm, 'markAllAsTouched');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
});