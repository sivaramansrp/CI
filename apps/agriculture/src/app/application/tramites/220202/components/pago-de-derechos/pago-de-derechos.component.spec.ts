import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent], // Declara el componente
      imports: [ReactiveFormsModule], // Importa ReactiveFormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.pagoForm).toBeDefined();
    expect(component.pagoForm.get('exentoPago')).toBeDefined();
    expect(component.pagoForm.get('justificacion')).toBeDefined();
    expect(component.pagoForm.get('claveReferencia')).toBeDefined();
    expect(component.pagoForm.get('cadenaDependencia')).toBeDefined();
    expect(component.pagoForm.get('banco')).toBeDefined();
    expect(component.pagoForm.get('llavePago')).toBeDefined();
    expect(component.pagoForm.get('importePago')).toBeDefined();
    expect(component.pagoForm.get('fechaDePago')).toBeDefined();

    // Verifica que algunos campos tengan los validators correctos
    expect(component.pagoForm.get('justificacion')?.validator).toBeDefined();
    expect(component.pagoForm.get('banco')?.validator).toBeDefined();
    expect(component.pagoForm.get('importePago')?.validator).toBeDefined();
    expect(component.pagoForm.get('fechaDePago')?.validator).toBeDefined();
  });

  it('should update the payment date correctly', () => {
    const testDate = '2024-03-15';
    component.cambioFechaInicio(testDate);
    expect(component.pagoForm.get('fechaDePago')?.value).toBe(testDate);
  });

  it('should select justification and enable the control', () => {
    const mockJustificacion: Catalogo = {
      id: 123,
      descripcion: "Producto Ejemplo",
      tam: "Mediano",
      dpi: "300"
    } as Catalogo;
    component.seleccionarListDatas(mockJustificacion, 'justificacion');
    expect(component.pagoForm.get('justificacion')?.value).toBe('1');
    expect(component.pagoForm.get('justificacion')?.enabled).toBe(true);
  });

  it('should select bank and enable the control', () => {
    const mockBanco: Catalogo = {
      id: 456,
      descripcion: "Otro Producto"
    } as Catalogo;
    component.seleccionarListDatas(mockBanco, 'banco');
    expect(component.pagoForm.get('banco')?.value).toBe('2');
    expect(component.pagoForm.get('banco')?.enabled).toBe(true);
  });

  it('should set correct initial value for selectedValue', () => {
    expect(component.selectedValue).toBe('no');
  });

  it('should have radio options defined', () => {
    expect(component.radioOptions).toBeDefined();
    expect(component.radioOptions.length).toBe(2);
    expect(component.radioOptions[0].label).toBe('No');
    expect(component.radioOptions[0].value).toBe('no');
    expect(component.radioOptions[1].label).toBe('Sí');
    expect(component.radioOptions[1].value).toBe('Si');
  });


  // ... (más tests para cubrir otros métodos y funcionalidades)
});