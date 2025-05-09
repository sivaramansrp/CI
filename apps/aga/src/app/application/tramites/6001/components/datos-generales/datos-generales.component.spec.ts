import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';
import { of } from 'rxjs';

describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let registroCuentasBancariasService: RegistroCuentasBancariasService;

  const mockSolicitudesTabla = [
    {
      movimiento: 'Alta',
      cuenta: 'John Doe',
      rfc: 'TEST123456789',
      persona: 'Física',
      numeroDeCuenta: '1234567890',
      sucursal: 'Sucursal Test',
      institucionDeCredito: 'Banco Test',
      numero: '12345',
      radicaCuenta: 'México',
      estado: 'Activo',
      domicilio: 'Domicilio Test',
    },
  ];

  const mockSociedadTabla = [
    { id: 1, nombre: 'Sociedad Test 1' },
    { id: 2, nombre: 'Sociedad Test 2' },
  ];

  const mockFormDatosGenerales = {
    aduanaAdicional: 'Aduana Test',
    nombre: 'Nombre Test',
    federalDeContribuyentes: 'RFC123456',
    tipoDePersona: 'Física',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: RegistroCuentasBancariasService,
          useValue: {
            getSolicitudesTabla: jest.fn().mockReturnValue(of(mockSolicitudesTabla)),
            obtenerDatosDeFormularioDeAPI: jest.fn().mockReturnValue(
              of({ data: [mockFormDatosGenerales] })
            ),
            getSociedadTablaDatos: jest.fn().mockReturnValue(of({ data: mockSociedadTabla })),
            cambiarComponente: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    registroCuentasBancariasService = TestBed.inject(RegistroCuentasBancariasService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.formDatosGenerales).toBeDefined();
    expect(component.formDatosGenerales.get('aduanaAdicional')?.value).toBe('');
    expect(component.formDatosGenerales.get('nombre')?.value).toBe('');
    expect(component.formDatosGenerales.get('federalDeContribuyentes')?.value).toBe('');
    expect(component.formDatosGenerales.get('tipoDePersona')?.value).toBe('');
  });

  it('should call getSolicitudesTabla and set registroDeSolicitudesTablaDatos', () => {
    component.getSolicitudesTabla();
    expect(registroCuentasBancariasService.getSolicitudesTabla).toHaveBeenCalled();
    expect(component.registroDeSolicitudesTablaDatos).toEqual(mockSolicitudesTabla);
  });

  it('should call obtenerDatosDeFormularioDeAPI and set form values', () => {
    component.obtenerFormDatosGeneralesDatos();
    expect(registroCuentasBancariasService.obtenerDatosDeFormularioDeAPI).toHaveBeenCalled();
    expect(component.formDatosGenerales.get('aduanaAdicional')?.value).toBe(
      mockFormDatosGenerales.aduanaAdicional
    );
    expect(component.formDatosGenerales.get('nombre')?.value).toBe(mockFormDatosGenerales.nombre);
    expect(component.formDatosGenerales.get('federalDeContribuyentes')?.value).toBe(
      mockFormDatosGenerales.federalDeContribuyentes
    );
    expect(component.formDatosGenerales.get('tipoDePersona')?.value).toBe(
      mockFormDatosGenerales.tipoDePersona
    );
  });

  it('should call getSociedadTabla and set sociedadDatos', () => {
    component.getSociedadTabla();
    expect(registroCuentasBancariasService.getSociedadTablaDatos).toHaveBeenCalled();
    expect(component.sociedadDatos).toEqual(mockSociedadTabla);
  });

  it('should call cambiarComponente on altaDeCuenta', () => {
    component.altaDeCuenta();
    expect(registroCuentasBancariasService.cambiarComponente).toHaveBeenCalledWith('AgregarCuenta');
  });

  it('should create a deep copy of an object', () => {
    const obj = { key: 'value' };
    const copy = component.deepCopy(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj); // Ensure it's a deep copy
  });

  it('should verify if a value is an object', () => {
    expect(component.isObject({})).toBe(true);
    expect(component.isObject(null)).toBe(false);
    expect(component.isObject([])).toBe(true);
    expect(component.isObject('string')).toBe(false);
  });

  it('should verify if a value is a valid array', () => {
    expect(component.isValidArray([1, 2, 3])).toBe(true);
    expect(component.isValidArray([])).toBe(false);
    expect(component.isValidArray(null)).toBe(false);
    expect(component.isValidArray('string')).toBe(false);
  });
});