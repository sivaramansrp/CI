import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CantidadSolicitadaComponent } from './cantidad-solicitada.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('CantidadSolicitadaComponent', () => {
  let component: CantidadSolicitadaComponent;
  let fixture: ComponentFixture<CantidadSolicitadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CantidadSolicitadaComponent],
      imports: [CommonModule, ReactiveFormsModule, TituloComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(CantidadSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on initialization', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('cantidadSolicitada')).toBeDefined();
  });

  it('should have the default value of cantidadSolicitada as 100', () => {
    expect(component.form.get('cantidadSolicitada')?.value).toBe('100');
  });

  it('should mark the form as invalid when cantidadSolicitada is empty', () => {
    component.form.get('cantidadSolicitada')?.setValue('');
    expect(component.form.invalid).toBe(true);
  });

  it('should mark the form as valid when cantidadSolicitada is filled', () => {
    component.form.get('cantidadSolicitada')?.setValue('200');
    expect(component.form.valid).toBe(true);
  });

  it('should return true when esInvalido is called on an invalid control', () => {
    component.form.get('cantidadSolicitada')?.setValue('');
    component.form.get('cantidadSolicitada')?.markAsTouched();
    expect(component.esInvalido('cantidadSolicitada')).toBe(true);
  });

  it('should return false when esInvalido is called on a valid control', () => {
    component.form.get('cantidadSolicitada')?.setValue('300');
    expect(component.esInvalido('cantidadSolicitada')).toBe(false);
  });

  it('should log error message if form is invalid on validarYEnviarFormulario call', () => {
    spyOn(console, 'log');
    component.form.get('cantidadSolicitada')?.setValue('');
    component.validarYEnviarFormulario();
    expect(console.log).toHaveBeenCalledWith('El formulario tiene errores. Corríjalos antes de continuar.');
  });

  it('should log success message if form is valid on validarYEnviarFormulario call', () => {
    spyOn(console, 'log');
    component.form.get('cantidadSolicitada')?.setValue('500');
    component.validarYEnviarFormulario();
    expect(console.log).toHaveBeenCalledWith('Formulario enviado con éxito', { cantidadSolicitada: '500' });
  });
});
