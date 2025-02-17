
import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnContinuarComponent } from "../../../../shared/components/btn-continuar/btn-continuar.component";
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { DatosDeLosResiduosComponent } from './datos-de-los-residuos.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import FraccionArancelariaParametros from '../../../../../assets/json/231001/comboFraccionArancelariaParametros.json';
import PartidaFraccion from '../../../../../assets/json/231001/comboPartidaFraccion.json';
import SubPartidaFraccion from '../../../../../assets/json/231001/comboSubPartidaFraccion.json';
import UnidadMedida from '../../../../../assets/json/231001/comboUnidadMedida.json';

describe('DatosDeLosResiduosComponent', () => {
  let component: DatosDeLosResiduosComponent;
  let fixture: ComponentFixture<DatosDeLosResiduosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeLosResiduosComponent],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BtnContinuarComponent,
        CatalogoSelectComponent,
        TituloComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLosResiduosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.materiaPrimaForm).toBeDefined();
    expect(component.materiaPrimaForm.get('descUnidadMedida')?.value).toBe('');
    expect(component.materiaPrimaForm.get('descFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('generica1')?.value).toBe('');
    expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');
    expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('');
    expect(component.materiaPrimaForm.get('descripcionMercancia')?.value).toBe('');
    expect(component.materiaPrimaForm.get('generica2')?.value).toBe('');
    expect(component.materiaPrimaForm.get('cantidadEnLetra')?.value).toBe('');
    expect(component.materiaPrimaForm.get('unidadMedidaComercial.clave')?.value).toBe('');
    expect(component.materiaPrimaForm.get('capituloFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('partidaFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('subPartidaFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('fraccion')?.value).toBe('');
  });

  it('should load comboPartidaFraccion', () => {
    component.loadComboPartidaFraccion();
    expect(component.comboPartidaFraccion).toEqual(PartidaFraccion);
  });

  it('should load comboSubPartidaFraccion', () => {
    component.loadComboSubPartidaFraccion();
    expect(component.comboSubPartidaFraccion).toEqual(SubPartidaFraccion);
  });

  it('should load comboFraccion', () => {
    component.loadComboFraccion();
    expect(component.comboFraccionArancelariaParametros).toEqual(FraccionArancelariaParametros);
  });

  it('should set cantidadEnLetra to UNO when cantidad is 1', () => {
    component.obtenerLetraCantidad('1');
    expect(component.materiaPrimaForm.get('cantidadEnLetra')?.value).toBe('UNO');
  });

  it('should set cantidadEnLetra to empty when cantidad is not 1', () => {
    component.obtenerLetraCantidad('2');
    expect(component.materiaPrimaForm.get('cantidadEnLetra')?.value).toBe('');
  });

  it('should reset form fields and load comboPartidaFraccion on cambiaCapituloFraccion', () => {
    component.cambiaCapituloFraccion();
    expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('');
    expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('');
    expect(component.materiaPrimaForm.get('descFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('generica1')?.value).toBe('');
    expect(component.comboPartidaFraccion).toEqual(PartidaFraccion);
  });

  it('should reset form fields and load comboSubPartidaFraccion on cambiaPartidaFraccion', () => {
    component.materiaPrimaForm.get('partidaFraccion')?.setValue('some value');
    component.cambiaPartidaFraccion();
    expect(component.materiaPrimaForm.get('clavePartida')?.value).toBe('some value');
    expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('');
    expect(component.materiaPrimaForm.get('descFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('generica1')?.value).toBe('');
    expect(component.comboSubPartidaFraccion).toEqual(SubPartidaFraccion);
  });

  it('should reset form fields and load comboFraccion on cambiaSubPartidaFraccion', () => {
    component.materiaPrimaForm.get('subPartidaFraccion')?.setValue('some value');
    component.cambiaSubPartidaFraccion();
    expect(component.materiaPrimaForm.get('claveSubPartida')?.value).toBe('some value');
    expect(component.materiaPrimaForm.get('descFraccion')?.value).toBe('');
    expect(component.materiaPrimaForm.get('generica1')?.value).toBe('');
    expect(component.comboFraccionArancelariaParametros).toEqual(FraccionArancelariaParametros);
  });

  it('should update form fields on cambiaFraccion', () => {
    component.comboFraccionArancelariaParametros = FraccionArancelariaParametros;
    component.materiaPrimaForm.get('fraccion')?.setValue(FraccionArancelariaParametros[0].id);
    component.cambiaFraccion();
    expect(component.materiaPrimaForm.get('descFraccion')?.value).toBe(FraccionArancelariaParametros[0].descripcion);
    expect(component.materiaPrimaForm.get('generica1')?.value).toBe(FraccionArancelariaParametros[0].id);
  });

  it('should update descUnidadMedida on cambiaUnidadMedida', () => {
    component.comboUnidadMedida = UnidadMedida;
    component.materiaPrimaForm.get('unidadMedidaComercial.clave')?.setValue(UnidadMedida[0].id);
    component.cambiaUnidadMedida();
    expect(component.materiaPrimaForm.get('descUnidadMedida')?.value).toBe(UnidadMedida[0].descripcion);
  });

  it('should reset fraccion field if clvFracion is not valid on validaVigenciaFraccion', () => {
    component.validaVigenciaFraccion(0);
    expect(component.materiaPrimaForm.get('fraccion')?.value).toBe('');
  });
});