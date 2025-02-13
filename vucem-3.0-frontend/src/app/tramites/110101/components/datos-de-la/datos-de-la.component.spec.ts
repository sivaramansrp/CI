/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaComponent } from './datos-de-la.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import mercancia from '../../../../../assets/json/110101/mercancia.json';

import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

fdescribe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaComponent],
      providers: [FormBuilder, ValidacionesFormularioService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.get('nombreComercial')?.value).toBe('');
    expect(component.formMercancia.get('nombreIngles')?.value).toBe('');
  });

  it('should validate required fields', () => {
    component.formMercancia.get('nombreComercial')?.setValue('');
    component.formMercancia.get('nombreIngles')?.setValue('');
    component.formMercancia.markAllAsTouched();
    fixture.detectChanges();

    expect(component.formMercancia.get('nombreComercial')?.invalid).toBeTrue();
    expect(component.formMercancia.get('nombreIngles')?.invalid).toBeTrue();
  });

  it('should populate form with JSON data', () => {
    component.getFormDatosDeMercancia();
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toEqual(mercancia.fraccionArancelaria);
    expect(component.formMercancia.get('descripcion')?.value).toEqual(mercancia.descripcion);
    expect(component.formMercancia.get('valorTransaccion')?.value).toEqual(mercancia.valorTransaccion);
  });

  it('should check if form field is valid', () => {
    spyOn(component['validacionesService'], 'isValid').and.returnValue(true);
    expect(component.isValid('nombreComercial')).toBeTrue();
  });
});