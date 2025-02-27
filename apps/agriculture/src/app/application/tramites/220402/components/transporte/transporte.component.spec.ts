import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteComponent } from './transporte.component';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransporteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tiposDocumentos on init', () => {
    component.fetchtiposDocumentos();
    expect(component.tiposDocumentos.catalogos.length).toBe(1);
    expect(component.tiposDocumentos.catalogos[0].descripcion).toBe(
      'Transporte 1'
    );
  });

  it('should create transporte form on init', () => {
    component.crearFormTransporte();
    expect(component.transporteForm).toBeDefined();
    expect(component.transporteForm.get('mediodeTransporte')).toBeDefined();
    expect(
      component.transporteForm.get('identificationDelTransporte')
    ).toBeDefined();
  });

  it('should validate form field', () => {
    component.crearFormTransporte();
    const form = component.transporteForm;
    const field = 'mediodeTransporte';
    form.get(field)?.setValue('');
    expect(component.isValid(form, field)).toBeFalse();
    form.get(field)?.setValue('Some Value');
    expect(component.isValid(form, field)).toBeTrue();
  });

  it('should mark form as touched if invalid', () => {
    component.crearFormTransporte();
    component.transporteForm.get('mediodeTransporte')?.setValue('');
    component.validarTransporteFormulario();
    expect(component.transporteForm.touched).toBeTrue();
  });
});
