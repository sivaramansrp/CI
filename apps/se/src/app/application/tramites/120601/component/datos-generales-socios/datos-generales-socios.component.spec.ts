import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesSociosComponent } from './datos-generales-socios.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosGeneralesSociosComponent', () => {
  let component: DatosGeneralesSociosComponent;
  let fixture: ComponentFixture<DatosGeneralesSociosComponent>;
  let storeMock: any;
  let queryMock: any;
  let empresaServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    storeMock = {
      setNacionalidad: jest.fn(),
      setPersona: jest.fn(),
      setCadenaDependencia: jest.fn()
    };
    queryMock = {
      selectNacionalidad$: of('MX'),
      selectPersona$: of('FISICA'),
      selectCadenaDependencia$: of('cadena')
    };
    empresaServiceMock = {
      obtenerDatosTablaDeSocios: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Socio 1' }]))
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosGeneralesSociosComponent],
      providers: [
        FormBuilder,
        { provide: Tramite120601Store, useValue: storeMock },
        { provide: Tramite120601Query, useValue: queryMock },
        { provide: DatosEmpresaService, useValue: empresaServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize FormSolicitud and formularioParaConteoTotal on ngOnInit', () => {
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')).toBeDefined();
    expect(component.formularioParaConteoTotal).toBeDefined();
  });

  it('should patch values from query observables', () => {
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.value).toBe('MX');
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.value).toBe('FISICA');
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe('cadena');
  });

  it('should get datosSocios from empresaService', () => {
    component.obtenerDatosTablaDeSocios();
    expect(empresaServiceMock.obtenerDatosTablaDeSocios).toHaveBeenCalled();
    expect(component.datosSocios).toEqual([{ id: 1, nombre: 'Socio 1' }]);
  });

  it('should call store.setNacionalidad on enCambioNacionalidad', () => {
    component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue('MX');
    component.enCambioNacionalidad();
    expect(storeMock.setNacionalidad).toHaveBeenCalledWith('MX');
  });

  it('should call store.setPersona on enCambioPersona', () => {
    component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue('FISICA');
    component.enCambioPersona();
    expect(storeMock.setPersona).toHaveBeenCalledWith('FISICA');
  });

  it('should call store.setCadenaDependencia on enCambioCadenaDependencia', () => {
    component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('cadena');
    component.enCambioCadenaDependencia();
    expect(storeMock.setCadenaDependencia).toHaveBeenCalledWith('cadena');
  });

  it('should disable fields if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disabled).toBe(true);
  });

  it('should enable fields if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.enabled).toBe(true);
  });

  it('should disable FormSolicitud if esFormularioSoloLectura is true in actualizarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.actualizarEstadoFormulario();
    expect(component.FormSolicitud.disabled).toBe(true);
  });

  it('should enable FormSolicitud if esFormularioSoloLectura is false in actualizarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.actualizarEstadoFormulario();
    expect(component.FormSolicitud.enabled).toBe(true);
  });

  it('should not throw if FormSolicitud is undefined in actualizarEstadoFormulario', () => {
    component.FormSolicitud = undefined as any;
    expect(() => component.actualizarEstadoFormulario()).not.toThrow();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});