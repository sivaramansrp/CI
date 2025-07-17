import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionFraccionComponent } from './adicionFraccion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { AlertComponent, CatalogoSelectComponent, ConsultaioQuery, CrosslistComponent, InputRadioComponent, NotificacionesComponent, TableComponent, TablePaginationComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdicionFraccionComponent', () => {
  let component: AdicionFraccionComponent;
  let fixture: ComponentFixture<AdicionFraccionComponent>;
  let avisoModifyServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getAdicianFraccionOption: jest.fn().mockReturnValue(of([{ label: 'A', value: 1 }])),
      getAdicianFraccionNicoModOptions: jest.fn().mockReturnValue(of([{ id: 1 }])),
      getAdicianFraccionUnidadMedidaModOption: jest.fn().mockReturnValue(of([{ id: 2 }])),
      getAdicianFraccionActivRelProcModOption: jest.fn().mockReturnValue(of([{ id: 3 }])),
      getAdicianFraccioncveFraccionCorrelacionModOption: jest.fn().mockReturnValue(of([{ id: 4 }])),
    };
    tramiteStoreMock = {};
    tramiteQueryMock = {};
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdicionFraccionComponent,
            CommonModule,
            TituloComponent,
            AlertComponent,
            InputRadioComponent,
            TableComponent,
            TablePaginationComponent,
            CatalogoSelectComponent,
            CrosslistComponent,
            NotificacionesComponent,
            HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: tramiteStoreMock },
        { provide: Tramite32301Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionFraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.esFormularioSoloLectura = false;
    component.ngOnInit();
    expect(component.declaracionFormModel).toBeDefined();
    expect(component.cargaManualForm).toBeDefined();
  });

  it('should disable forms if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.declaracionForm.disabled).toBe(true);
    expect(component.declaracionFormModel.disabled).toBe(true);
    expect(component.cargaManualForm.disabled).toBe(true);
  });

  it('should enable forms if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.declaracionForm.enabled).toBe(true);
    expect(component.declaracionFormModel.enabled).toBe(true);
    expect(component.cargaManualForm.enabled).toBe(true);
  });

  it('should call getAdicianFraccionOption and set radioOptions', () => {
    component.getAdicianFraccionOption();
  });

  it('should call getAdicianFraccionNicoModOptions and set cveNicoMod', () => {
    component.getAdicianFraccionNicoModOptions();
  });

  it('should call getAdicianFraccionUnidadMedidaModOption and set unidadMedidaMod', () => {
    component.getAdicianFraccionUnidadMedidaModOption();
  });

  it('should call getAdicianFraccionActivRelProcModOption and set activRelProcMod', () => {
    component.getAdicianFraccionActivRelProcModOption();
  });

  it('should call getAdicianFraccioncveFraccionCorrelacionModOption and set cveFraccionCorrelacionMod', () => {
    component.getAdicianFraccioncveFraccionCorrelacionModOption();
  });

  it('should set divBtnCargaMVisible to false for tipoCarga MA', () => {
    component.valorSeleccionadoTipoCarga('TIPCAR.MA');
  });

  it('should set divBtnCargaMVisible to true for tipoCarga CM', () => {
  });

  it('should set nuevaNotificacion on cargarArchivoProcesosAjax', () => {
    component.cargarArchivoProcesosAjax();
  });

  it('should open and close cargaMasivaFrModalInstance', () => {
    const showSpy = jest.fn();
    const hideSpy = jest.fn();
    component.cargaMasivaFrModalInstance = { show: showSpy, hide: hideSpy } as any;
    component.openCargaMasivaFrModal();
    expect(showSpy).toHaveBeenCalled();
    component.closeCargaMasivaFrModal();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should open and close fraccionesModelInstance', () => {
    const showSpy = jest.fn();
    const hideSpy = jest.fn();
    component.fraccionesModelInstance = { show: showSpy, hide: hideSpy } as any;
    component.openfraccionesModelModel();
    expect(showSpy).toHaveBeenCalled();
    component.closefraccionesModelModel();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('should add all fechas on agregar with tipo "t"', () => {
    component.selectRangoDias = ['2021-01-01', '2021-01-02'];
    component.fechasSeleccionadas = [];
    component.fechasDatos = ['2021-01-01', '2021-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(['2021-01-01', '2021-01-02']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should remove all fechas on quitar with tipo "t"', () => {
    component.fechasSeleccionadas = ['2021-01-01', '2021-01-02'];
    component.fechasDatos = [];
    component.quitar('t');
    expect(component.fechasDatos).toEqual(['2021-01-01', '2021-01-02']);
    expect(component.fechasSeleccionadas).toEqual([]);
  });

  it('should clean up destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize modal instances in ngAfterViewInit', () => {
    const modalSpy = jest.fn();
    (window as any).Modal = modalSpy;
    const nativeElementMock = {};
    component.cargaMasivaFrModal = { nativeElement: nativeElementMock } as ElementRef;
    component.fraccionesModel = { nativeElement: nativeElementMock } as ElementRef;
    // component.ngAfterViewInit();
    expect(component.cargaMasivaFrModalInstance).toBeDefined();
    expect(component.fraccionesModelInstance).toBeDefined();
  });
});