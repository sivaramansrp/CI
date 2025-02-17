/* eslint-disable dot-notation */
/* eslint-disable sort-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDelaComponent } from './datos-dela.component';

describe('DatosDelaComponent', () => {
  let component: DatosDelaComponent;
  let fixture: ComponentFixture<DatosDelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDelaComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.solicitudForm.valid).toBeFalsy();
  });

  it('numeroRegistroAmbiental field validity', () => {
    const control = component.solicitudForm.get('datosdelForm.numeroRegistroAmbiental');
    expect(control.valid).toBeFalsy();
    expect(control.errors['required']).toBeTruthy();

    control.setValue('1234567890123');
    expect(control.valid).toBeTruthy();
  });

  it('descripcionGenerica1 field validity', () => {
    const control = component.solicitudForm.get('datosdelForm.descripcionGenerica1');
    expect(control.valid).toBeFalsy();
    expect(control.errors['required']).toBeTruthy();

    control.setValue('Some description');
    expect(control.valid).toBeTruthy();
  });

  it('numeroProgramaImmex field validity', () => {
    const control = component.solicitudForm.get('datosdelForm.numeroProgramaImmex');
    expect(control.valid).toBeFalsy();
    expect(control.errors['required']).toBeTruthy();

    control.setValue('IMMEX123');
    expect(control.valid).toBeTruthy();
  });

  it('should mark fields as touched after form submission attempt', () => {
    component.onSubmit();
    const numeroRegistroAmbientalControl = component.solicitudForm.get('datosdelForm.numeroRegistroAmbiental');
    const descripcionGenerica1Control = component.solicitudForm.get('datosdelForm.descripcionGenerica1');
    const numeroProgramaImmexControl = component.solicitudForm.get('datosdelForm.numeroProgramaImmex');

    expect(numeroRegistroAmbientalControl.touched).toBeTruthy();
    expect(descripcionGenerica1Control.touched).toBeTruthy();
    expect(numeroProgramaImmexControl.touched).toBeTruthy();
  });

  it('should log "Form Submitted!" when form is valid', () => {
    spyOn(console, 'log');
    component.solicitudForm.get('datosdelForm.numeroRegistroAmbiental').setValue('1234567890123');
    component.solicitudForm.get('datosdelForm.descripcionGenerica1').setValue('Some description');
    component.solicitudForm.get('datosdelForm.numeroProgramaImmex').setValue('IMMEX123');

    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulario Enviado!', component.solicitudForm.value);
  });

  it('should log "Form is invalid" when form is invalid', () => {
    spyOn(console, 'log');
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('El formulario es inválido');
  });
});