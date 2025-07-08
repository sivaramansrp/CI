import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { of, Subject } from 'rxjs';
import { DatosComponent } from './datos.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Service260601Service } from '../../services/service260601.service';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let consultaQueryMock: any;
  let service260601ServiceMock: any;
  let cdrMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };
    service260601ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn()
    };
    cdrMock = { detectChanges: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [DatosComponent, CommonModule,
          ReactiveFormsModule,
          SolicitanteComponent,
          TercerosRelacionadosComponent,
          DatosDeLaSolicitudComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: Service260601Service, useValue: service260601ServiceMock },
        { provide: ChangeDetectorRef, useValue: cdrMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    // Mock ViewChild
    component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    component.consultaState = { update: false } as ConsultaioState;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    component.consultaState = { update: true } as ConsultaioState;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('guardarDatosFormulario should set esDatosRespuesta to true and call actualizarEstadoFormulario', () => {
    const resp = { some: 'data' };
    service260601ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(resp));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(service260601ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
  });

  it('ngAfterViewInit should set persona and domicilioFiscal and call obtenerTipoPersona and detectChanges', (done) => {
    jest.useFakeTimers();
    component.ngAfterViewInit();
    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    jest.runAllTimers();
    setTimeout(() => {
      expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
      expect(cdrMock.detectChanges).toHaveBeenCalled();
      done();
    }, 0);
    jest.useRealTimers();
  });

  it('seleccionaTab should set indice', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should subscribe to consultaQuery.selectConsultaioState$ on ngOnInit', () => {
    const consultaState = { update: false } as ConsultaioState;
    consultaQueryMock.selectConsultaioState$ = of(consultaState);
    component.ngOnInit();
    expect(component.consultaState).toBe(consultaState);
  });

  it('guardarDatosFormulario should not call actualizarEstadoFormulario if resp is falsy', () => {
    service260601ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(service260601ServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });
});