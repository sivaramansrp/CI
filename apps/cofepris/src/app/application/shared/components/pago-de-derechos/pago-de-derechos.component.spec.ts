import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.pagoDerechosForm.get('claveReferencia')?.value).toBe('');
    expect(component.pagoDerechosForm.get('cadenaDependencia')?.value).toBe('');
    expect(component.pagoDerechosForm.get('estado')?.value).toBe('');
    expect(component.pagoDerechosForm.get('llavePago')?.value).toBe('');
    expect(component.pagoDerechosForm.get('fechaPago')?.value).toBe('');
    expect(component.pagoDerechosForm.get('importePago')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.pagoDerechosForm;
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
    const importePagoControl = component.pagoDerechosForm.controls['importePago'];
    
    importePagoControl.setValue('abc');
    expect(importePagoControl.valid).toBeFalsy();
    
    importePagoControl.setValue('100.00');
    expect(importePagoControl.valid).toBeTruthy();
  });

  it('should reset form on onReset()', () => {
    component.pagoDerechosForm.controls['claveReferencia'].setValue('test');
    component.onReset();
    expect(component.pagoDerechosForm.get('claveReferencia')?.value).toBe(null);
  });
  
});
