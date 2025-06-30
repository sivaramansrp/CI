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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar FormSolicitud y formularioParaConteoTotal en ngOnInit', () => {
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')).toBeDefined();
    expect(component.formularioParaConteoTotal).toBeDefined();
  });

  it('debe actualizar los valores desde los observables del query', () => {
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.value).toBe('MX');
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.value).toBe('FISICA');
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe('cadena');
  });

  it('debe obtener datosSocios desde empresaService', () => {
    component.obtenerDatosTablaDeSocios();
    expect(empresaServiceMock.obtenerDatosTablaDeSocios).toHaveBeenCalled();
    expect(component.datosSocios).toEqual([{ id: 1, nombre: 'Socio 1' }]);
  });

  it('debe llamar a store.setNacionalidad en enCambioNacionalidad', () => {
    component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue('MX');
    component.enCambioNacionalidad();
    expect(storeMock.setNacionalidad).toHaveBeenCalledWith('MX');
  });

  it('debe llamar a store.setPersona en enCambioPersona', () => {
    component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue('FISICA');
    component.enCambioPersona();
    expect(storeMock.setPersona).toHaveBeenCalledWith('FISICA');
  });

  it('debe llamar a store.setCadenaDependencia en enCambioCadenaDependencia', () => {
    component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('cadena');
    component.enCambioCadenaDependencia();
    expect(storeMock.setCadenaDependencia).toHaveBeenCalledWith('cadena');
  });

  it('debe deshabilitar los campos si esFormularioSoloLectura es true en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disabled).toBe(true);
  });

  it('debe habilitar los campos si esFormularioSoloLectura es false en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.enabled).toBe(true);
  });

  it('debe deshabilitar FormSolicitud si esFormularioSoloLectura es true en actualizarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.actualizarEstadoFormulario();
    expect(component.FormSolicitud.disabled).toBe(true);
  });

  it('debe habilitar FormSolicitud si esFormularioSoloLectura es false en actualizarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.actualizarEstadoFormulario();
    expect(component.FormSolicitud.enabled).toBe(true);
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});