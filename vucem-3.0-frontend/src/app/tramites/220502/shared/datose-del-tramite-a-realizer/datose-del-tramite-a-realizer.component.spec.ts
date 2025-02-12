import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { ComponentFixture } from '@angular/core/testing';
import { DatoseDelTramiteARealizerComponent } from './datose-del-tramite-a-realizer.component';
import { FormGroup } from '@angular/forms';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('DatoseDelTramiteARealizerComponent', () => {
  let component: DatoseDelTramiteARealizerComponent;
  let fixture: ComponentFixture<DatoseDelTramiteARealizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoseDelTramiteARealizerComponent, TituloComponent, CatalogoSelectComponent, InputFechaComponent ],
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
    const catalogo = { id: 1, descripcion: 'Certificado de Exportación', tam: 'A4', dpi: '1234567890' };
    component.certificadosSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('certificadosAutorizados').value).toBe('Certificado de Exportación');
  });

  it('should handle horaDeSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: '08:00 AM - 10:00 AM', tam: '2 horas', dpi: 'INS001' };
    component.horaDeSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('horaDeInspeccion').value).toBe('08:00 AM - 10:00 AM');
  });

  it('should handle aduanaDeSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Aduana La Aurora', tam: 'Zona 13', dpi: 'ADU001' };
    component.aduanaDeSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('aduanaDeIngreso').value).toBe('Aduana La Aurora');
  });

  it('should handle sanidadSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Oficina Central de Sanidad', tam: 'Ciudad Capital', dpi: 'SAN001' };
    component.sanidadSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('sanidadAgropecuaria').value).toBe('Oficina Central de Sanidad');
  });

  it('should handle puntoDeSeleccion correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Punto de Inspección Aérea', tam: 'Terminal de Carga', dpi: 'PIN001' };
    component.puntoDeSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('puntoDeInspeccion').value).toBe('Punto de Inspección Aérea');
  });
});