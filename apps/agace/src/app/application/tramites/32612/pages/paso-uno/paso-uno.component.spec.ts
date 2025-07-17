import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { DatosComunesService } from '../../../../shared/services/datos-comunes.service';
import { TercerosRelacionadosService } from '../../../../shared/services/terceros-relacionados.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let DatosComunesServiceMock: any;
  let TercerosRelacionadosServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    DatosComunesServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: 'data' })),
      actualizarEstadoFormulario: jest.fn(),
    };
    TercerosRelacionadosServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ test: 'data' })),
      actualizarEstadoFormulario: jest.fn(),
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: DatosComunesService, useValue: DatosComunesServiceMock },
        { provide: TercerosRelacionadosService, useValue: TercerosRelacionadosServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should call guardarDatosComunesFormulario if consultaState.update is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosComunesFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
  });

  it('guardarTercerosFormulario should update esFormularioSoloLectura and call actualizarEstadoFormulario', () => {
    component.guardarTercerosFormulario();
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(DatosComunesServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
    expect(TercerosRelacionadosServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  // Additional tests

  it('should initialize indice to 1 by default', () => {
    expect(component.indice).toBe(1);
  });

  it('should unsubscribe from observables on destroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should not call actualizarEstadoFormulario if service returns falsy', () => {
    DatosComunesServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    TercerosRelacionadosServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.getAgenteAduanalFormulario();
    expect(DatosComunesServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
    expect(TercerosRelacionadosServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('should handle multiple seleccionaTab calls', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should not throw error if ngOnDestroy is called multiple times', () => {
    expect(() => {
      component.ngOnDestroy();
      component.ngOnDestroy();
    }).not.toThrow();
  });

  // New tests

  it('should not update esFormularioSoloLectura if consultaState is undefined', () => {
    consultaQueryMock.selectConsultaioState$ = of(undefined);
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('should not call guardarDatosComunesFormulario if consultaState.update is falsy', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    const spy = jest.spyOn(component, 'guardarDatosComunesFormulario');
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call actualizarEstadoFormulario only for truthy responses', () => {
    DatosComunesServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({ test: 'data' }));
    TercerosRelacionadosServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.guardarDatosComunesFormulario();
    expect(DatosComunesServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
    expect(TercerosRelacionadosServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if either service returns truthy', () => {
    DatosComunesServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    TercerosRelacionadosServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({ test: 'data' }));
    component.guardarDatosComunesFormulario();
    expect(component.esFormularioSoloLectura).toBe(true);
  });
});
