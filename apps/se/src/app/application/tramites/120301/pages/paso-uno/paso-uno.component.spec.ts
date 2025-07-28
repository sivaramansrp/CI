import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { of, Subject } from 'rxjs';
import { ConsultaioQuery, ConsultaioStore, ConsultaioState } from '@ng-mf/data-access-user';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: Partial<ConsultaioQuery>;
  let consultaStoreMock: Partial<ConsultaioStore>;
  let elegibilidadDeTextilesStoreMock: Partial<ElegibilidadDeTextilesStore>;
  let elegibilidadTextilesServiceMock: Partial<ElegibilidadTextilesService>;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true, readonly: false } as ConsultaioState)
    };
    consultaStoreMock = {};
    elegibilidadDeTextilesStoreMock = {
      setTextilesState: jest.fn()
    };
    elegibilidadTextilesServiceMock = {
      getPrefillDatos: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: ConsultaioStore, useValue: consultaStoreMock },
        { provide: ElegibilidadDeTextilesStore, useValue: elegibilidadDeTextilesStoreMock },
        { provide: ElegibilidadTextilesService, useValue: elegibilidadTextilesServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should set mostrarOtraPestana to true when onMostrarTabs is called with true', () => {
    component.mostrarOtraPestana = false;
    component.onMostrarTabs(true);
    expect(component.mostrarOtraPestana).toBe(true);
  });

  it('should not change mostrarOtraPestana when onMostrarTabs is called with false', () => {
    component.mostrarOtraPestana = false;
    component.onMostrarTabs(false);
    expect(component.mostrarOtraPestana).toBe(false);
  });

  it('should call guardarDatosFormulario and set formularioDeshabilitado to false if consultaState.update is true', () => {
    const guardarDatosFormularioSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true, readonly: false } as ConsultaioState;
    component.formularioDeshabilitado = true;
    // Simulate ngOnInit logic
    component.ngOnInit();
    expect(component.formularioDeshabilitado).toBe(false);
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should set formularioDeshabilitado to true if consultaState.readonly is true', () => {
    (consultaQueryMock as any).selectConsultaioState$ = of({ update: false, readonly: true } as ConsultaioState);
    component.formularioDeshabilitado = false;
    component.ngOnInit();
    expect(component.formularioDeshabilitado).toBe(true);
  });

  it('should call getPrefillDatos when guardarDatosFormulario is called', () => {
    component.guardarDatosFormulario();
    expect(elegibilidadTextilesServiceMock.getPrefillDatos).toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});