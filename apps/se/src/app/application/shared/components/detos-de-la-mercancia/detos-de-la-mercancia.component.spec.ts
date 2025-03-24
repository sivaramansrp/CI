import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DetosDeLaMercanciaComponent } from './detos-de-la-mercancia.component';
import { ProductoOption } from '../../constantes/vehiculos-adaptados.enum';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('DetosDeLaMercanciaComponent', () => {
  let component: DetosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DetosDeLaMercanciaComponent>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosDeLaMercanciaComponent, ReactiveFormsModule], 
    }).compileComponents();
  
    fixture = TestBed.createComponent(DetosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  
    component.form = formBuilder.group({
      producto: ['', Validators.required], 
      controlName: ['', Validators.required], 
      descripcion: ['', Validators.required],
      fraccion: ['', Validators.required], 
      cantidad: ['', Validators.required], 
      valorFacturaUSD: ['', Validators.required], 
      unidadMedida: ['', Validators.required], 
    });
  
    component.productoOptions = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
  
    component.fraccionCatalog = [{ id: 1, descripcion: 'Fracción 1' }];
    component.unidadCatalog = [{ id: 2, descripcion: 'Unidad 1' }];
  
    fixture.detectChanges();
  });
  
  
  

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe devolver verdadero si el control no es válido', () => {
    component.form.controls['controlName'].setValue(''); // Set control to invalid state
    component.form.controls['controlName'].markAsTouched();

    const isInvalid = component.esInvalido('controlName');
    expect(isInvalid).toBe(true);
  });

  it('Debe emitir un evento con datos correctos en setValoresStore', () => {
    const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit');

    const testForm = formBuilder.group({
      controlName: ['', Validators.required],
    });
    const campo = 'testCampo';
    const metodoNombre = 'testMetodoNombre';

    component.setValoresStore(testForm, campo, metodoNombre);

    expect(emitSpy).toHaveBeenCalledWith({
      form: testForm,
      campo,
      metodoNombre,
    });
  });
});
