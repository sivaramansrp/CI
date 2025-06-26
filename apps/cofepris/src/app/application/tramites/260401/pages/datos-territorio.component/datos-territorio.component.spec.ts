import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosTerritorioComponent } from './datos-territorio.component';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Solicitud260401Service } from '../../services/service260401.service';
import { of, Subject } from 'rxjs';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosTerritorioComponent', () => {
  let component: DatosTerritorioComponent;
  let fixture: ComponentFixture<DatosTerritorioComponent>;
  let consultaQueryMock: any;
  let solicitud260401ServiceMock: any;
  let solicitanteComponentMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true })
    };

    solicitud260401ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of('registroData')),
      getPagoDerechos: jest.fn().mockReturnValue(of('permisoData')),
      actualizarEstadoFormulario: jest.fn(),
      actualizarPagoDerechosFormulario: jest.fn()
    };

    solicitanteComponentMock = {
      obtenerTipoPersona: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DatosTerritorioComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: Solicitud260401Service, useValue: solicitud260401ServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTerritorioComponent);
    component = fixture.componentInstance;
    // Mock @ViewChild
    component.solicitante = solicitanteComponentMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call guardarDatosFormulario if consultaState.update is true', () => {
      const guardarDatosFormularioSpy = jest.spyOn(component, 'guardarDatosFormulario');
      consultaQueryMock.selectConsultaioState$ = of({ update: true });
      component.ngOnInit();
      expect(guardarDatosFormularioSpy).toHaveBeenCalled();
    });

    it('should set esDatosRespuesta to true if consultaState.update is false', () => {
      consultaQueryMock.selectConsultaioState$ = of({ update: false });
      component.ngOnInit();
      expect(component.esDatosRespuesta).toBe(true);
    });
  });

  describe('guardarDatosFormulario', () => {
    it('should call actualizarEstadoFormulario and actualizarPagoDerechosFormulario', (done) => {
      (component as any).solicitud260401Service = solicitud260401ServiceMock;
      component.solicitante = solicitanteComponentMock;
      component.guardarDatosFormulario();
      setTimeout(() => {
        expect(solicitud260401ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith('registroData');
        expect(solicitud260401ServiceMock.actualizarPagoDerechosFormulario).toHaveBeenCalledWith('permisoData');
        expect(component.esDatosRespuesta).toBe(true);
        done();
      }, 0);
    });

    it('should not call actualizarEstadoFormulario if registro is falsy', (done) => {
      solicitud260401ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
      solicitud260401ServiceMock.getPagoDerechos.mockReturnValue(of('permisoData'));
      component.guardarDatosFormulario();
      setTimeout(() => {
        expect(solicitud260401ServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(solicitud260401ServiceMock.actualizarPagoDerechosFormulario).toHaveBeenCalledWith('permisoData');
        done();
      }, 0);
    });

    it('should not call actualizarPagoDerechosFormulario if permiso is falsy', (done) => {
      solicitud260401ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of('registroData'));
      solicitud260401ServiceMock.getPagoDerechos.mockReturnValue(of(null));
      component.guardarDatosFormulario();
      setTimeout(() => {
        expect(solicitud260401ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith('registroData');
        expect(solicitud260401ServiceMock.actualizarPagoDerechosFormulario).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call solicitante.obtenerTipoPersona with MORAL_NACIONAL', () => {
      component.solicitante = solicitanteComponentMock;
      component.ngAfterViewInit();
      expect(solicitanteComponentMock.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
    });
  });

  describe('seleccionaTab', () => {
    it('should update indice', () => {
      component.indice = 1;
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);
    });
  });
});