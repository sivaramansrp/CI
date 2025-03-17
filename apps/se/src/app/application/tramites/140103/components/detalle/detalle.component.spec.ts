import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TituloComponent,
        TablaDinamicaComponent,
        CatalogoSelectComponent,
        FormsModule,
        ReactiveFormsModule,
        DetalleComponent
      ],
      declarations: [],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group on ngOnInit', () => {
    component.ngOnInit();

    expect(component.DetalleForm).toBeTruthy();
    expect(component.DetalleForm instanceof FormGroup).toBe(true); // Jest matcher
    expect(component.DetalleForm.get('DetalleData')).toBeTruthy();
    expect(component.DetalleForm.get('DetalleData.regimen')).toBeTruthy();
  });

  it('should disable the form after getFormData is called', () => {
    component.getFormData();
    expect(component.DetalleForm.disabled).toBe(true); // Corrected to use toBe(true) for Jest
  });

  it('should set the correct values for the form fields after getFormData is called', () => {
    component.getFormData();

    const FORM_VALUE = component.DetalleForm.value;

    expect(FORM_VALUE.DetalleData.regimen).toBe('EXPORTACION');
    expect(FORM_VALUE.DetalleData.descripcion).toBe('TELAS Y BIENES TEXTILES SIMPLE');
    expect(FORM_VALUE.DetalleData.unidad).toBe('Kilogramo');
    expect(FORM_VALUE.DetalleData.mecanismo).toBe('Primero en tiempo primero en dere');
    expect(FORM_VALUE.DetalleData.tratado).toBe('Tratado entre México, Estados Unid');
    expect(FORM_VALUE.DetalleData.fracciones).toBe('6302530020, 6103230055, 6103432015, 6302100020, 6201407511');
    expect(FORM_VALUE.DetalleData.paises).toBe('ESTADOS UNIDOS DE AMERICA');
    expect(FORM_VALUE.DetalleData.observaciones).toBe('observaciones');
    expect(FORM_VALUE.DetalleData.fundamentos).toBe('fundamento de la vigencia del upo');
    expect(FORM_VALUE.DetalleData.inicio).toBe('2024-01-01');
    expect(FORM_VALUE.DetalleData.fecha).toBe('2024-12-31');
  });

  it('should set the correct form values using setValue()', () => {
    const REGIMEN_CONTROL = component.DetalleForm.get('DetalleData.regimen');
    REGIMEN_CONTROL?.setValue('IMPORTACION');
    expect(REGIMEN_CONTROL?.value).toBe('IMPORTACION');
  });

  it('should keep the form disabled after calling getFormData', () => {
    component.getFormData();
    const REGIMEN_CONTROL = component.DetalleForm.get('DetalleData.regimen');
    expect(REGIMEN_CONTROL?.disabled).toBe(true); // Corrected to use toBe(true) for Jest
  });

});
