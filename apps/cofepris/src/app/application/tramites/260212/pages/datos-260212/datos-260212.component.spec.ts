import { Datos260212Component } from './datos-260212.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';


import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Service260212Service } from '../../services/service260212.service';


class Service260212ServiceMock {
  getRegistroTomaMuestrasMercanciasData = jest.fn().mockReturnValue(of({}));
  actualizarEstadoFormulario = jest.fn();
}


class ConsultaioQueryMock {
  selectConsultaioState$ = of({ update: false });
}

describe('Datos260212Component', () => {
  let component: Datos260212Component;
  let fixture: ComponentFixture<Datos260212Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos260212Component],
      providers: [
        { provide: ConsultaioQuery, useClass: ConsultaioQueryMock },
        { provide: Service260212Service, useClass: Service260212ServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Datos260212Component);
    component = fixture.componentInstance;
    // Mock ViewChild
    component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer esDatosRespuesta en true si update es false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debería establecer el índice cuando se llama seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debería llamar obtenerTipoPersona en ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });

  it('debería llamar actualizarEstadoFormulario en guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    const service = TestBed.inject(Service260212Service) as unknown as Service260212ServiceMock;
    expect(service.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debería completar destroyNotifier$ en ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
