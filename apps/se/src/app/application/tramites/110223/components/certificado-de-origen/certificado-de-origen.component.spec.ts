import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { Tramite110223Store } from '../../../../estados/tramites/Tramite110223.store';
import { Tramite110223Query } from '../../../../estados/queries/tramite110223.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([])),
    };

    tramiteStoreMock = {
      setTercerOperador: jest.fn(),
      setTratado: jest.fn(),
      setPais: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setNumRegistro: jest.fn(),
      setNomComercial: jest.fn(),
      setFechInicioB: jest.fn(),
      setFechFinB: jest.fn(),
      setArchivo: jest.fn(),
      setcantidad: jest.fn(),
      setvalordelamercancia: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110223Store, useValue: tramiteStoreMock },
        { provide: Tramite110223Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registroForm).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
  });

  it('should call getTratado on initialization', () => {
    const spy = jest.spyOn(registroServiceMock, 'getTratado');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate the destinatario form', () => {
    const spy = jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate the mercancia form', () => {
    const spy = jest.spyOn(component.mercanciaForm, 'markAllAsTouched');
    component.validarMercanciaForm();
    expect(spy).toHaveBeenCalled();
  });

  it('should set values in the store', () => {
    const spy = jest.spyOn(tramiteStoreMock, 'setTratado');
    component.setValoresStore(component.registroForm, 'tratado', 'setTratado');
    expect(spy).toHaveBeenCalled();
  });

  it('should handle file selection', () => {
    const event = {
      target: {
        files: [{ name: 'test-file.txt' }],
      },
    } as unknown as Event;
    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('test-file.txt');
  });

  it('should toggle cargarArchivo state', () => {
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
    component.cerrarAdjuntarArchivoMercancias();
    expect(component.cargarArchivo).toBe(false);
  });

  it('should handle buscarMercancias logic', () => {
    component.registroForm.patchValue({
      validacionForm: { tratado: 1 },
    });
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(true);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should handle agregar logic', () => {
    const validacionMercanciaFormGroup = component.fb.group({
      fraccionMercanArancelaria: ['123'],
      cantidad: [10],
      unidadMedida: ['kg'],
      valordelamercancia: [100],
      tipoFactura: ['Factura'],
      numeroFactura: ['12345'],
      complementoDelaDescripcion: ['Test'],
      fecha: ['2025-04-28'],
    });

    component.mercanciaForm.setControl(
      'validacionMercanciaForm',
      validacionMercanciaFormGroup
    );

    component.agregar();

    expect(component.esMercanciaEnEdicion).toBe(true);
    expect(component.mercanciaSeleccionadasTablaData.length).toBe(1);
  });

  it('should handle modificar logic', () => {
    component.modificar();
    expect(component.esFormulario).toBe(true);
    expect(component.esMercanciaEnEdicion).toBe(false);
  });

  it('should validate form fields using isValid', () => {
    const result = component.isValid(component.registroForm, 'tratado');
    expect(result).toBe(true);
  });
});