import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DomicilioDelDestinatarioComponent } from './domicilio-del-destinatario.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

describe('DomicilioDelDestinatarioComponent', () => {
  let component: DomicilioDelDestinatarioComponent;
  let fixture: ComponentFixture<DomicilioDelDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomicilioDelDestinatarioComponent, TituloComponent],
      imports: [CommonModule, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group with default values', () => {
    expect(component.domicilioDelDestinatarioForm).toBeTruthy();
    const form = component.domicilioDelDestinatarioForm;

    // Check if the controls are initialized correctly
    expect(form.get('calle')?.value).toBe('');
    expect(form.get('numeroLetra')?.value).toBe('');
    expect(form.get('ciudad')?.value).toBe('');
    expect(form.get('correoElectronico')?.value).toBe('');
    expect(form.get('fax')?.value).toBe('');
    expect(form.get('telefono')?.value).toBe('');
  });

  it('should have the required validators for calle, numeroLetra, ciudad, and correoElectronico', () => {
    const form = component.domicilioDelDestinatarioForm;

    // Validate calle control
    const calle = form.get('calle');
    calle?.setValue('');
    expect(calle?.valid).toBeFalsy();
    calle?.setValue('Some Street');
    expect(calle?.valid).toBeTruthy();

    // Validate numeroLetra control
    const numeroLetra = form.get('numeroLetra');
    numeroLetra?.setValue('');
    expect(numeroLetra?.valid).toBeFalsy();
    numeroLetra?.setValue('123A');
    expect(numeroLetra?.valid).toBeTruthy();

    // Validate ciudad control
    const ciudad = form.get('ciudad');
    ciudad?.setValue('');
    expect(ciudad?.valid).toBeFalsy();
    ciudad?.setValue('Some City');
    expect(ciudad?.valid).toBeTruthy();

    // Validate correoElectronico control
    const correoElectronico = form.get('correoElectronico');
    correoElectronico?.setValue('');
    expect(correoElectronico?.valid).toBeFalsy();
    correoElectronico?.setValue('invalid-email');
    expect(correoElectronico?.valid).toBeFalsy();
    correoElectronico?.setValue('valid@example.com');
    expect(correoElectronico?.valid).toBeTruthy();
  });

  it('should disable fields properly', () => {
    const form = component.domicilioDelDestinatarioForm;
    
    // Disable the fields (if required by component logic)
    form.get('calle')?.disable();
    form.get('numeroLetra')?.disable();
    form.get('ciudad')?.disable();
    form.get('correoElectronico')?.disable();
    
    // Ensure the fields are disabled
    expect(form.get('calle')?.disabled).toBeTruthy();
    expect(form.get('numeroLetra')?.disabled).toBeTruthy();
    expect(form.get('ciudad')?.disabled).toBeTruthy();
    expect(form.get('correoElectronico')?.disabled).toBeTruthy();
  });

  it('should enable fields after being disabled', () => {
    const form = component.domicilioDelDestinatarioForm;
    
    // Disable the fields
    form.get('calle')?.disable();
    form.get('numeroLetra')?.disable();
    form.get('ciudad')?.disable();
    form.get('correoElectronico')?.disable();
    
    // Enable the fields
    form.get('calle')?.enable();
    form.get('numeroLetra')?.enable();
    form.get('ciudad')?.enable();
    form.get('correoElectronico')?.enable();
    
    // Ensure the fields are enabled
    expect(form.get('calle')?.enabled).toBeTruthy();
    expect(form.get('numeroLetra')?.enabled).toBeTruthy();
    expect(form.get('ciudad')?.enabled).toBeTruthy();
    expect(form.get('correoElectronico')?.enabled).toBeTruthy();
  });
});
