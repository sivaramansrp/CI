/* eslint-disable dot-notation */
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaComponent } from './datos-de-la.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import mercancia from '../../../../../assets/json/110101/mercancia.json';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosDeLaComponent,
        TituloComponent,
        AlertComponent,
        SelectCatalogosComponent
      ],
      providers: [
        ValidacionesFormularioService
      ]
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

  it('should initialize form on createFormMercancia', () => {
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.controls['nombreComercial']).toBeDefined();
    expect(component.formMercancia.controls['nombreIngles']).toBeDefined();
    expect(component.formMercancia.controls['fraccionArancelaria']).toBeDefined();
    expect(component.formMercancia.controls['descripcion']).toBeDefined();
    expect(component.formMercancia.controls['valorTransaccion']).toBeDefined();
  });

  it('should fill form fields with getFormDatosDeMercancia', () => {
    component.getFormDatosDeMercancia();
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBe(mercancia.fraccionArancelaria);
    expect(component.formMercancia.get('descripcion')?.value).toBe(mercancia.descripcion);
    expect(component.formMercancia.get('valorTransaccion')?.value).toBe(mercancia.valorTransaccion);
  });

  it('should validate form fields with isValid', () => {
    const field = 'nombreComercial';
    component.formMercancia.get(field)?.setValue('');
    expect(component.isValid(field)).toBeFalse();
    
    component.formMercancia.get(field)?.setValue('Producto');
    expect(component.isValid(field)).toBeTrue();
  });
});
