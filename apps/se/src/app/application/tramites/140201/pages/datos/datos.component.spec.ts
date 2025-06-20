import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { of } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../services/solicitud.service';

// Mock component for <solicitante>
@Component({
  selector: 'solicitante',
  template: ''
})
class MockSolicitanteComponent {
  obtenerTipoPersona = jest.fn();
}

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let consultaQueryMock: any;
  let solicitudServiceMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };
    solicitudServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: 'data' })),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent, MockSolicitanteComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: SolicitudService, useValue: solicitudServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Assign the mock AFTER detectChanges so @ViewChild is not undefined
    component.solicitante = new MockSolicitanteComponent() as any;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: true });
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call solicitudService.actualizarEstadoFormulario and set esDatosRespuesta to true in guardarDatosFormulario', () => {
    component.solicitante = new MockSolicitanteComponent() as any; // Ensure it's set
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(solicitudServiceMock.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(solicitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    component.solicitante = new MockSolicitanteComponent() as any; // Ensure it's set
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
