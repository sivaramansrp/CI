import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        SelectCatalogosComponent,
        CatalogoSelectComponent
      ],
      declarations: [PagoDeDerechoComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.FormSolicitud).toBeTruthy();
    expect(component.FormSolicitud.contains('datosImportadorExportador')).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.exentoDePago')).toBeTruthy();
  });

  it('should initialize Justificacion and Banco correctly', () => {
    component.getJustificacion();
    component.getBanco();
    expect(component.Justificacion).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' }
    ]);
    expect(component.Banco).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' }
    ]);
  });

  it('should update form fields based on exentoDePago value "No"', () => {
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('No');
    fixture.detectChanges();

    const rfcControl = component.FormSolicitud.get('datosImportadorExportador.rfcImportExport');
    const cadenaControl = component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia');
    const importeControl = component.FormSolicitud.get('datosImportadorExportador.importePago');
    const fechaPagoControl = component.FormSolicitud.get('datosImportadorExportador.fechaPago');
    const llavePagoControl = component.FormSolicitud.get('datosImportadorExportador.llaveDePago');
    
    expect(rfcControl?.value).toBe('454000554');
    expect(cadenaControl?.value).toBe('0001012A0000EX');
    expect(importeControl?.value).toBe('594.0');
    expect(fechaPagoControl?.enabled).toBe(true);
    expect(llavePagoControl?.enabled).toBe(true);
  });

  it('should update form fields based on exentoDePago value "Yes"', () => {
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('Si');
    fixture.detectChanges();

    const rfcControl = component.FormSolicitud.get('datosImportadorExportador.rfcImportExport');
    const cadenaControl = component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia');
    const importeControl = component.FormSolicitud.get('datosImportadorExportador.importePago');
    const fechaPagoControl = component.FormSolicitud.get('datosImportadorExportador.fechaPago');
    const llavePagoControl = component.FormSolicitud.get('datosImportadorExportador.llaveDePago');
    
    expect(rfcControl?.value).toBe(null);
    expect(cadenaControl?.value).toBe(null);
    expect(importeControl?.value).toBe(null);
    expect(fechaPagoControl?.disabled).toBe(true);
    expect(llavePagoControl?.disabled).toBe(true);
  });

  it('should call mercanciaSeleccion on form change', () => {
    spyOn(component, 'mercanciaSeleccion');
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('Si');
    fixture.detectChanges();
    expect(component.mercanciaSeleccion).toHaveBeenCalled();
  });

  it('should validate the form when required fields are missing', () => {
    const form = component.FormSolicitud;
    const exentoDePagoControl = form.get('datosImportadorExportador.exentoDePago');
    exentoDePagoControl?.setValue('');
    expect(exentoDePagoControl?.valid).toBeFalse();
    expect(exentoDePagoControl?.hasError('required')).toBeTrue();
  });

  it('should reset form fields when exentoDePago is changed to "Si"', () => {
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('No');
    fixture.detectChanges();
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('Si');
    fixture.detectChanges();

    const rfcControl = component.FormSolicitud.get('datosImportadorExportador.rfcImportExport');
    expect(rfcControl?.value).toBeNull();
  });

  it('should disable fields correctly in mercanciaSeleccion()', () => {
    component.mercanciaSeleccion();
    fixture.detectChanges();
    
    const rfcControl = component.FormSolicitud.get('datosImportadorExportador.rfcImportExport');
    expect(rfcControl?.disabled).toBe(true);
  });

  it('should reset fields when mercanciaSeleccion() is called with "No"', () => {
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('No');
    fixture.detectChanges();
    component.mercanciaSeleccion();
    fixture.detectChanges();

    const rfcControl = component.FormSolicitud.get('datosImportadorExportador.rfcImportExport');
    expect(rfcControl?.value).toBe('454000554');
  });

});

