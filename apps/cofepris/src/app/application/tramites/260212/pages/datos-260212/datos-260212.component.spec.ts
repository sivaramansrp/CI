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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call obtenerTipoPersona in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });

  it('should call actualizarEstadoFormulario in guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    const service = TestBed.inject(Service260212Service) as unknown as Service260212ServiceMock;
    expect(service.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
