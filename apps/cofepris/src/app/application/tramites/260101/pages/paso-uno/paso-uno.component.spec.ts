import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Service260101Service } from '../../services/service260101.service';
import { of, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModificarDestinatarioComponent } from '../../components/modificar-destinatario/modificar-destinatario.component';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';
import { PagoDerechosComponent } from '../../components/pago-derechos/pago-derechos.component';
import { ModificarMercanciasComponent } from '../../components/modificar-mercancias/modificar-mercancias.component';
import { SolicitudDatosComponent } from '../../components/solicitud-datos/solicitud-datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;
  let service260101ServiceMock: any;
  let consultaStateMock: ConsultaioState;

  beforeEach(async () => {
    consultaStateMock = { update: false } as ConsultaioState;

    consultaQueryMock = {
      selectConsultaioState$: of(consultaStateMock)
    };

    service260101ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ data: 'mockData' })),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent,
        SolicitudDatosComponent,
              ModificarMercanciasComponent,
              PagoDerechosComponent,
              TercerosRelacionadosComponent,
              ModificarDestinatarioComponent,
              CommonModule,
              ReactiveFormsModule,
              FormsModule,
              SolicitanteComponent,
              HttpClientTestingModule
      ],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: Service260101Service, useValue: service260101ServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
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
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(service260101ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ data: 'mockData' });
  });

  it('seleccionaTab should update indice', () => {
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

  it('should subscribe to selectConsultaioState$ and update consultaState', () => {
    const consultaState = {} as ConsultaioState;
    consultaQueryMock.selectConsultaioState$ = of(consultaState);
    component.ngOnInit();
    expect(component.consultaState).toEqual(consultaState);
  });

  it('guardarDatosFormulario should not call actualizarEstadoFormulario if response is falsy', () => {
    service260101ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosFormulario();
    expect(service260101ServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });
});