import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionProcesosComponent } from './adicionProcesos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { AlertComponent, ConsultaioQuery, NotificacionesComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdicionProcesosComponent', () => {
  let component: AdicionProcesosComponent;
  let fixture: ComponentFixture<AdicionProcesosComponent>;
  let storeMock: any;
  let queryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    storeMock = {
      setRegistrosProveedoresExtranjeros: jest.fn(),
    };
    queryMock = {
      select: jest.fn().mockReturnValue(of({
        archivoExtranjero: [],
        registrosProveedoresExtranjeros: '0',
      })),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
         CommonModule,
         AdicionProcesosComponent,
         TituloComponent,
         AlertComponent,
         NotificacionesComponent,
         HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite32301Store, useValue: storeMock },
        { provide: Tramite32301Query, useValue: queryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ProveedoresTitulo and call inicializarEstadoFormulario on ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(component.ProveedoresTitulo).toBe('Proceso(s) productivo(s)*');
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.inicializarFormulario = jest.fn(() => {
      component.proveedorXtranjForm = new FormBuilder().group({
        archivoExtranjero: [''],
        registrosProveedoresExtranjeros: [{ value: '', disabled: true }],
      });
    }) as any;
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.proveedorXtranjForm.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.inicializarFormulario = jest.fn(() => {
      component.proveedorXtranjForm = new FormBuilder().group({
        archivoExtranjero: [''],
        registrosProveedoresExtranjeros: [{ value: '', disabled: true }],
      });
    }) as any;
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.proveedorXtranjForm.enabled).toBe(true);
  });

  it('should call setRegistrosProveedoresExtranjeros on inicializaProveedorExtranjer', () => {
    component.inicializaProveedorExtranjer();
    expect(storeMock.setRegistrosProveedoresExtranjeros).toHaveBeenCalledWith({
      archivoExtranjero: [],
      registrosProveedoresExtranjeros: '0',
    });
  });

  it('should create the form with crearFormProveedorExtranjer', () => {
    component.proveedorExtranjero = {
      archivoExtranjero: ['file'],
      registrosProveedoresExtranjeros: '1',
    } as any;
    component.crearFormProveedorExtranjer();
    expect(component.proveedorXtranjForm.get('archivoExtranjero')?.value).toEqual(['file']);
    expect(component.proveedorXtranjForm.get('registrosProveedoresExtranjeros')?.disabled).toBe(true);
  });

  it('should patch value and update validity on file selected', () => {
    component.proveedorXtranjForm = new FormBuilder().group({
      archivoExtranjero: [''],
      registrosProveedoresExtranjeros: [{ value: '', disabled: true }],
    });
    const file = new File([''], 'filename.txt');
    const event = {
      target: {
        files: [file],
      },
    } as any as Event;
    const patchSpy = jest.spyOn(component.proveedorXtranjForm, 'patchValue');
    const updateSpy = jest.spyOn(component.proveedorXtranjForm.get('archivoExtranjero')!, 'updateValueAndValidity');
    component.onFileSelected(event);
    expect(patchSpy).toHaveBeenCalledWith({ archivoExtranjero: file });
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should call openCargaExtranjeroModel if no file is selected', () => {
    component.proveedorXtranjForm = new FormBuilder().group({
      archivoExtranjero: [''],
      registrosProveedoresExtranjeros: [{ value: '', disabled: true }],
    });
    const spy = jest.spyOn(component, 'openCargaExtranjeroModel');
    const event = {
      target: {
        files: [],
      },
    } as any as Event;
    component.onFileSelected(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should set nuevaNotificacion with correct values in openCargaExtranjeroModel', () => {
    component.openCargaExtranjeroModel();
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'El archivo debe contener al menos un registro.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    });
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});