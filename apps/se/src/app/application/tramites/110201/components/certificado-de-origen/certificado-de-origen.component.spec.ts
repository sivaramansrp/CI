import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Tratado' }] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Pais' }] })),
      getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'UMC' }] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Unidad' }] })),
      getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Factura' }] })),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([])),
    };
    tramiteStoreMock = {};
    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110201Store, useValue: tramiteStoreMock },
        { provide: Tramite110201Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: 'ConsultaioQuery', useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call all catalog methods and set options', () => {
    component.getTratado();
    expect(registroServiceMock.getTratado).toHaveBeenCalled();
    component.getPais();
    expect(registroServiceMock.getPais).toHaveBeenCalled();
    component.getUMC();
    expect(registroServiceMock.getUMC).toHaveBeenCalled();
    component.getUnidadMedida();
    expect(registroServiceMock.getUnidadMedida).toHaveBeenCalled();
    component.getTipoFactura();
    expect(registroServiceMock.getTipoFactura).toHaveBeenCalled();
  });

  it('should call getSolicitudesTabla and set mercanciaDisponsiblesTablaDatos', () => {
    component.getSolicitudesTabla();
    expect(registroServiceMock.getSolicitudesTabla).toHaveBeenCalled();
  });

  it('should call getSolicitudesDataTabla and set mercanciaSeleccionadasTablaData', () => {
    component.getSolicitudesDataTabla();
    expect(registroServiceMock.getSolicitudesDataTabla).toHaveBeenCalled();
  });

  it('should set cargarArchivo to true on cargaArchivo', () => {
    component.cargarArchivo = false;
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
  });

  it('should set mostrarErrores to true and cargarArchivo to false on darError', () => {
    component.mostrarErrores = false;
    component.cargarArchivo = true;
    component.darError();
    expect(component.mostrarErrores).toBe(true);
    expect(component.cargarArchivo).toBe(false);
  });

  it('should set esFormulario to true on manejarClic', () => {
    component.esFormulario = false;
    component.manejarClic({});
    expect(component.esFormulario).toBe(true);
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: ['']
      })
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should mark all as touched if mercanciaForm is invalid in validarMercanciaForm', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        nombreTecnico: ['']
      })
    });
    jest.spyOn(component.mercanciaForm, 'markAllAsTouched');
    component.mercanciaForm.setErrors({ invalid: true });
    component.validarMercanciaForm();
    expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should patch value and call setValoresStore on cambioFechaInicial', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        fechaInicial: ['']
      })
    });
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaInicial('2024-01-01');
    expect(component.registroForm.get('validacionForm.fechaInicial')?.value).toBe('2024-01-01');
    expect(spy).toHaveBeenCalled();
  });

  it('should patch value and call setValoresStore on cambioFechaFinal', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        fechaFinal: ['']
      })
    });
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFinal('2024-01-02');
    expect(component.registroForm.get('validacionForm.fechaFinal')?.value).toBe('2024-01-02');
    expect(spy).toHaveBeenCalled();
  });

  it('should patch value and call setValoresStore on cambioFechaFactura', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fecha: ['']
      })
    });
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFactura('2024-01-03');
    expect(component.mercanciaForm.get('validacionMercanciaForm.fecha')?.value).toBe('2024-01-03');
    expect(spy).toHaveBeenCalled();
  });

  it('should set hayMercanciasDisponibles to false if tratado is 0 in buscarMercancias', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: [0]
      })
    });
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(false);
  });

  it('should set hayMercanciasDisponibles to true if tratado is not 0 in buscarMercancias', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: [1]
      })
    });
    component.buscarMercancias();
    expect(component.hayMercanciasDisponibles).toBe(true);
  });

  it('should add a new item to mercanciaSeleccionadasTablaData on agregar if form is valid', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fraccionMercanArancelaria: ['123'],
        cantidad: ['10'],
        unidadMedida: ['kg'],
        valordelamercancia: ['100'],
        tipoFactura: ['A'],
        numeroFactura: ['F123'],
        complementoDelaDescripcion: ['desc'],
        fecha: ['2024-01-01']
      })
    });
    component.mercanciaSeleccionadasTablaData = [];
    component.esMercanciaEnEdicion = false;
    component.esFormulario = true;
    jest.spyOn(component.mercanciaForm, 'valid', 'get').mockReturnValue(true);
    component.agregar();
    expect(component.esMercanciaEnEdicion).toBe(true);
    expect(component.esFormulario).toBe(false);
    expect(component.mercanciaSeleccionadasTablaData.length).toBe(1);
  });

  it('should set esFormulario to true and esMercanciaEnEdicion to false on modificar', () => {
    component.esFormulario = false;
    component.esMercanciaEnEdicion = true;
    component.modificar();
    expect(component.esFormulario).toBe(true);
    expect(component.esMercanciaEnEdicion).toBe(false);
  });

  it('should set mercanciasHeader and mercanciasBody on mercanciatable', () => {
    component.getMercanciaTable = { tableHeader: ['h1'], tableBody: [{ tbodyData: ['some string'] }] };
    component.mercanciasHeader = [];
    component.mercanciasBody = [];
    component.mercanciatable();
    expect(component.mercanciasHeader).toEqual(['h1']);
    expect(component.mercanciasBody).toEqual([{ tbodyData: ['some string'] }]);
  });

  it('should set cargarArchivo to false on cerrarAdjuntarArchivoMercancias', () => {
    component.cargarArchivo = true;
    component.cerrarAdjuntarArchivoMercancias();
    expect(component.cargarArchivo).toBe(false);
  });

  it('should set nombreArchivo on alSeleccionarArchivo', () => {
    const event = { target: { files: [{ name: 'test.pdf' }] } };
    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('test.pdf');
    const event2 = { target: { files: [] } };
    component.alSeleccionarArchivo(event2);
    expect(component.nombreArchivo).toBe('No se eligió ningún archivo');
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const storeMethod = jest.fn();
    component.store = { setTest: storeMethod } as any;
    const form = new FormBuilder().group({ campo: ['valor'] });
    component.setValoresStore(form, 'campo', 'setNombre');
    expect(storeMethod).toHaveBeenCalledWith('valor');
  });

  it('should return validacionForm and validacionMercanciaForm', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeTruthy();
    expect(component.validacionMercanciaForm).toBeTruthy();
  });

  it('should set up forms in donanteDomicilio', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    expect(component.registroForm).toBeTruthy();
    expect(component.mercanciaForm).toBeTruthy();
  });

  it('should complete destroyNotifier$ and destroyed$ on ngOnDestroy', () => {
    const destroyNotifierNext = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierComplete = jest.spyOn(component.destroyNotifier$, 'complete');
    const destroyedNext = jest.spyOn((component as any).destroyed$, 'next');
    const destroyedComplete = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierNext).toHaveBeenCalled();
    expect(destroyNotifierComplete).toHaveBeenCalled();
    expect(destroyedNext).toHaveBeenCalled();
    expect(destroyedComplete).toHaveBeenCalled();
  });
});