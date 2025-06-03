import { BtnContinuarComponent, TituloComponent, DatosPasos, ListaPasosWizard, ConsultaioQuery } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from '../detalle/detalle.component';
import { OficioComponent } from './oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';


describe('OficioComponent', () => {
  let component: OficioComponent;
  let fixture: ComponentFixture<OficioComponent>;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    // Mock observable stream for selectConsultaioState$
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: true })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,CommonModule, HttpClientTestingModule, OficioComponent, BtnContinuarComponent, TituloComponent, TablaDinamicaComponent, DetalleComponent],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
    }).compileComponents();
  });

    beforeEach(() => {
    fixture = TestBed.createComponent(OficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.OficioForm).toBeDefined();
  });

  it('should initialize the form with default values', () => {
    const ASSIGNED_CONTROL = component.OficioForm.get('oficioData.asignado');
    const AMOUNT_CONTROL = component.OficioForm.get('oficioData.monto');
    const CANCEL_CONTROL = component.OficioForm.get('oficioData.cancelar');
    
    expect(ASSIGNED_CONTROL?.value).toBe('2500');
    expect(AMOUNT_CONTROL?.value).toBe('-3991');
    expect(CANCEL_CONTROL?.value).toBe('12');
    expect(ASSIGNED_CONTROL?.disabled).toBe(true);
    expect(AMOUNT_CONTROL?.disabled).toBe(true);
  });

 it('should call updateformfied and disable fields correctly', () => {
    component.updateformfied();
    expect(component.OficioForm.get('oficioData.asignado')?.disabled).toBe(true);
    expect(component.OficioForm.get('oficioData.monto')?.disabled).toBe(true);
    expect(component.OficioForm.get('oficioData.cancelar')?.value).toBe('12');
  });

  it('should filter data correctly by unidadPrimaria', () => {
    const FILTERED_DATA = component.filteredData;
    expect(FILTERED_DATA.length).toBeGreaterThan(0);
    expect(FILTERED_DATA.every(item => item.unidadPrimaria === 12)).toBe(true);
  });

  it('should update form fields and disable them in updateformfied()', () => {
    component.updateformfied();

    const ASSIGNED_CONTROL = component.OficioForm.get('oficioData.asignado');
    const AMOUNT_CONTROL = component.OficioForm.get('oficioData.monto');
    const CANCEL_CONTROL = component.OficioForm.get('oficioData.cancelar');

    expect(ASSIGNED_CONTROL?.value).toBe('2500');
    expect(AMOUNT_CONTROL?.value).toBe('-3991');
    expect(CANCEL_CONTROL?.value).toBe('12');
    expect(ASSIGNED_CONTROL?.disabled).toBe(true);
    expect(AMOUNT_CONTROL?.disabled).toBe(true);
  });

  it('should configure table columns correctly', () => {
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
    expect(component.configuracionTabla[0].encabezado).toBe('Folio del oficio de certificado');
    expect(component.configuracionTabla[0].clave).toBeDefined();
  });

  it('should have oficio defined and be an array', () => {
  expect(component.oficio).toBeDefined();
  expect(Array.isArray(component.oficio)).toBe(true);
  expect(component.oficio.length).toBeGreaterThan(0);
});

it('should disable the form when esFormularioSoloLectura is true', () => {
  component.esFormularioSoloLectura = true;
  component.OficioForm.enable();
  component.guardarDatosFormulario();
  expect(component.OficioForm.disabled).toBe(true);
});

it('should enable the form when esFormularioSoloLectura is false', () => {
  component.esFormularioSoloLectura = false;
  component.OficioForm.disable();
  component.guardarDatosFormulario();
  expect(component.OficioForm.enabled).toBe(true);
});

it('should not throw if OficioForm is undefined', () => {
  (component as any).OficioForm = undefined;
  component.esFormularioSoloLectura = false;
  expect(() => component.guardarDatosFormulario()).not.toThrow();
});

it('should call guardarDatosFormulario from inicializarEstadoFormulario when readonly', () => {
    spyOn(component, 'guardarDatosFormulario');
    component.OficioForm = component.fb.group({ test: [''] });
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should not call guardarDatosFormulario when OficioForm is null in inicializarEstadoFormulario', () => {
    spyOn(component, 'guardarDatosFormulario');
    (component as any).OficioForm = null;
    component.esFormularioSoloLectura = true;
    expect(() => component.inicializarEstadoFormulario()).not.toThrow();
    expect(component.guardarDatosFormulario).not.toHaveBeenCalled();
  });

   it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifier$ = (component as any).destroyNotifier$ as Subject<void>;
    const completeSpy = spyOn(destroyNotifier$, 'complete').and.callThrough();
    const nextSpy = spyOn(destroyNotifier$, 'next').and.callThrough();

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

