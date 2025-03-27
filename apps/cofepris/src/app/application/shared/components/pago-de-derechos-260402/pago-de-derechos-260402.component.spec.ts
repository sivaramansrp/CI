import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechos260402Component } from './pago-de-derechos-260402.component';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechos260402Component;
  let fixture: ComponentFixture<PagoDeDerechos260402Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechos260402Component],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechos260402Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.pagoDerechos.get('claveReferencia')?.value).toBe('');
    expect(component.pagoDerechos.get('cadenaDependencia')?.value).toBe('');
    expect(component.pagoDerechos.get('estado')?.value).toBe('');
    expect(component.pagoDerechos.get('llavePago')?.value).toBe('');
    expect(component.pagoDerechos.get('fechaPago')?.value).toBe('');
    expect(component.pagoDerechos.get('importePago')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.pagoDerechos;
    expect(form.valid).toBeFalsy();
    
    form.controls['claveReferencia'].setValue('123');
    form.controls['cadenaDependencia'].setValue('abc');
    form.controls['estado'].setValue('active');
    form.controls['llavePago'].setValue('key123');
    form.controls['fechaPago'].setValue('2024-01-01');
    form.controls['importePago'].setValue('100.00');
    
    expect(form.valid).toBeTruthy();
  });

  it('should validate importePago pattern', () => {
    const importePagoControl = component.pagoDerechos.controls['importePago'];
    
    importePagoControl.setValue('abc');
    expect(importePagoControl.valid).toBeFalsy();
    
    importePagoControl.setValue('100.00');
    expect(importePagoControl.valid).toBeTruthy();
  });

  it('should reset form on onReset()', () => {
    component.pagoDerechos.controls['claveReferencia'].setValue('test');
    expect(component.pagoDerechos.get('claveReferencia')?.value).toBe(null);
  });
  
});
