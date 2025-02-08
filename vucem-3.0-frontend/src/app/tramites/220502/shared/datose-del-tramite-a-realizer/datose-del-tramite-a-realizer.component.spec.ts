/* eslint-disable sort-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatoseDelTramiteARealizerComponent } from './datose-del-tramite-a-realizer.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';

describe('DatoseDelTramiteARealizerComponent', () => {
  let component: DatoseDelTramiteARealizerComponent;
  let fixture: ComponentFixture<DatoseDelTramiteARealizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoseDelTramiteARealizerComponent, TituloComponent, SelectCatalogosComponent, InputFechaComponent ],
      imports: [ ReactiveFormsModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoseDelTramiteARealizerComponent);
    component = fixture.componentInstance;
    (component.grupoformulariopadre as FormGroup) = new FormGroup({});
    component.claveDeControl = 'testControl';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('certificadosAutorizados')).toBeTruthy();
    expect(formGroup.get('horaDeInspeccion')).toBeTruthy();
    expect(formGroup.get('aduanaDeIngreso')).toBeTruthy();
    expect(formGroup.get('sanidadAgropecuaria')).toBeTruthy();
    expect(formGroup.get('puntoDeInspeccion')).toBeTruthy();
  });

  it('should handle certificadosSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Certificado 1' };
    component.certificadosSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('certificadosAutorizados').value).toBe('Certificado 1');
  });

  it('should handle horaDeSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Hora 1' };
    component.horaDeSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('horaDeInspeccion').value).toBe('Hora 1');
  });

  it('should handle aduanaDeSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Aduana 1' };
    component.aduanaDeSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('aduanaDeIngreso').value).toBe('Aduana 1');
  });

  it('should handle sanidadSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Sanidad 1' };
    component.sanidadSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('sanidadAgropecuaria').value).toBe('Sanidad 1');
  });

  it('should handle puntoDeSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Punto 1' };
    component.puntoDeSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('puntoDeInspeccion').value).toBe('Punto 1');
  });
});