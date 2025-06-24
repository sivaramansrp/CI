/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarIvaeiepsComponent } from './capturar-ivaeieps.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

jest.mock('@libs/shared/theme/assets/json/31601/catalog-select-tipo.json', () => ({
  __esModule: true,
  default: {
    tipoDe: [
      { id: 1, descripcion: "Inversión A" },
      { id: 2, descripcion: "Inversión B" },
      { id: 3, descripcion: "Inversión C" }
    ]
  }
}), { virtual: true });

jest.mock('@libs/shared/theme/assets/json/31601/mockdata-capturar.json', () => ({
  __esModule: true,
  default: {
    claveReferencia: '123',
    numeroOperacion: '456',
    cadenaDependencia: 'ABC',
    banco: 'Banco X',
    llavePago: '789',
    fechaPago: '2023-01-01',
    importePago: 1000
  }
}), { virtual: true });

jest.mock('@libs/shared/theme/assets/json/31601/table.json', () => ({
  __esModule: true,
  default: {
    tableHeader: [
      "RFC",
      "Denominction o razon social",
      "CDomicilaa"
    ],
    tableBody: [
      { tbodyData: [] }
    ]
  }
}), { virtual: true });

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

fdescribe('CapturarIvaeiepsComponent', () => {
  let component: CapturarIvaeiepsComponent;
  let fixture: ComponentFixture<CapturarIvaeiepsComponent>;
  let validacionesServiceSpy: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    validacionesServiceSpy = {
      rfcPattern: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/,
      isValid: jest.fn(),
      noCeroValidator: jest.fn(),
      errorCampoRequerido: jest.fn(),
      errorEmail: jest.fn(),
      errorPattern: jest.fn()
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, CapturarIvaeiepsComponent],
      providers: [
        FormBuilder,
        { provide: ValidacionesFormularioService, useValue: validacionesServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturarIvaeiepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly', () => {
    expect(component.ivaForm).toBeDefined();
    expect(component.formularioDePago).toBeDefined();
  });

  it('should toggle mostrarContenido', () => {
    expect(component.mostrarContenido).toBeFalsy();
    component.alternarContenido();
    expect(component.mostrarContenido).toBe(true);
  });

  it('should open and close modal', () => {
    expect(component.mostrarModal).toBe(false);
    component.agregarOpenModal();
    expect(component.mostrarModal).toBe(true);
    component.cerrarModal();
    expect(component.mostrarModal).toBe(false);
  });

  it('should change valorSeleccionado on cambioDeValor', () => {
    component.cambioDeValor('No');
    expect(component.valorSeleccionado).toBe('No');
  });

  it('should change predeterminadoSeleccionar on cambioDeValorIndique', () => {
    component.cambioDeValorIndique('No');
    expect(component.predeterminadoSeleccionar).toBe('No');
  });

  it('should add data to destinatarioHeaderData on agregarDatos', () => {
    component.ivaForm.patchValue({ rfc: 'ABC123456XYZ', denominacion: 'Test Name', domicilio: 'Test Address' });
    component.agregarDatos();
    expect(component.destinatarioHeaderData.tableBody[0].tbodyData.length).toBeGreaterThan(0);
  });

  it('should reset the form after agregarDatos', () => {
    const resetSpy = jest.spyOn(component.ivaForm, 'reset');
    component.ivaForm.patchValue({ rfc: 'ABC123456XYZ' }); 
    component.agregarDatos(); 
    expect(resetSpy).toHaveBeenCalled(); 
  });

  it('should patch values in formularioDePago on poblarPagoForm', () => {
    const mockData = {
      claveReferencia: '123',
      numeroOperacion: '456',
      cadenaDependencia: 'ABC',
      banco: 'Banco X',
      llavePago: '789',
      fechaPago: '2023-01-01',
      importePago: 1000
    };
    component.poblarPagoForm(mockData);
    expect(component.formularioDePago.get('claveReferencia')?.value).toBe('123');
    expect(component.formularioDePago.get('banco')?.value).toBe('');
  });

  it('should disable specific fields on form initialization', () => {
    expect(component.ivaForm.get('denominacion')?.disabled).toBe(false);
    expect(component.ivaForm.get('domicilio')?.disabled).toBe(false);
    expect(component.formularioDePago.get('claveReferencia')?.disabled).toBe(false);
    expect(component.formularioDePago.get('fechaPago')?.disabled).toBe(false);
    expect(component.formularioDePago.get('importePago')?.disabled).toBe(false);
  });
  });
