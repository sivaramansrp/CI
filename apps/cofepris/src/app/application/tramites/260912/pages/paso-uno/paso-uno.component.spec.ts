import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solocitud260912Service } from '../../services/service260912.service';

import { of } from 'rxjs';



describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  let consultaQueryMock: any;
  let solocitudServiceMock: any;

  const mockConsultaState = {
    update: true
  };

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of(mockConsultaState),
    };

    solocitudServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ data: 'mock' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: Solocitud260912Service, useValue: solocitudServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call guardarDatosFormulario if consultaState.update is true', () => {
    const spyGuardar = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(spyGuardar).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('guardarDatosFormulario should call service and update state', () => {
    component.guardarDatosFormulario();
    expect(solocitudServiceMock.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(solocitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ data: 'mock' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('seleccionaTab should set indice', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
