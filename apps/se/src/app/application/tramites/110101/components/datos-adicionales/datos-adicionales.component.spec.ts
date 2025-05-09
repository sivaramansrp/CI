/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosAdicionalesComponent } from './datos-adicionales.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

fdescribe('DatosAdicionalesComponent', () => {
  let component: DatosAdicionalesComponent;
  let fixture: ComponentFixture<DatosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosAdicionalesComponent],
      providers: [FormBuilder, ValidacionesFormularioService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call crearFormulario and initialize data in ngOnInit', () => {
    spyOn(component, 'crearFormulario').and.callThrough();
    spyOn(component, 'getEntidadFederativa').and.callThrough();
    spyOn(component, 'getRepresentacionFederal').and.callThrough();

    component.ngOnInit();

    expect(component.crearFormulario).toHaveBeenCalled();
    expect(component.getEntidadFederativa).toHaveBeenCalled();
    expect(component.getRepresentacionFederal).toHaveBeenCalled();
  });


  it('should initialize the form', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.controls['entidad']).toBeDefined();
    expect(component.formulario.controls['representacion']).toBeDefined();
  });

  it('should have default entity and representation values', () => {
    component.getEntidadFederativa();
    component.getRepresentacionFederal();
    expect(component.entidad.length).toBeGreaterThan(0);
    expect(component.representacion.length).toBeGreaterThan(0);
  });

  it('should validate required fields', () => {
    component.formulario.controls['entidad'].setValue('');
    component.formulario.controls['representacion'].setValue('');
    expect(component.formulario.valid).toBeFalsy();
  });

  it('should set valid values in the form', () => {
    component.formulario.controls['entidad'].setValue('SINALOA');
    component.formulario.controls['representacion'].setValue('CULIACAN');
    expect(component.formulario.valid).toBeTruthy();
  });
});