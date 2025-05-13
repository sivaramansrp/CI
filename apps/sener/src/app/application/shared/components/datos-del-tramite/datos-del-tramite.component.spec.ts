import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let formBuilder: FormBuilder;

  const MOCK_INPUT_FIELDS = [
    { label: 'Campo 1', placeholder: 'Ingrese valor', required: true, controlName: 'campo1' },
    { label: 'Campo 2', placeholder: 'Ingrese valor', required: false, controlName: 'campo2' },
  ];

  const MOCK_CATALOGOS_ARRAY: Catalogo[][] = [
    [{ id: 1, descripcion: 'Opción 1' }, { id: 2, descripcion: 'Opción 2' }],
    [{ id: 3, descripcion: 'Opción 3' }, { id: 4, descripcion: 'Opción 4' }],
  ];

  const MOCK_SOLICITUD_OPCIONES = [
    { label: 'Opción A', value: 'A' },
    { label: 'Opción B', value: 'B' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDelTramiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Initialize the form
    component.form = formBuilder.group({
      campo1: ['', Validators.required],
      campo2: [''],
      solicitud: [''],
    });

    component.inputFields = MOCK_INPUT_FIELDS;
    component.catalogosArray = MOCK_CATALOGOS_ARRAY;
    component.solicitudOpciones = MOCK_SOLICITUD_OPCIONES;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería verificar si un control es inválido', () => {
    const CONTROL_NAME = 'campo1';
    const CONTROL = component.form.get(CONTROL_NAME);
    CONTROL?.markAsTouched();
    CONTROL?.setValue('');
    expect(component.esInvalido(CONTROL_NAME)).toBe(true);

    CONTROL?.setValue('Valor válido');
    expect(component.esInvalido(CONTROL_NAME)).toBe(false);
  });

  it('debería emitir el evento setValoresStoreEvent al llamar a setValoresStore', () => {
    jest.spyOn(component.setValoresStoreEvent, 'emit');
    const MOCK_CAMPO = 'campo1';
    component.setValoresStore(component.form, MOCK_CAMPO);

    expect(component.setValoresStoreEvent.emit).toHaveBeenCalledWith({
      form: component.form,
      campo: MOCK_CAMPO,
    });
  });

  it('debería inicializar correctamente los campos de entrada', () => {
    expect(component.inputFields).toEqual(MOCK_INPUT_FIELDS);
  });

  it('debería inicializar correctamente los catálogos', () => {
    expect(component.catalogosArray).toEqual(MOCK_CATALOGOS_ARRAY);
  });

  it('debería inicializar correctamente las opciones de solicitud', () => {
    expect(component.solicitudOpciones).toEqual(MOCK_SOLICITUD_OPCIONES);
  });

  it('debería devolver false si el control no existe en esInvalido', () => {
    expect(component.esInvalido('controlInexistente')).toBe(false);
  });
});