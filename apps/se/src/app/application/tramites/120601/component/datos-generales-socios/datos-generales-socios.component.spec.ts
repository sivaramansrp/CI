import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DatosGeneralesSociosComponent } from './datos-generales-socios.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent, BtnContinuarComponent, InputRadioComponent, AlertComponent, TableComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { DATOS_GENERALES_SOCIOS, DATOS_GENERALES_EXTRANJEROS } from 'libs/shared/data-access-user/src/tramites/constantes/120601/datos-generales-socios-tabledata.enum';

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
    expect(component.formForTotalCount.get('recuentoTotalDeFilas')).toBeTruthy();
  });

  it('should initialize pasos correctly', () => {
    expect(component.pasos).toEqual(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
  });

  it('should initialize default table selection as CHECKBOX', () => {
    expect(component.tablecheckbox).toBe(TablaSeleccion.CHECKBOX);
  });

  it('should initialize total row count correctly', () => {
    expect(component.formForTotalCount.value.recuentoTotalDeFilas).toBe(component.datos_Socios.length);
  });
});
