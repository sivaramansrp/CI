import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteComponent } from './transporte.component';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransporteComponent],
      imports: [CatalogoSelectComponent, TituloComponent, ReactiveFormsModule, FormsModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(component.isValid(form, field)).toBeFalsy();
    form.get(field)?.setValue('Some Value');
    expect(form.get(field)?.valid).toBeTruthy();
  });

  it('should mark form as touched if invalid', () => {
    component.crearFormTransporte();
    component.transporteForm.get('mediodeTransporte')?.setValue('');
    component.validarTransporteFormulario();
    expect(component.transporteForm.touched).toBeTruthy();
  });
});
