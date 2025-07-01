import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosCertificacionComponent } from './datos-certificacion.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('DatosCertificacionComponent', () => {
  let fixture: ComponentFixture<DatosCertificacionComponent>;
  let component: DatosCertificacionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatosCertificacionComponent, FormsModule, ReactiveFormsModule],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).overrideComponent(DatosCertificacionComponent, {}).compileComponents();

    fixture = TestBed.createComponent(DatosCertificacionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize certificionForm', () => {
    expect(component.certificionForm).toBeDefined();
  });

  it('should initialize certificion control with value "Si"', () => {
    const value = component.certificionForm.get('certificion')?.value;
    expect(value).toBe('Si');
  });

  it('should have certificion control disabled', () => {
    const control = component.certificionForm.get('certificion');
    expect(control?.disabled).toBe(true);
  });

  it('should allow setting value when control is enabled', () => {
    const control = component.certificionForm.get('certificion');
    control?.enable();
    control?.setValue('No');
    expect(control?.value).toBe('No');
    expect(control?.disabled).toBe(false);
  });
});
