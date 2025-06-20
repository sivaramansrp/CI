import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CuposService } from '../../services/cupos.service';
import { of, ReplaySubject } from 'rxjs';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Component, Input } from '@angular/core';

@Component({selector: 'lib-solicitante', template: ''})
class MockSolicitanteComponent {
  @Input() tipoPersona: any;
  obtenerTipoPersona = jest.fn();
}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaioQueryMock: any;
  let cuposServiceMock: any;
  let destroyed$: ReplaySubject<boolean>;

  beforeEach(async () => {
    destroyed$ = new ReplaySubject(1);

    consultaioQueryMock = {
      selectConsultaioState$: of({ update: false })
    };

    cuposServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: 'value' })),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: CuposService, useValue: cuposServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.esDatosRespuesta = false;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormularios if consultaState.update is true in ngOnInit', () => {
    component.consultaState = { update: true } as any;
    jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(component.guardarDatosFormularios).toHaveBeenCalled();
  });

  it('should call cuposService and set esDatosRespuesta in guardarDatosFormularios', () => {
    cuposServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({ test: 'value' }));
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(cuposServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'value' });
  });

  it('should assign persona, domicilioFiscal and call obtenerTipoPersona in ngAfterViewInit', () => {
    component.solicitante = new MockSolicitanteComponent() as any;
    component.ngAfterViewInit();
    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice and emit dataEmitter in seleccionaTab', () => {
    const spy = jest.spyOn(component.dataEmitter, 'emit');
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});