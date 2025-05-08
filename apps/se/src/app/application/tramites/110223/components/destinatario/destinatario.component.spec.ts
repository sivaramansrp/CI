import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DestinatarioComponent } from './destinatario.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, DestinatarioComponent],
      providers: [FormBuilder, provideHttpClient(),],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    component.registroForm = component.fb.group({
      validacionForm: component.fb.group({
        nombre: [''],
        numeroFiscal: [''],
        calle: [''],
        numeroLetra: [''],
        ciudad: [''],
        nacion: [''],
        correoElectronico: [''],
        telefono: [''],
        fax: [''],
        numeroDeRegistroFiscal: [''],
      }),
    });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.registroForm.get('validacionForm');
    expect(form?.value).toEqual({
      nombre: '',
      numeroFiscal: '',
      calle: '',
      numeroLetra: '',
      ciudad: '',
      nacion: null,
      correoElectronico: '',
      telefono: '',
      fax: '',
      numeroDeRegistroFiscal: '',
    });
  });

  it('should call validarDestinatarioFormulario on form submit', () => {
    jest.spyOn(component, 'validarDestinatarioFormulario');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.validarDestinatarioFormulario).toHaveBeenCalled();
  });

  it('should call setValoresStore when input changes', () => {
    jest.spyOn(component, 'setValoresStore');

    const nombreInput = fixture.debugElement.query(By.css('input[formControlName="nombre"]'));
    nombreInput.triggerEventHandler('change', { target: { value: 'Test Name' } });

    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.registroForm.get('validacionForm'),
      'nombre',
      'setNombre'
    );
  });

  it('should validate required fields', () => {
    const form = component.registroForm.get('validacionForm');
    form?.get('nombre')?.setValue('');
    form?.get('numeroFiscal')?.setValue('');
    form?.get('calle')?.setValue('');
    form?.get('numeroLetra')?.setValue('');
    form?.get('ciudad')?.setValue('');
    form?.get('correoElectronico')?.setValue('');

    expect(form?.valid).toBeFalsy();
  });

  it('should update form values correctly', () => {
    const form = component.registroForm.get('validacionForm');
    form?.get('nombre')?.setValue('John Doe');
    form?.get('numeroFiscal')?.setValue('123456789');
    form?.get('calle')?.setValue('Main Street');
    form?.get('numeroLetra')?.setValue('B2');
    form?.get('ciudad')?.setValue('New York');
    form?.get('correoElectronico')?.setValue('john.doe@example.com');

    expect(form?.value).toEqual({
      nombre: 'John Doe',
      numeroFiscal: '123456789',
      calle: 'Main Street',
      numeroLetra: 'B2',
      ciudad: 'New York',
      nacion: null,
      correoElectronico: 'john.doe@example.com',
      telefono: '',
      fax: '',
      numeroDeRegistroFiscal: '',
    });
  });

  it('should handle invalid form submission gracefully', () => {
    jest.spyOn(component, 'validarDestinatarioFormulario');
    component.registroForm.get('validacionForm')?.get('nombre')?.setValue('');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.validarDestinatarioFormulario).toHaveBeenCalled();
    expect(component.registroForm.valid).toBeFalsy();
  });

  it('should call setValoresStore for all inputs', () => {
    jest.spyOn(component, 'setValoresStore');

    const inputs = fixture.debugElement.queryAll(By.css('input[formControlName]'));
    inputs.forEach((input) => {
      input.triggerEventHandler('change', { target: { value: 'Test Value' } });
    });

    expect(component.setValoresStore).toHaveBeenCalledTimes(inputs.length);
  });

  it('should handle changes in app-catalogo-select component', () => {
    jest.spyOn(component, 'setValoresStore');
    const catalogoSelect = fixture.debugElement.query(By.css('app-catalogo-select'));
    catalogoSelect.triggerEventHandler('change', { target: { value: 'Mexico' } });

    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.registroForm.get('validacionForm'),
      'nacion',
      'setNacion'
    );
  });

  
  it('should call next and complete on destroyNotifier$ when ngOnDestroy is called', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });
  
});