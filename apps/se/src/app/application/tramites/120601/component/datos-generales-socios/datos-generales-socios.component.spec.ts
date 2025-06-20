import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosGeneralesSociosComponent } from './datos-generales-socios.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@ng-mf/data-access-user';
import { DatosSociosTable } from '../../modelos/datos-empresa.model';
import { ComponentFixture } from '@angular/core/testing';

describe('DatosGeneralesSociosComponent', () => {
  let component: DatosGeneralesSociosComponent;
  let fixture: ComponentFixture<DatosGeneralesSociosComponent>;
  let mockDatosEmpresaService: jest.Mocked<DatosEmpresaService>;
  let mockTramite120601Query: Partial<Tramite120601Query>;
  let mockTramite120601Store: jest.Mocked<Tramite120601Store>;
  let mockConsultaioQuery: Partial<ConsultaioQuery>;

  const mockDatosSocios: DatosSociosTable[] = [
    {
      rfc: 'RFC123456789',
      razonsocial: 'Empresa Test S.A.',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoM: 'García'
    }
  ];

  const mockConsultaioState: ConsultaioState = {
    readonly: false
  } as ConsultaioState;

  beforeEach(async () => {
    mockDatosEmpresaService = {
      obtenerDatosTablaDeSocios: jest.fn().mockReturnValue(of(mockDatosSocios))
    } as any;

    mockTramite120601Query = {
      selectNacionalidad$: of('No'),
      selectPersona$: of('No'),
      selectCadenaDependencia$: of('')
    };

    mockTramite120601Store = {
      setNacionalidad: jest.fn(),
      setPersona: jest.fn(),
      setCadenaDependencia: jest.fn()
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    };

    await TestBed.configureTestingModule({
      imports: [DatosGeneralesSociosComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosEmpresaService, useValue: mockDatosEmpresaService },
        { provide: Tramite120601Query, useValue: mockTramite120601Query },
        { provide: Tramite120601Store, useValue: mockTramite120601Store },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores por defecto y validadores', () => {
    expect(component.FormSolicitud).toBeDefined();
    const group = component.FormSolicitud.get('datosImportadorExportador');
    expect(group).toBeDefined();
    expect(group?.get('nacionalidad')?.value).toBe('No');
    expect(group?.get('persona')?.value).toBe('No');
    expect(group?.get('cadenaDependencia')?.value).toBe('');
    expect(group?.get('nacionalidad')?.validator).toBeTruthy();
    expect(group?.get('persona')?.validator).toBeTruthy();
    expect(group?.get('cadenaDependencia')?.validator).toBeTruthy();
  });

  it('debería llamar a obtenerDatosTablaDeSocios al inicializar y asignar datosSocios', () => {
    expect(mockDatosEmpresaService.obtenerDatosTablaDeSocios).toHaveBeenCalled();
    expect(component.datosSocios).toEqual(mockDatosSocios);
  });

  it('debería actualizar los valores del formulario desde los observables', () => {
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.value).toBe('No');
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.value).toBe('No');
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe('');
  });

  it('debería establecer esFormularioSoloLectura desde consultaioQuery', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('debería deshabilitar los campos cuando esFormularioSoloLectura es true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disabled).toBe(true);
  });

  it('debería habilitar los campos cuando esFormularioSoloLectura es false', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.enabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.enabled).toBe(true);
  });

  it('debería llamar a store.setNacionalidad en enCambioNacionalidad', () => {
    component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue('Yes');
    component.enCambioNacionalidad();
    expect(mockTramite120601Store.setNacionalidad).toHaveBeenCalledWith('Yes');
  });

  it('debería llamar a store.setPersona en enCambioPersona', () => {
    component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue('Yes');
    component.enCambioPersona();
    expect(mockTramite120601Store.setPersona).toHaveBeenCalledWith('Yes');
  });

  it('debería llamar a store.setCadenaDependencia en enCambioCadenaDependencia', () => {
    component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('RFC123');
    component.enCambioCadenaDependencia();
    expect(mockTramite120601Store.setCadenaDependencia).toHaveBeenCalledWith('RFC123');
  });

  it('debería deshabilitar todo el formulario cuando se llama a actualizarEstadoFormulario y esFormularioSoloLectura es true', () => {
    component.esFormularioSoloLectura = true;
    component.actualizarEstadoFormulario();
    expect(component.FormSolicitud.disabled).toBe(true);
  });

  it('debería habilitar todo el formulario cuando se llama a actualizarEstadoFormulario y esFormularioSoloLectura es false', () => {
    component.esFormularioSoloLectura = false;
    component.actualizarEstadoFormulario();
    expect(component.FormSolicitud.enabled).toBe(true);
  });

  it('debería actualizar recuentoTotalDeFilas en formularioParaConteoTotal', () => {
    expect(component.formularioParaConteoTotal.get('recuentoTotalDeFilas')?.value).toBe(mockDatosSocios.length);
    expect(component.formularioParaConteoTotal.get('recuentoTotalDeFilas')?.disabled).toBe(true);
  });

  it('debería limpiar destroyed$ en ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyed$ as Subject<void>;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  // Validación de formulario
  it('debería requerir nacionalidad, persona y cadenaDependencia', () => {
    const group = component.FormSolicitud.get('datosImportadorExportador');
    group?.get('nacionalidad')?.setValue('');
    group?.get('persona')?.setValue('');
    group?.get('cadenaDependencia')?.setValue('');
    expect(group?.get('nacionalidad')?.hasError('required')).toBe(true);
    expect(group?.get('persona')?.hasError('required')).toBe(true);
    expect(group?.get('cadenaDependencia')?.hasError('required')).toBe(true);
  });

  it('debería marcar el formulario como válido cuando todos los campos requeridos están llenos', () => {
    const group = component.FormSolicitud.get('datosImportadorExportador');
    group?.get('nacionalidad')?.setValue('No');
    group?.get('persona')?.setValue('Yes');
    group?.get('cadenaDependencia')?.setValue('RFC123');
    expect(component.FormSolicitud.valid).toBe(true);
  });
});