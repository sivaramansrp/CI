import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ProgramasReporteAnnualComponent } from './programas-reporte-annual.component';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { SolicitudService } from '../../services/solicitud.service';
import {
  ProgramasReporte,
  ReporteFechas,
} from '../../models/programas-reporte.model';

describe('ProgramasReporteAnnualComponent', () => {
  let component: ProgramasReporteAnnualComponent;
  let fixture: ComponentFixture<ProgramasReporteAnnualComponent>;
  let solicitudService: jest.Mocked<SolicitudService>;
  let solicitud150102Store: jest.Mocked<Solicitud150102Store>;
  let solicitud150102Query: Partial<jest.Mocked<Solicitud150102Query>>;

  beforeEach(async () => {
    const solicitudServiceMock: Partial<jest.Mocked<SolicitudService>> = {
      obtenerReporteFechas: jest.fn(),
      obtenerProgramasReporte: jest.fn(),
    };

    const solicitud150102StoreMock: Partial<jest.Mocked<Solicitud150102Store>> =
      {
        actualizarInicio: jest.fn(),
        actualizarFin: jest.fn(),
        actualizarFolioPrograma: jest.fn(),
        actualizarModalidad: jest.fn(),
        actualizarTipoPrograma: jest.fn(),
        actualizarEstatus: jest.fn(),
      };

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
        }),
      };

    await TestBed.configureTestingModule({
      declarations: [ProgramasReporteAnnualComponent],
      imports: [ReactiveFormsModule],
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
      tipoPrograma: '',
      estatus: 'active',
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

  it('should complete destroyed$ subject on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
