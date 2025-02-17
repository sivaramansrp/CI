import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { DetosDelMarcanciaComponent } from './datos-de-la-mercacia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import fractionValues from '../../../../../assets/json/130102/fraccion_arancelaria.json';
import productoOptions from '../../../../../assets/json/130102/producto-otions.json';
import unidadOptions from '../../../../../assets/json/130102/unidad_da.json';

describe('DetosDelMarcanciaComponent', () => {
  let component: DetosDelMarcanciaComponent;
  let fixture: ComponentFixture<DetosDelMarcanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,
        DetosDelMarcanciaComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent,
      ],
      declarations: [
     
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetosDelMarcanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.formDelLa).toBeDefined();
    expect(component.formDelLa.controls['descripcion'].value).toBe('');
    expect(component.formDelLa.controls['fraccion'].value).toBe('');
    expect(component.formDelLa.controls['unidadMedida'].value).toBe('');
    expect(component.formDelLa.controls['cantidad'].value).toBe('');
    expect(component.formDelLa.controls['valorFacturaUSD'].value).toBe('');
  });

  it('should fetch product options on initialization', () => {
    expect(component.producto).toEqual(productoOptions.options);
    expect(component.defaultSelect).toBe(productoOptions.defaultSelect);
  });

  it('should update selectedValue when onValueChange is called', () => {
    component.onValueChange('TestValue');
    expect(component.selectedValue).toBe('TestValue');
  });

  it('should validate form fields correctly', () => {
    component.formDelLa.controls['descripcion'].setValue('Producto de prueba');
    component.formDelLa.controls['fraccion'].setValue('12345');
    component.formDelLa.controls['unidadMedida'].setValue('kg');
    component.formDelLa.controls['cantidad'].setValue(10);
    component.formDelLa.controls['valorFacturaUSD'].setValue(100.5);
    expect(component.formDelLa.valid).toBeTrue();
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.formDelLa.controls['descripcion'].setValue('');
    component.formDelLa.controls['fraccion'].setValue('');
    component.formDelLa.controls['unidadMedida'].setValue('');
    component.formDelLa.controls['cantidad'].setValue('');
    component.formDelLa.controls['valorFacturaUSD'].setValue('');
    expect(component.formDelLa.valid).toBeFalse();
  });

  it('should fetch fraccion and update selectedValue', () => {
    component.fetchFraccion();
    expect(component.selectedValue).toBe('Nuevo');
  });

  it('should fetch unidad and update selectedValue', () => {
    component.fetchUnidad();
    expect(component.selectedValue).toBe('Nuevo');
  });
});
