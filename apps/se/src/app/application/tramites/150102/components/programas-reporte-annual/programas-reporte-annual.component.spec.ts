import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgramasReporteAnnualComponent } from './programas-reporte-annual.component';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { SolicitudService } from '../../services/solicitud.service';
import {
  ProgramasReporte,
  ReporteFechas,
} from '../../models/programas-reporte.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('ProgramasReporteAnnualComponent', () => {
  let component: ProgramasReporteAnnualComponent;
  let fixture: ComponentFixture<ProgramasReporteAnnualComponent>;
  let solicitudService: jest.Mocked<SolicitudService>;
  let solicitud150102Store: jest.Mocked<Solicitud150102Store>;
  let solicitud150102Query: Partial<jest.Mocked<Solicitud150102Query>>;

  beforeEach(async () => {
    const solicitudServiceMock: Partial<jest.Mocked<SolicitudService>> = {
      obtenerReporteFechas: jest.fn(() => of()),
      obtenerProgramasReporte: jest.fn(() => of()),
    };

    const solicitud150102StoreMock =
      {
        actualizarInicio: jest.fn(() => of()),
        actualizarFin: jest.fn(() => of()),
        actualizarFolioPrograma: jest.fn(() => of()),
        actualizarModalidad: jest.fn(() => of()),
        actualizarTipoPrograma: jest.fn(() => of()),
        actualizarEstatus: jest.fn(() => of()),
        actualizarIndiceDeRegistroDelPrograma: jest.fn(() => of()),
      } as unknown as Partial<jest.Mocked<Solicitud150102Store>>;

    const solicitud150102QueryMock: Partial<jest.Mocked<Solicitud150102Query>> =
      {
        seleccionarSolicitud$: of({
          ventasTotales: '1000',
          totalExportaciones: '500',
          totalImportaciones: '200',
          saldo: '300',
          porcentajeExportacion: '50',
          producidosDatos: [],
          bienesProducidosDatos: [],
          inicio: '2023-01-01',
          fin: '2023-12-31',
          folioPrograma: '12345',
          modalidad: 'modalidad-example',
          tipoPrograma: '',
          estatus: 'active',
          indiceDeRegistroDelPrograma:-1
        }),
      };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        BsDatepickerModule,
        TablaDinamicaComponent,
        HttpClientTestingModule,
        ProgramasReporteAnnualComponent
      ],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud150102Store, useValue: solicitud150102StoreMock },
        { provide: Solicitud150102Query, useValue: solicitud150102QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramasReporteAnnualComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(
      SolicitudService
    ) as jest.Mocked<SolicitudService>;
    solicitud150102Store = TestBed.inject(
      Solicitud150102Store
    ) as jest.Mocked<Solicitud150102Store>;
    solicitud150102Query = TestBed.inject(
      Solicitud150102Query
    ) as jest.Mocked<Solicitud150102Query>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formProgrmasReporte).toBeDefined();
  });

  it('should call obtenerReporteFechas on initialization', () => {
    solicitudService.obtenerReporteFechas.mockReturnValue(
      of({ inicio: '2023-01-01', fin: '2023-12-31' } as ReporteFechas)
    );
    component.ngOnInit();
    expect(solicitudService.obtenerReporteFechas).toHaveBeenCalled();
  });

  it('should call obtenerProgramasReporte on initialization', () => {
    solicitudService.obtenerProgramasReporte.mockReturnValue(
      of([] as ProgramasReporte[])
    );
    component.ngOnInit();
    expect(solicitudService.obtenerProgramasReporte).toHaveBeenCalled();
  });

  it('should update form values when seleccionarSolicitud$ emits', () => {
    const state = {
      ventasTotales: '1000',
      totalExportaciones: '500',
      totalImportaciones: '200',
      saldo: '300',
      porcentajeExportacion: '50',
      producidosDatos: [],
      bienesProducidosDatos: [],
      inicio: '2023-01-01',
      fin: '2023-12-31',
      folioPrograma: '12345',
      modalidad: 'modalidad-example',
      tipoPrograma: '12345',
      estatus: 'active',
      indiceDeRegistroDelPrograma:-1
    };
    solicitud150102Query.seleccionarSolicitud$ = of(state);
    component.ngOnInit();
    expect(component.formProgrmasReporte.value).toEqual({
      inicio: state.inicio,
      fin: state.fin,
      folioPrograma: state.folioPrograma,
      modalidad: state.modalidad,
      tipoPrograma: state.tipoPrograma,
      estatus: state.estatus,
    });
  });

  it('should update store when actualizarProgramasReporte is called', () => {
    const programa: ProgramasReporte = {
      folioPrograma: '12345',
      modalidad: 'Modalidad 1',
      tipoPrograma: 'Tipo 1',
      estatus: 'Activo',
    };
    component.actualizarProgramasReporte(programa);
    expect(solicitud150102Store.actualizarFolioPrograma).toHaveBeenCalledWith(
      programa.folioPrograma
    );
    expect(solicitud150102Store.actualizarModalidad).toHaveBeenCalledWith(
      programa.modalidad
    );
    expect(solicitud150102Store.actualizarTipoPrograma).toHaveBeenCalledWith(
      programa.tipoPrograma
    );
    expect(solicitud150102Store.actualizarEstatus).toHaveBeenCalledWith(
      programa.estatus
    );
  });

it('should call guardarDatosFormulario when esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const guardarDatosFormularioSpy = jest.spyOn(
      component,
      'guardarDatosFormulario'
    );
    component.inicializarEstadoFormulario();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario when esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const inicializarFormularioSpy = jest.spyOn(
      component,
      'inicializarFormulario'
    );
    component.inicializarEstadoFormulario();
    expect(inicializarFormularioSpy).toHaveBeenCalled();
  });

  it('should disable formProgrmasReporte when esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    const disableSpy = jest.spyOn(FormGroup.prototype, 'disable');
    component.guardarDatosFormulario();
    expect(disableSpy).toHaveBeenCalled();
    expect(component.formProgrmasReporte.disabled).toBe(true);
  });

  it('should enable formProgrmasReporte when esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;

    const enableSpy = jest.spyOn(FormGroup.prototype, 'enable');
    component.guardarDatosFormulario();

    expect(enableSpy).toHaveBeenCalled();
    expect(component.formProgrmasReporte.enabled).toBe(true);
  });

  it('should complete destroyed$ subject on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
