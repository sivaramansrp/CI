import { By } from '@angular/platform-browser';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { DatosDelTramiteARealizarComponent } from './datos-del-tramite-a-realizar.component';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-test-host',
  template: `<form [formGroup]="form">
               <app-datos-del-tramite-a-realizar [claveDeControl]="'testControl'" [grupoFormularioPadre]="form"></app-datos-del-tramite-a-realizar>
             </form>`
})
class TestHostComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      testControl: new FormGroup({
        certificadosAutorizados: new FormControl(null, Validators.required),
        horaDeInspeccion: new FormControl(null, Validators.required),
        aduanaDeIngreso: new FormControl(null),
        sanidadAgropecuaria: new FormControl(null),
        puntoDeInspeccion: new FormControl(null),
        fechaDeInspeccion: new FormControl(null)
      })
    });
  }
}

describe('DatosDelTramiteARealizarComponent', () => {
  let component: DatosDelTramiteARealizarComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ReactiveFormsModule, DatosDelTramiteARealizarComponent, TituloComponent, CatalogoSelectComponent, InputFechaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.children[0].componentInstance;
    component = fixture.debugElement.query(By.directive(DatosDelTramiteARealizarComponent))?.componentInstance;
  
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    const FORMGROUP = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(FORMGROUP).toBeTruthy();
    expect(FORMGROUP.get('certificadosAutorizados')).toBeTruthy();
    expect(FORMGROUP.get('horaDeInspeccion')).toBeTruthy();
    expect(FORMGROUP.get('aduanaDeIngreso')).toBeTruthy();
    expect(FORMGROUP.get('sanidadAgropecuaria')).toBeTruthy();
    expect(FORMGROUP.get('puntoDeInspeccion')).toBeTruthy();
    expect(FORMGROUP.get('fechaDeInspeccion')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre.contains(component.claveDeControl)).toBe(true);
    component.ngOnDestroy();
    expect(component.grupoFormularioPadre.contains(component.claveDeControl)).toBe(false);
  });

  it('should handle certificadosSeleccion correctly', () => {
    component.ngOnInit();
    const CATALOGO: Catalogo = { id: 1, descripcion: 'Certificado de Exportación', tam: 'A4', dpi: '1234567890' };
    component.certificadosSeleccion(CATALOGO);
    const FORMGROUP = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(FORMGROUP.get('certificadosAutorizados')?.value).toBe('Certificado de Exportación');
  });

  it('should handle horaDeSeleccion correctly', () => {
    component.ngOnInit();
    const CATALOGO: Catalogo = { id: 1, descripcion: '08:00 AM - 10:00 AM', tam: '2 horas', dpi: 'INS001' };
    component.horaDeSeleccion(CATALOGO);
    const FORMGROUP = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(FORMGROUP.get('horaDeInspeccion')?.value).toBe('08:00 AM - 10:00 AM');
  });

  it('should handle aduanaDeSeleccion correctly', () => {
    component.ngOnInit();
    const CATALOGO: Catalogo = { id: 1, descripcion: 'Aduana La Aurora', tam: 'Zona 13', dpi: 'ADU001' };
    component.aduanaDeSeleccion(CATALOGO);
    const FORMGROUP = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(FORMGROUP.get('aduanaDeIngreso')?.value).toBe('Aduana La Aurora');
  });

  it('should handle sanidadSeleccion correctly', () => {
    component.ngOnInit();
    const CATALOGO: Catalogo = { id: 1, descripcion: 'Oficina Central de Sanidad', tam: 'Ciudad Capital', dpi: 'SAN001' };
    component.sanidadSeleccion(CATALOGO);
    const FORMGROUP = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(FORMGROUP.get('sanidadAgropecuaria')?.value).toBe('Oficina Central de Sanidad');
  });

  it('should handle puntoDeSeleccion correctly', () => {
    component.ngOnInit();
    const CATALOGO: Catalogo = { id: 1, descripcion: 'Punto de Inspección Aérea', tam: 'Terminal de Carga', dpi: 'PIN001' };
    component.puntoDeSeleccion(CATALOGO);
    const FORMGROUP = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(FORMGROUP.get('puntoDeInspeccion')?.value).toBe('Punto de Inspección Aérea');
  });

  it('should load initial catalog data correctly', () => {
    component.cargarDatosIniciales();
    expect(component.certificadosAutorizados.catalogos.length).toBeGreaterThan(0);
    expect(component.horaDeInspeccion.catalogos.length).toBeGreaterThan(0);
    expect(component.aduanaDeIngreso.catalogos.length).toBeGreaterThan(0);
  });
});
