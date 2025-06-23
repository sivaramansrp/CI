import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [DetalleComponent, ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the form and set default values in getFormData', () => {
    component.getFormData();
    expect(component.detalleForm.disabled).toBe(true);
    const detalleData = component.detalleForm.get('DetalleData');
    expect(detalleData?.get('regimen')?.value).toBe('EXPORTACION');
    expect(detalleData?.get('descripcion')?.value).toBe('TELAS Y BIENES TEXTILES SIMPLE');
    expect(detalleData?.get('unidad')?.value).toBe('Kilogramo');
    expect(detalleData?.get('mecanismo')?.value).toBe('Primero en tiempo primero en dere');
    expect(detalleData?.get('tratado')?.value).toBe('Tratado entre México, Estados Unid');
    expect(detalleData?.get('fracciones')?.value).toBe('6302530020, 6103230055, 6103432015, 6302100020, 6201407511');
    expect(detalleData?.get('paises')?.value).toBe('ESTADOS UNIDOS DE AMERICA');
    expect(detalleData?.get('observaciones')?.value).toBe('observaciones');
    expect(detalleData?.get('fundamentos')?.value).toBe('Fundamento de la vigencia del UPO');
    expect(detalleData?.get('inicio')?.value).toBe('2024-01-01');
    expect(detalleData?.get('fecha')?.value).toBe('2024-12-31');
  });

  it('should disable the form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.detalleForm.enable();
    component.guardarDatosFormulario();
    expect(component.detalleForm.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.detalleForm.disable();
    component.guardarDatosFormulario();
    expect(component.detalleForm.enabled).toBe(true);
  });

  it('should call guardarDatosFormulario if detalleForm exists and esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
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
});
