import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { of } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockConsultaioQuery: Partial<ConsultaioQuery>;
  let mockService: Partial<CertificadosLicenciasPermisosService>;

  const MOCK_CONSULTAIO_STATE: ConsultaioState = {
    procedureId: 'PROC-001',
    parameter: 'PARAM-XYZ',
    department: 'DEP-123',
    folioTramite: 'FT-456',
    tipoDeTramite: 'Normal',
    estadoDeTramite: 'En Proceso',
    readonly: false,
    create: false,
    update: true,
    consultaioSolicitante: null
  };

  beforeEach(async () => {
    mockConsultaioQuery = {
      selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
    };

    mockService = {
      getEstadoDatos: jest.fn().mockReturnValue(of({ campo1: 'valor1' })),
      getScianDatos: jest.fn().mockReturnValue(of({ campo2: 'valor2' })),
      getClaveDatos: jest.fn().mockReturnValue(of({ campo3: 'valor3' })),
      getRegimenDatos: jest.fn().mockReturnValue(of({})),
      getMercanciasDatos: jest.fn().mockReturnValue(of({})),
      getTipoDeProductoDatos: jest.fn().mockReturnValue(of({})),
      getPaisDeProcedenciaDatos: jest.fn().mockReturnValue(of({})),
      getFabricanteDatos: jest.fn().mockReturnValue(of({})),
      getFacturadorDatos: jest.fn().mockReturnValue(of({})),
      getProveedorDatos: jest.fn().mockReturnValue(of({})),
      getCertificadoDatos: jest.fn().mockReturnValue(of({})),
      getOtrosDatos: jest.fn().mockReturnValue(of({})),
      getBancoDatos: jest.fn().mockReturnValue(of({})),
      getTipoDeDocumentoDatos: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: CertificadosLicenciasPermisosService, useValue: mockService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer el índice correctamente al seleccionar una pestaña', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debe inicializar y llamar a guardarDatosFormulario si update es true', () => {
    const spyGuardarDatos = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(component.consultaState).toEqual(MOCK_CONSULTAIO_STATE);
    expect(spyGuardarDatos).toHaveBeenCalled();
  });

  it('debe establecer esDatosRespuesta en true si update es false', () => {
    (mockConsultaioQuery.selectConsultaioState$ as any) = of({ update: false });
    component = new PasoUnoComponent(
      mockConsultaioQuery as ConsultaioQuery,
      mockService as CertificadosLicenciasPermisosService
    );
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe llamar a actualizarEstadoFormulario con la respuesta unificada', () => {
    component.guardarDatosFormulario();
    fixture.detectChanges();
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith(expect.objectContaining({
      campo1: 'valor1',
      campo2: 'valor2',
      campo3: 'valor3'
    }));
    expect(component.esDatosRespuesta).toBe(true);
  });
});
