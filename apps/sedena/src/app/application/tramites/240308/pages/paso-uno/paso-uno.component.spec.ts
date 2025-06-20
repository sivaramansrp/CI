import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitudeDeArtificiosPirotecnicosService } from '../../services/solicitude-de-artificios-pirotecnicos.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockServicio: any;
  let mockConsultaQuery: Partial<ConsultaioQuery>;

  beforeEach(async () => {
    mockServicio = {
      obtenerDatos: jest.fn().mockReturnValue(of({ datos: 'mock' })),
      establecerDatosDeLaSolicitud: jest.fn()
    };

    mockConsultaQuery = {
      selectConsultaioState$: of({
        update: false,
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        tipoDeTramite: '',
        estadoDeTramite: '',
        readonly: false,
        create: false,
        consultaioSolicitante: {
          folioDelTramite: '',
          fechaDeInicio: '',
          estadoDelTramite: ''
        }
      })
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: SolicitudeDeArtificiosPirotecnicosService, useValue: mockServicio },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set indice to 1 by default', () => {
    expect(component.indice).toBe(1);
  });

  it('should subscribe to selectConsultaioState$ and set estadoConsulta', () => {
    expect(component.estadoConsulta).toEqual({ update: false });
  });

  it('should set datosRespuestaDisponibles to true if estadoConsulta.update is false', () => {
    expect(component.datosRespuestaDisponibles).toBe(true);
  });

  it('should call obtenerDatosBandejaSolicitudes if estadoConsulta.update is true', () => {
    mockConsultaQuery.selectConsultaioState$ = of({
      update: true,
      procedureId: '',
      parameter: '',
      department: '',
      folioTramite: '',
      tipoDeTramite: '',
      estadoDeTramite: '',
      readonly: false,
      create: false,
      consultaioSolicitante: {
        folioDelTramite: '',
        fechaDeInicio: '',
        estadoDelTramite: ''
      },
    });
    const obtenerSpy = jest.spyOn(PasoUnoComponent.prototype, 'obtenerDatosBandejaSolicitudes');
    const newFixture = TestBed.createComponent(PasoUnoComponent);
    newFixture.detectChanges();
    expect(obtenerSpy).toHaveBeenCalled();
    obtenerSpy.mockRestore();
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('obtenerDatosBandejaSolicitudes should call servicio.obtenerDatos and establecerDatosDeLaSolicitud', () => {
    component.datosRespuestaDisponibles = false;
    component.obtenerDatosBandejaSolicitudes();
    expect(mockServicio.obtenerDatos).toHaveBeenCalled();
    expect(mockServicio.establecerDatosDeLaSolicitud).toHaveBeenCalledWith({ datos: 'mock' });
    expect(component.datosRespuestaDisponibles).toBe(true);
  });

  it('should clean up notificadorDestruccion$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).notificadorDestruccion$, 'next');
    const completeSpy = jest.spyOn((component as any).notificadorDestruccion$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});