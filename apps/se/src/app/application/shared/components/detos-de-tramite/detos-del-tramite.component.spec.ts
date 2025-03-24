import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetosDelTramiteComponent } from './detos-del-tramite.component';
import { EventEmitter } from '@angular/core';
import { ProductoOption } from '../../constantes/vehiculos-adaptados.enum';
import { Catalogo } from '@ng-mf/data-access-user';

describe('DetosDelTramiteComponent', () => {
  let component: DetosDelTramiteComponent;
  let fixture: ComponentFixture<DetosDelTramiteComponent>;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosDelTramiteComponent, ReactiveFormsModule], 
    }).compileComponents();
  
    fixture = TestBed.createComponent(DetosDelTramiteComponent);
    component = fixture.componentInstance;
    component.form = new FormBuilder().group({
      regimen: ['', Validators.required],
      solicitud: ['', Validators.required], 
      controlName: ['', Validators.required], 
      classification:['',Validators.required]
    });
  
    component.inputFields = [
      { label: 'Field 1', placeholder: 'Enter value', required: true ,controlName: 'regimen'},
      { label: 'Field 2', placeholder: 'Enter value', required: false ,controlName: 'classification'},
    ];
    component.catalogosArray = [
      [{ id: 1 }, { id: 2 }],
      [{ id: 3 }, { id: 4 }],
    ] as Catalogo[][];
    component.solicitudeOptions = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ] as ProductoOption[];
  
    fixture.detectChanges();
  });
  
  

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe devolver verdadero si el control de formulario no es válido', () => {
    component.form.controls['controlName'].setValue('');
    component.form.controls['controlName'].markAsTouched();
  
    const isInvalid = component.esInvalido('controlName');
    expect(isInvalid).toBe(true);
  });
  
  it('Debe emitir setValoresStoreEvent con datos correctos', () => {
    const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit'); 
  
    const testForm = formBuilder.group({
      testControl: ['', Validators.required],
    });
    const testCampo = 'testCampo';
    const testMetodoNombre = 'testMetodoNombre';
  
    component.setValoresStore(testForm, testCampo, testMetodoNombre);
  
    expect(emitSpy).toHaveBeenCalledWith({
      form: testForm,
      campo: testCampo,
      metodoNombre: testMetodoNombre,
    });
  });
  
});
