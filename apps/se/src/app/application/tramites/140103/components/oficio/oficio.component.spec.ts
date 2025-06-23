import { BtnContinuarComponent, TituloComponent, DatosPasos, ListaPasosWizard, ConsultaioQuery } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetalleComponent } from '../detalle/detalle.component';
import { OficioComponent } from './oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OficioComponent', () => {
  let component: OficioComponent;
  let fixture: ComponentFixture<OficioComponent>;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    // Mock observable stream for selectConsultaioState$
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [OficioComponent, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize oficioForm with oficioData group and controls', () => {
    expect(component.oficioForm.contains('oficioData')).toBe(true);
    const oficioData = component.oficioForm.get('oficioData');
    expect(oficioData).toBeTruthy();
    ['asignado', 'monto', 'cancelar'].forEach(field => {
      expect(oficioData?.get(field)).toBeTruthy();
    });
  });

  it('should set default values and disable fields in updateformfied', () => {
    component.updateformfied();
    const oficioData = component.oficioForm.get('oficioData');
    expect(oficioData?.get('asignado')?.disabled).toBe(true);
    expect(oficioData?.get('monto')?.disabled).toBe(true);
    expect(oficioData?.get('asignado')?.value).toBe('2500');
    expect(oficioData?.get('monto')?.value).toBe('-3991');
    expect(oficioData?.get('cancelar')?.value).toBe('12');
  });

  it('should disable the form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.oficioForm.enable();
    component.guardarDatosFormulario();
    expect(component.oficioForm.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.oficioForm.disable();
    component.guardarDatosFormulario();
    expect(component.oficioForm.enabled).toBe(true);
  });

  it('should call guardarDatosFormulario if oficioForm exists and esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should filter oficio data where unidadPrimaria === 12', () => {
    expect(Array.isArray(component.filteredData)).toBe(true);
    expect(component.filteredData.every(item => item.unidadPrimaria === 12)).toBe(true);
  });
});

