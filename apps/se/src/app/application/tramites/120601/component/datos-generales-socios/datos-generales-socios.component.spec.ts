import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesSociosComponent } from './datos-generales-socios.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AlertComponent, BtnContinuarComponent, InputRadioComponent, TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

describe('DatosGeneralesSociosComponent', () => {
  let component: DatosGeneralesSociosComponent;
  let fixture: ComponentFixture<DatosGeneralesSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        BtnContinuarComponent,
        InputRadioComponent,
        AlertComponent,
        TableComponent,
        TablaDinamicaComponent
      ],
      declarations: [DatosGeneralesSociosComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls correctly', () => {
    expect(component.FormSolicitud.get('datosImportadorExportador')).toBeTruthy();
    expect(component.FormSolicitud.get('recuentoTotalDeFilas')).toBeTruthy();
  });

  it('should initialize pasos correctly', () => {
    expect(component.pasos).toEqual(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
  });

  it('should initialize default table selection as CHECKBOX', () => {
    expect(component.tablaCasilla).toBe(TablaSeleccion.CHECKBOX);
  });

  it('should initialize total row count correctly', () => {
    expect(component.FormSolicitud.value.recuentoTotalDeFilas).toBe(component.datosSocios.length);
  });
});
