import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CantidadSolicitadaComponent } from './cantidad-solicitada.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

/**
 * Pruebas unitarias para el componente CantidadSolicitadaComponent.
 */
describe('CantidadSolicitadaComponent', () => {
  let component: CantidadSolicitadaComponent;
  let fixture: ComponentFixture<CantidadSolicitadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TituloComponent],
      declarations: [CantidadSolicitadaComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(CantidadSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear el formulario correctamente', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('cantidadSolicitada')).toBeDefined();
  });

  it('debería inicializar el formulario con el valor predeterminado', () => {
    expect(component.form.get('cantidadSolicitada')?.value).toBe('100');
  });

  it('debería marcar el control como inválido si está vacío', () => {
    const control = component.form.get('cantidadSolicitada');
    control?.setValue('');
    expect(component.esInvalido('cantidadSolicitada')).toBe(true);
  });

  it('debería marcar el formulario como inválido si el campo está vacío', () => {
    component.form.get('cantidadSolicitada')?.setValue('');
    component.validarYEnviarFormulario();
    expect(component.form.invalid).toBe(true);
  });

  it('debería marcar el formulario como válido y mostrar el valor correcto', () => {
    component.form.get('cantidadSolicitada')?.setValue('200');
    component.validarYEnviarFormulario();
    expect(component.form.valid).toBe(true);
    expect(component.form.value).toEqual({ cantidadSolicitada: '200' });
  });

  it('debería limpiar correctamente al destruir el componente', () => {
    const spy = spyOn(component["destroyed$"], 'complete').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
