import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
 
describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,TercerosRelacionadosComponent],
      providers: [FormBuilder],
    }).compileComponents();
 
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should initialize agregarFabricanteFormGroup correctly', () => {
    component.initializeAgregarFabricanteFormGroup();
 
    const formGroup = component.agregarFabricanteFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('rfc')?.disabled).toBeTruthy();
    expect(formGroup.get('curp')?.disabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
    expect(formGroup.get('tercerosNacionalidad')?.value).toBe('');
    expect(formGroup.get('pais')?.validator).toBeDefined();
  });
 
  it('should enable specific fields in agregarFabricanteFormGroup when tipoPersona value changes', () => {
    component.initializeAgregarFabricanteFormGroup();
 
    const formGroup = component.agregarFabricanteFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
    fixture.detectChanges();
 
    expect(formGroup.get('rfc')?.enabled).toBeTruthy();
    expect(formGroup.get('curp')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
  });
 
  it('should initialize agregarDestinatarioFormGroup correctly', () => {
    component.initializeAgregarDestinatarioFormGroup();
 
    const formGroup = component.agregarDestinatarioFormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('rfc')?.disabled).toBeTruthy();
    expect(formGroup.get('curp')?.disabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
    expect(formGroup.get('tipoPersona')?.value).toBe('');
  });
 
  it('should enable specific fields in agregarDestinatarioFormGroup when tipoPersona value changes', () => {
    component.initializeAgregarDestinatarioFormGroup();
 
    const formGroup = component.agregarDestinatarioFormGroup;
    formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
    fixture.detectChanges();
 
    expect(formGroup.get('rfc')?.enabled).toBeTruthy();
    expect(formGroup.get('curp')?.enabled).toBeTruthy();
    expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
  });
});