import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoCsComponent } from './paso-uno-cs.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Solocitud80103Service } from '../../services/service80103service';
import { ConsultaioState } from '@ng-mf/data-access-user';

describe('PasoUnoCsComponent', () => {
  let component: PasoUnoCsComponent;
  let fixture: ComponentFixture<PasoUnoCsComponent>;

  const mockConsultaState: ConsultaioState = {
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    readonly: false,
    create: false,
    update: true, // important for triggering guardarDatosFormulario
    consultaioSolicitante: null,
  };

  const mockQuery = {
    selectConsultaioState$: of(mockConsultaState),
  };

  const mockSeccionStore = {
    establecerSeccion: jest.fn(),
    establecerFormaValida: jest.fn(),
  };

  const mockService = {
    getRegistroTomaMuestrasMercanciasData: jest.fn(() => of({})),
    actualizarEstadoFormulario: jest.fn(),

    getRegistroTomaMuestrasMercanciasDatas: jest.fn(() => of({})),
    actualizarEstadoFormularios: jest.fn(),

    getRegistroComplementosData: jest.fn(() => of({})),
    actualizarComplementos: jest.fn(),

    getRegistroFederatoriosData: jest.fn(() => of({})),
    actualizarFederatorios: jest.fn(),

    getRegistroComplementarData: jest.fn(() => of({})),
    actualizarComplementar: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       declarations: [PasoUnoCsComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockQuery },
        { provide: SeccionLibStore, useValue: mockSeccionStore },
        { provide: Solocitud80103Service, useValue: mockService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  afterEach(() => jest.clearAllMocks());

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe asignar secciones y formaValida en el constructor mediante asignarSecciones()', () => {
    expect(mockSeccionStore.establecerSeccion).toHaveBeenCalled();
    expect(mockSeccionStore.establecerFormaValida).toHaveBeenCalled();
  });

  it('debe establecer consultaState y llamar a guardarDatosFormulario si update es true', () => {
    expect(component.consultaState.update).toBe(true);
    expect(mockService.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(mockService.getRegistroTomaMuestrasMercanciasDatas).toHaveBeenCalled();
    expect(mockService.actualizarEstadoFormularios).toHaveBeenCalled();
    expect(mockService.getRegistroComplementosData).toHaveBeenCalled();
    expect(mockService.actualizarComplementos).toHaveBeenCalled();
    expect(mockService.getRegistroFederatoriosData).toHaveBeenCalled();
    expect(mockService.actualizarFederatorios).toHaveBeenCalled();
    expect(mockService.getRegistroComplementarData).toHaveBeenCalled();
    expect(mockService.actualizarComplementar).toHaveBeenCalled();
  });

  it('debe actualizar el indice al llamar seleccionaTab()', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
