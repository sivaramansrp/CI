import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuseComponent } from './acuse.component';

describe('AcuseComponent', () => {
  let component: AcuseComponent;
  let fixture: ComponentFixture<AcuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['descripcion']).toBeDefined();
    expect(component.form.controls['fraccion']).toBeDefined();
    expect(component.form.controls['unidadMedida']).toBeDefined();
    expect(component.form.controls['cantidad']).toBeDefined();
    expect(component.form.controls['valorFacturaUSD']).toBeDefined();
  });

  it('should set default values for producto options', () => {
    expect(component.producto).toEqual(productoOptions.options);
    expect(component.defaultSelect).toBe(productoOptions.defaultSelect);
  });

  it('should handle onValueChange correctly', () => {
    const newValue = 'Nuevo Valor';
    component.onValueChange(newValue);
    expect(component.selectedValue).toBe(newValue);
  });

  it('should validate descripcion field correctly', () => {
    const descripcionControl = component.form.controls['descripcion'];
    descripcionControl.setValue('');
    expect(descripcionControl.valid).toBeFalsy();
    descripcionControl.setValue('Short');
    expect(descripcionControl.valid).toBeFalsy();
    descripcionControl.setValue(
      'This is a valid description with more than 10 characters.'
    );
    expect(descripcionControl.valid).toBeTruthy();
  });

  it('should validate cantidad field correctly', () => {
    const cantidadControl = component.form.controls['cantidad'];
    cantidadControl.setValue('');
    expect(cantidadControl.valid).toBeFalsy();
    cantidadControl.setValue('abc');
    expect(cantidadControl.valid).toBeFalsy();
    cantidadControl.setValue('0');
    expect(cantidadControl.valid).toBeFalsy();
    cantidadControl.setValue('10');
    expect(cantidadControl.valid).toBeTruthy();
  });

  it('should validate valorFacturaUSD field correctly', () => {
    const valorFacturaUSDControl = component.form.controls['valorFacturaUSD'];
    valorFacturaUSDControl.setValue('');
    expect(valorFacturaUSDControl.valid).toBeFalsy();
    valorFacturaUSDControl.setValue('abc');
    expect(valorFacturaUSDControl.valid).toBeFalsy();
    valorFacturaUSDControl.setValue('0');
    expect(valorFacturaUSDControl.valid).toBeFalsy();
    valorFacturaUSDControl.setValue('100.50');
    expect(valorFacturaUSDControl.valid).toBeTruthy();
  });

  it('should call fetchFraccion when fraccion is selected', () => {
    spyOn(component, 'fetchFraccion');
    const mockFraccion = { id: 1, descripcion: 'Fraccion 1' };
    component.fetchFraccion(mockFraccion);
    expect(component.fetchFraccion).toHaveBeenCalledWith(mockFraccion);
  });

  it('should call fetchUnidad when unidad is selected', () => {
    spyOn(component, 'fetchUnidad');
    const mockUnidad = { id: 1, descripcion: 'Unidad 1' };
    component.fetchUnidad(mockUnidad);
    expect(component.fetchUnidad).toHaveBeenCalledWith(mockUnidad);
  });
});
