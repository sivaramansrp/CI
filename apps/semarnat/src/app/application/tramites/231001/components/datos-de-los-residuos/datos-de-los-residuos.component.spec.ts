import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Catalogo, MateriaprimaformserviceService } from '@ng-mf/data-access-user';
import { DatosDeLosResiduosComponent } from './datos-de-los-residuos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { MateriaprimaformserviceService } from '../../services/materia-prima-formservice.service';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import { Tramite231001Store } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosDeLosResiduosComponent', () => {
  let component: DatosDeLosResiduosComponent;
  let fixture: ComponentFixture<DatosDeLosResiduosComponent>;
  let mockService: any;
  let mockTramiteQuery: any;
  let mockTramiteStore: any;
  let mockConsultaioQuery: any;
  let service: MateriaprimaformserviceService;

  beforeEach(async () => {
    mockService = {
      getUnidadMedida: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Unidad' }])),
      getCapituloFraccion: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Capítulo' }])),
      getPartidaFraccion: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Partida' }])),
      getSubPartidaFraccion: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'SubPartida' }])),
      getFraccionArancelariaParametros: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Fracción' }])),
    };
    mockTramiteQuery = {
      selectSolicitud$: of({
        nombreDeLaMateriaPrima: 'Test',
        cantidad: 10,
        cantidadEnLetra: 'DIEZ',
        unidadMedidaComercial: 1,
        capituloFraccion: 1,
        partidaFraccion: 1,
        subPartidaFraccion: 1,
        fraccion: 1,
      }),
    };
    mockTramiteStore = {
      actualizarEstado: jest.fn(),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDeLosResiduosComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: MateriaprimaformserviceService, useValue: mockService },
        { provide: Tramite231001Query, useValue: mockTramiteQuery },
        { provide: Tramite231001Store, useValue: mockTramiteStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MateriaprimaformserviceService);
    fixture.detectChanges();
  });

  it('should create the component', () => {

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load combos on ngOnInit', () => {
    component.ngOnInit();
    expect(component.comboUnidadMedida).toEqual([{ id: 1, descripcion: 'Unidad' }]);
    expect(component.comboCapituloFraccion).toEqual([{ id: 1, descripcion: 'Capítulo' }]);
    expect(component.comboPartidaFraccion).toEqual([{ id: 1, descripcion: 'Partida' }]);
    expect(component.comboSubPartidaFraccion).toEqual([{ id: 1, descripcion: 'SubPartida' }]);
    expect(component.comboFraccionArancelariaParametros).toEqual([{ id: 1, descripcion: 'Fracción' }]);

  });

    expect(component.materiaPrimaForm).toBeDefined();
  });

  it('should load comboUnidadMedida on init', () => {
  const mockData: Catalogo[] = [{ id: 1, descripcion: 'Unidad 1' }];
  jest.spyOn(service, 'getUnidadMedida').mockReturnValue(of(mockData));
  // Re-create the component so ngOnInit runs with the mock in place
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.comboUnidadMedida).toEqual(mockData);
});

 it('should load comboCapituloFraccion on init', () => {
  const mockData: Catalogo[] = [{ id: 1, descripcion: 'Capítulo 1' }];
  jest.spyOn(service, 'getCapituloFraccion').mockReturnValue(of(mockData));
  // Re-create the component so ngOnInit runs with the mock in place
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.comboCapituloFraccion).toEqual(mockData);
});

  it('should load comboPartidaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Partida 1' }];
    jest.spyOn(service, 'getPartidaFraccion').mockReturnValue(of(mockData));
    component.loadComboPartidaFraccion();
      fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
    expect(component.comboPartidaFraccion).toEqual(mockData);
  });

  it('should load comboSubPartidaFraccion', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Subpartida 1' }];
    jest.spyOn(service, 'getSubPartidaFraccion').mockReturnValue(of(mockData));
    component.loadComboSubPartidaFraccion();
      fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
    expect(component.comboSubPartidaFraccion).toEqual(mockData);
  });

  it('should load comboFraccionArancelariaParametros', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Fracción 1' }];
    jest.spyOn(service, 'getFraccionArancelariaParametros').mockReturnValue(of(mockData));
    component.loadComboFraccionArancelariaParametros();
      fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
    expect(component.comboFraccionArancelariaParametros).toEqual(mockData);
  });

it('should handle cambiaCapituloFraccion', () => {
  component.materiaPrimaForm.patchValue({ clavePartida: 'test' });
  component.comboPartidaFraccion = [{ id: 1, descripcion: 'test' }];
  component.cambiaCapituloFraccion();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');
 
});

it('should handle cambiaPartidaFraccion', () => {
  component.materiaPrimaForm.patchValue({ partidaFraccion: 'partida1' });
  component.comboSubPartidaFraccion = [{ id: 1, descripcion: 'test' }];
  component.cambiaPartidaFraccion();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');

});

it('should handle cambiaSubPartidaFraccion', () => {
  component.materiaPrimaForm.patchValue({ subPartidaFraccion: 'subpartida1' });
  component.comboFraccionArancelariaParametros = [{ id: 1, descripcion: 'test' }];
  component.cambiaSubPartidaFraccion();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('');
  
});



it('should handle cambiaUnidadMedida', () => {
  const mockData: Catalogo[] = [{ id: 1, descripcion: 'Unidad 1' }];
  component.comboUnidadMedida = mockData;
  component.materiaPrimaForm.patchValue({ unidadMedidaComercial: { clave: 1 } });
  component.cambiaUnidadMedida();
  fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  expect(component.materiaPrimaForm.get('descUnidadMedida')?.value).toBe('');
});

  it('should handle ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});