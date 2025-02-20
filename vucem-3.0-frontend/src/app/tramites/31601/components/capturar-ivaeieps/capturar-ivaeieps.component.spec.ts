import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarIvaeiepsComponent } from './capturar-ivaeieps.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CommonModule } from '@angular/common';

fdescribe('CapturarIvaeiepsComponent', () => {
  let component: CapturarIvaeiepsComponent;
  let fixture: ComponentFixture<CapturarIvaeiepsComponent>;
  let validacionesServiceSpy: jasmine.SpyObj<ValidacionesFormularioService>;

  beforeEach(async () => {
    validacionesServiceSpy = jasmine.createSpyObj('ValidacionesFormularioService', ['rfcPattern']);
    validacionesServiceSpy.rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule,CapturarIvaeiepsComponent],
      providers: [
        FormBuilder,
        { provide: ValidacionesFormularioService, useValue: validacionesServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturarIvaeiepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly', () => {
    expect(component.ivaForm).toBeDefined();
    expect(component.formularioDePago).toBeDefined();
  });

  it('should invalidate RFC field when incorrect format is entered', () => {
    const rfcControl = component.ivaForm.get('rfc');
    rfcControl?.setValue('123456789');
    expect(rfcControl?.valid).toBeFalse();
    expect(rfcControl?.errors?.['pattern']).toBeTruthy();
  });

  it('should validate RFC field when correct format is entered', () => {
    const rfcControl = component.ivaForm.get('rfc');
    rfcControl?.setValue('ABC123456XYZ');
    expect(rfcControl?.valid).toBeTrue();
  });

  it('should toggle showContent', () => {
    expect(component.showContent).toBeFalse();
    component.alternarContenido();
    expect(component.showContent).toBeTrue();
  });

  it('should open and close modal', () => {
    expect(component.showModal).toBeFalse();
    component.agregarOpenModal();
    expect(component.showModal).toBeTrue();
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should change valorSeleccionado on cambioDeValor', () => {
    component.cambioDeValor('No');
    expect(component.valorSeleccionado).toBe('No');
  });

  it('should change predeterminadoSeleccionar on cambioDeValorIndique', () => {
    component.cambioDeValorIndique('No');
    expect(component.predeterminadoSeleccionar).toBe('No');
  });

  it('should add data to destinatarioHeaderData on agregarDatos', () => {
    component.ivaForm.patchValue({ rfc: 'ABC123456XYZ', denominacion: 'Test Name', domicilio: 'Test Address' });
    component.agregarDatos();
    expect(component.destinatarioHeaderData.tableBody[0].tbodyData.length).toBeGreaterThan(0);
  });

  it('should reset the form after agregarDatos', () => {
    spyOn(component.ivaForm, 'reset');
    component.ivaForm.patchValue({ rfc: 'ABC123456XYZ' }); 
    component.agregarDatos(); 
    expect(component.ivaForm.reset).toHaveBeenCalled(); 
  });

  it('should set tipoDe field value in ivaForm on tipoDeInver', () => {
    component.tipoDeInver();
    expect(component.ivaForm.get('tipoDe')?.value).toBe(component.tipoDe);
  });

  it('should return required field error message from getControlError', () => {
    const rfcControl = component.ivaForm.get('rfc');
    rfcControl?.setValue('');
    rfcControl?.markAsTouched();
    expect(component.getControlError('rfc')).toBe('This field is required');
  });

  it('should return pattern error message from getControlError', () => {
    const rfcControl = component.ivaForm.get('rfc');
    rfcControl?.setValue('12345');
    rfcControl?.markAsTouched();
    expect(component.getControlError('rfc')).toBe('Invalid RFC format');
  });

  it('should return null from getControlError when valid', () => {
    const rfcControl = component.ivaForm.get('rfc');
    rfcControl?.setValue('ABC123456XYZ');
    rfcControl?.markAsTouched();
    expect(component.getControlError('rfc')).toBeNull();
  });

  it('should patch values in formularioDePago on poblarPagoForm', () => {
    const mockData = {
      claveReferencia: '123',
      numeroOperacion: '456',
      cadenaDependencia: 'ABC',
      tipoDe: 'Banco X',
      llavePago: '789',
      fechaPago: '2023-01-01',
      importePago: 1000
    };
    component.poblarPagoForm(mockData);
    expect(component.formularioDePago.get('claveReferencia')?.value).toBe('123');
    expect(component.formularioDePago.get('banco')?.value).toBe('Banco X');
  });

  it('should disable specific fields on form initialization', () => {
    expect(component.ivaForm.get('denominacion')?.disabled).toBeTrue();
    expect(component.ivaForm.get('domicilio')?.disabled).toBeTrue();
    expect(component.formularioDePago.get('claveReferencia')?.disabled).toBeTrue();
    expect(component.formularioDePago.get('fechaPago')?.disabled).toBeTrue();
    expect(component.formularioDePago.get('importePago')?.disabled).toBeTrue();
  });

  it('should return the rfc form control using the getter', () => {
    expect(component.rfc).toBe(component.ivaForm.get('rfc'));
  });

  it('should validate the rfc getter with correct value', () => {
    component.rfc?.setValue('ABC123456XYZ');
    expect(component.rfc?.valid).toBeTrue();
  });

  
});


