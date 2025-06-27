import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, BehaviorSubject, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

import { PasoUnoComponent } from './paso-uno.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockConsultaioQuery: any;
  let mockRetornoImportacionTemporalService: any;
  let consultaioState$: BehaviorSubject<ConsultaioState>;

  const initialConsultaioState: ConsultaioState = {
    procedureId: '', parameter: '', department: '', folioTramite: '',
    tipoDeTramite: '', estadoDeTramite: '', readonly: false,
    create: true, update: false, consultaioSolicitante: null
  };

  beforeEach(async () => {
    consultaioState$ = new BehaviorSubject(initialConsultaioState);

    mockConsultaioQuery = {
      selectConsultaioState$: consultaioState$.asObservable()
    };

    mockRetornoImportacionTemporalService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [CommonModule],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: RetornoImportacionTemporalService, useValue: mockRetornoImportacionTemporalService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should use takeUntil to avoid memory leaks', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnInit();
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('should not throw if solicitante is undefined in ngAfterViewInit', () => {
    component.solicitante = undefined as any;
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });

  it('should call ngOnDestroy manually and clean up subscriptions', () => {
    const destroySpy = jest.spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('should handle error in observable of consultaio', () => {
    const errorQuery = {
      selectConsultaioState$: throwError(() => new Error('Test error'))
    };

    const testComponent = new PasoUnoComponent(
      mockRetornoImportacionTemporalService,
      errorQuery as any
    );

    expect(() => testComponent.ngOnInit()).not.toThrow();
  });

  it('should call guardarDatosFormulario if update is true', () => {
    const stateWithUpdate = { ...initialConsultaioState, update: true };
    consultaioState$.next(stateWithUpdate);

    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');

    component.ngOnInit();

    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta = true if update is false', () => {
    const stateWithoutUpdate = { ...initialConsultaioState, update: false };
    consultaioState$.next(stateWithoutUpdate);

    component.ngOnInit();

    expect(component.esDatosRespuesta).toBe(true);
  });
});
