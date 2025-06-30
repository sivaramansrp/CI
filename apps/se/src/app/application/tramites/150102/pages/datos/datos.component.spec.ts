import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import {
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent,
  TIPO_PERSONA,
} from '@libs/shared/data-access-user/src';
import { SolicitudService } from '../../services/solicitud.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramasReporteAnnualComponent } from '../../components/programas-reporte-annual/programas-reporte-annual.component';
import { DatosDeReporteAnnualComponent } from '../../components/datos-de-reporte-annual/datos-de-reporte-annual.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSolicitudService: jest.Mocked<SolicitudService>;
  let consultaState: ConsultaioState;

  beforeEach(async () => {
    mockConsultaioQuery = {
      selectConsultaioState$: new Subject<ConsultaioState>(),
    } as any;

    mockSolicitudService = {
      guardarDatosFormulario: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        DatosComponent,
        CommonModule,
        ReactiveFormsModule,
        SolicitanteComponent,
        ProgramasReporteAnnualComponent,
        DatosDeReporteAnnualComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudService, useValue: mockSolicitudService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    consultaState = { update: false } as ConsultaioState;
    component.consultaState = consultaState;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    component.consultaState = { update: false } as ConsultaioState;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set esDatosRespuesta to true and call actualizarEstadoFormulario on response', () => {
    const resp = { some: 'data' } as any;
    mockSolicitudService.guardarDatosFormulario.mockReturnValue(of(resp));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(
      mockSolicitudService.actualizarEstadoFormulario
    ).toHaveBeenCalledWith(resp);
  });

  it('should update indice', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update estaHabilitado when evento is true', () => {
    component.estaHabilitado = false;
    component.getFilaDeInformeSeleccionada(true);
    expect(component.estaHabilitado).toBe(true);
  });

  it('should not update estaHabilitado when evento is false', () => {
    component.estaHabilitado = false;
    component.getFilaDeInformeSeleccionada(false);
    expect(component.estaHabilitado).toBe(false);
  });

  it('should complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(
      (component as any).destroyNotifier$,
      'complete'
    );
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
