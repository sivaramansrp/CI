import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramasReporteAnnualComponent } from './programas-reporte-anual.component';
import { FormBuilder } from '@angular/forms';
import { Solicitud150101Store } from '../../estados/solicitud150101.store';
import { Solicitud150101Query } from '../../estados/solicitud150101.query';
import { SolicitudService } from '../../services/registro-solicitud-anual.service';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('ProgramasReporteAnnualComponent', () => {
  let component: ProgramasReporteAnnualComponent;
  let fixture: ComponentFixture<ProgramasReporteAnnualComponent>;
  let solicitudServiceMock: any;
  let solicitudStoreMock: any;
  let solicitudQueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      obtenerReporteFechas: jest.fn().mockReturnValue(of({ reporteAnualFechaInicio: '2023-01', reporteAnualFechaFin: '2023-12' })),
      obtenerProgramasReporte: jest.fn().mockReturnValue(of([])),
    };

    solicitudStoreMock = {
      setReporteAnualFechaInicio: jest.fn(),
      setReporteAnualFechaFin: jest.fn(),
      actualizarFolioPrograma: jest.fn(),
      actualizarModalidad: jest.fn(),
      actualizarTipoPrograma: jest.fn(),
      actualizarEstatus: jest.fn(),
    };

    solicitudQueryMock = {
      seleccionarSolicitud$: of({ reporteAnualFechaInicio: '2023-01', reporteAnualFechaFin: '2023-12' })
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      declarations: [ProgramasReporteAnnualComponent],
      providers: [
        FormBuilder,
        { provide: Solicitud150101Store, useValue: solicitudStoreMock },
        { provide: Solicitud150101Query, useValue: solicitudQueryMock },
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasReporteAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.periodoReporteAnual.value).toEqual({
      reporteAnualFechaInicio: '2023-01',
      reporteAnualFechaFin: '2023-12',
      folioPrograma: null,
      modalidad: null,
      tipoPrograma: null,
      estatus: null,
    });
  });

  it('should call obtenerReporteFechas on init', () => {
    expect(solicitudServiceMock.obtenerReporteFechas).toHaveBeenCalled();
  });

  it('should update store values when actualizarProgramasReporte is called', () => {
    const mockData = { folioPrograma: '123', modalidad: 'Online', tipoPrograma: 'Master', estatus: 'Active' };
    component.actualizarProgramasReporte(mockData);

    expect(solicitudStoreMock.actualizarFolioPrograma).toHaveBeenCalledWith('123');
    expect(solicitudStoreMock.actualizarModalidad).toHaveBeenCalledWith('Online');
    expect(solicitudStoreMock.actualizarTipoPrograma).toHaveBeenCalledWith('Master');
    expect(solicitudStoreMock.actualizarEstatus).toHaveBeenCalledWith('Active');
  });
});
