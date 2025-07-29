import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedioTransporteComponent } from './medio-transporte.component';
import { ReactiveFormsModule, FormGroup, ControlContainer } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<MedioTransporteComponent>;
  let mockParentFormGroup: FormGroup;

  beforeEach(async () => {
    mockParentFormGroup = new FormGroup({});

    const mockControlContainer = {
      control: mockParentFormGroup
    };

    const mockConsultaQuery = {
      selectConsultaioState$: of({
        readonly: false,
        loading: false,
        error: null
      })
    };

    const mockSolicitudQuery = {
      selectSolicitud$: of({
        transporteIdMedio: '',
        identificacionTransporte: '',
        esSolicitudFerros: '',
        totalDeGuiasAmparadas: ''
      })
    };

    const mockSolicitudStore = {
      setEsSolicitudFerros: jest.fn(),
      setTransporteIdMedio: jest.fn(),
      setIdentificacionTransporte: jest.fn(),
      setTotalDeGuiasAmparadas: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MedioTransporteComponent, ReactiveFormsModule],
      providers: [
        { provide: ControlContainer, useValue: mockControlContainer },
        { provide: 'ConsultaioQuery', useValue: mockConsultaQuery },
        { provide: 'Solicitud220503Query', useValue: mockSolicitudQuery },
        { provide: 'Solicitud220503Store', useValue: mockSolicitudStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;
    component.claveDeControl = 'transporteForm';
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have input properties defined', () => {
    expect(component.claveDeControl).toBeDefined();
    expect(component.hMercanciaTabla).toBeDefined();
    expect(component.dMercanciaBody).toBeDefined();
    expect(component.mediodetransporte).toBeDefined();
  });

  it('should have default property values', () => {
    expect(component.claveDeControl).toBe('transporteForm');
    expect(component.hMercanciaTabla).toEqual([]);
    expect(component.dMercanciaBody).toEqual([]);
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.enCambioValor).toBe(0);
  });

  it('should have grupoFormularioPadre defined', () => {
    expect(component.grupoFormularioPadre).toBeDefined();
    expect(component.grupoFormularioPadre).toBe(mockParentFormGroup);
  });

  it('should initialize form group when inicializarFormulario is called', () => {
    component.inicializarFormulario();
    const formGroup = component.grupoFormularioPadre.get('transporteForm');
    expect(formGroup).toBeDefined();
    expect(formGroup).toBeInstanceOf(FormGroup);
  });

  it('should validate form correctly', () => {
    component.inicializarFormulario();
    const result = component.validarFormularios();
    expect(typeof result).toBe('boolean');
  });

  it('should return false when form group does not exist', () => {
    component.claveDeControl = 'nonExistentControl';
    const result = component.validarFormularios();
    expect(result).toBe(false);
  });

  it('should update enCambioValor when enCambioDeValor is called', () => {
    const testValue = 'testValue';
    component.enCambioDeValor(testValue);
    expect(component.enCambioValor).toBe(testValue);
  });
});
