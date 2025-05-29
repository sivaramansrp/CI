import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { of} from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  let mockConsultaioQuery: Partial<ConsultaioQuery>;
  let mockService: Partial<CertificadosLicenciasPermisosService>;

  const MOCK_CONSULTAIO_STATE: ConsultaioState = {
    procedureId: 'PROC001',
    parameter: 'PARAM',
    department: 'DEPT',
    folioTramite: 'FOLIO123',
    tipoDeTramite: 'Tipo',
    estadoDeTramite: 'Estado',
    readonly: false,
    create: false,
    update: true, 
    consultaioSolicitante: null
  };

  const MOCK_FORM_RESPONSE = {
    campo1: 'valor1',
    campo2: 'valor2'
  };

  beforeEach(async () => {
    mockConsultaioQuery = {
      selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
    };

    mockService = {
      getFormularioData: jest.fn().mockReturnValue(of(MOCK_FORM_RESPONSE)),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: CertificadosLicenciasPermisosService, useValue: mockService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar correctamente y llamar a guardarDatosFormulario si update es true', () => {
    const spyGuardar = jest.spyOn(component, 'guardarDatosFormulario');
    fixture.detectChanges(); // triggers ngOnInit
    expect(component.consultaState.update).toBe(true);
    expect(spyGuardar).toHaveBeenCalled();
  });

  it('debe establecer esDatosRespuesta en true si update es false', () => {
    (mockConsultaioQuery.selectConsultaioState$ as any) = of({
      ...MOCK_CONSULTAIO_STATE,
      update: false
    });

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe actualizar el estado del formulario en guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(mockService.getFormularioData).toHaveBeenCalled();
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith(MOCK_FORM_RESPONSE);
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe cambiar el índice correctamente al llamar seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
