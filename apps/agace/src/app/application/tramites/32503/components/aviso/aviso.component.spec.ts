import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoComponent } from './aviso.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';
import { Tramite32503Store } from '../../../../estados/tramites/tramite32503.store';
import { Tramite32503Query } from '../../../../estados/queries/tramite32503.query';
import { Modal } from 'bootstrap';
import { AvisoTabla, MercanciaTabla } from "../../models/aviso-traslado.model";
import { provideHttpClient } from '@angular/common/http';
import { AvisoTrasladoService } from '../../services/aviso-traslado.service';



describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let tablaDeDatos: AvisoTabla[];
  let tablaDeMercancia: MercanciaTabla[];
  let avisoTrasladoServiceMock: any;


  beforeEach(async () => {
    tramiteStoreMock = {
      setAvisoFormularioTipoAviso: jest.fn(),
      setAvisoFormularioFechaTranslado: jest.fn(),
    };
    avisoTrasladoServiceMock = {
      obtenerFraccionArancelaria: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Fracción 1' }] })),
      obtenerUnidadMedida: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Unidad 1' }] })),
      obtenerFederativa: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Entidad 1' }] })),
      obtenerMunicipio: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Municipio 1' }] })),
      obtenerColonias: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Colonia 1' }] })),
      obtenerAvisoTabla: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Aviso 1' }] })),
      obtenerMercanciaTabla: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Mercancía 1' }] })),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        datosAviso: {
          tipoAviso: 'inicial',
          idTransaccion: '',
          motivoProrroga: '',
        },
      }),
    };

    tablaDeDatos = [
      {
        "id": 1,
        "rfc": "XAXX010101000",
        "nombreComercial": "NOMBRE COMERCIAL",
        "entidadFederativa": "ENTIDAD FEDERATIVA",
        "alcaldioOMuncipio": "ALCALDIA O MUNICIPIO",
        "colonia": "COLONIA"
      },
      {
        "id": 1,
        "rfc": "XAXX010101000",
        "nombreComercial": "NOMBRE COMERCIAL",
        "entidadFederativa": "ENTIDAD FEDERATIVA",
        "alcaldioOMuncipio": "ALCALDIA O MUNICIPIO",
        "colonia": "COLONIA"
      }
    ];
    tablaDeMercancia = [
      {
        "id": 1,
        "claveFraccionArancelaria": "certificado",
        "nico": "01",
        "cantidad": "50",
        "claveUnidadMedida": "Botella",
        "valorUSD": "2555",
        "descripcionMercancia": "certificado",
        "descripcionProceso": "certificado",
        "numPedimentoExportacion": "certificado",
        "numPedimentoImportacion": "certificado"
      },
      {
        "id": 1,
        "claveFraccionArancelaria": "certificado",
        "nico": "01",
        "cantidad": "50",
        "claveUnidadMedida": "Botella",
        "valorUSD": "2555",
        "descripcionMercancia": "certificado",
        "descripcionProceso": "certificado",
        "numPedimentoExportacion": "certificado",
        "numPedimentoImportacion": "certificado"
      }
    ]
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AvisoComponent],
      declarations: [],
      providers: [
        provideHttpClient(),
        { provide: Tramite32503Store, useValue: tramiteStoreMock },
        { provide: Tramite32503Query, useValue: tramiteQueryMock },
        { provide: AvisoTrasladoService, useValue: avisoTrasladoServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramiteState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tramiteState).toEqual({
      datosAviso: {
        tipoAviso: 'inicial',
        idTransaccion: '',
        motivoProrroga: '',
      },
    });
  });

  it('should call setAvisoFormularioTipoAviso when verificaTipoAviso is called', () => {
    component.avisoFormulario = new FormGroup({});
    component.verificaTipoAviso();
    expect(tramiteStoreMock.setAvisoFormularioTipoAviso).toHaveBeenCalled();
  });

  it('should disable idTransaccion and motivoProrroga when tipoAviso is "inicial"', () => {
    component.avisoFormulario = new FormGroup({
      datosAviso: new FormGroup({
        tipoAviso: new FormBuilder().control('inicial'),
        idTransaccion: new FormBuilder().control(''),
        motivoProrroga: new FormBuilder().control(''),
      }),
    });
    component.verificaTipoAviso();
    expect(component.avisoFormulario.get('datosAviso.idTransaccion')?.disabled).toBeTruthy();
    expect(component.avisoFormulario.get('datosAviso.motivoProrroga')?.disabled).toBeTruthy();
  });

  it('should open the domicilio modal when abiertoDomicilio is called', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalDomicilio');
    component.modalDomicilio = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abiertoDomicilio();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should open the mercancia modal when abiertoMercancia is called', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalMercancia');
    component.modalMercancia = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abiertoMercancia();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should filter out selected rows when eliminarDomicilio is called', () => {
    component.tablaDeDatos.datos = tablaDeDatos
    component.filaSeleccionadaLista = [tablaDeDatos[1]];
    component.eliminarDomicilio();
    expect(component.elementoParaEliminar).toBe(2);
    expect(component.nuevaNotificacion1.mensaje).toBe('¿Desea eliminar el registro seleccionado?');
    
    component.eliminarPedimento(true);
    expect(component.tablaDeDatos.datos).toEqual([tablaDeDatos[0]]);
    expect(component.filaSeleccionadaLista).toEqual([]);
  });

  it('should filter out selected rows when eliminarMercancia is called', () => {
    component.tablaDeMercancia.datos = tablaDeMercancia
    component.filaSeleccionadaMercanciaLista = [tablaDeMercancia[1]];
    component.eliminarMercancia();
    expect(component.elementoParaEliminar).toBe(1);
    expect(component.nuevaNotificacion1.mensaje).toBe('¿Desea eliminar el registro seleccionado?');
    
    component.eliminarPedimento(true);
    expect(component.tablaDeMercancia.datos).toEqual([tablaDeMercancia[0]]);
    expect(component.filaSeleccionadaMercanciaLista).toEqual([]);
  });

  it('should call setAvisoFormularioFechaTranslado when cambioFechaIngreso is called', () => {
    const nuevoValor = '2025-04-10';
    component.cambioFechaIngreso(nuevoValor);
    expect(tramiteStoreMock.setAvisoFormularioFechaTranslado).toHaveBeenCalledWith(nuevoValor);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });




  it('should set values in the store using setValoresStore', () => {
    const form = new FormBuilder().group({
      testField: ['Test Value'],
    });
    component.setValoresStore(form, 'testField', 'setAvisoFormularioFechaTranslado');
    expect(tramiteStoreMock.setAvisoFormularioFechaTranslado).toHaveBeenCalledWith('Test Value');
  });

  it('should load fracción arancelaria data using cargarFraccionArancelaria', () => {
    component.cargarFraccionArancelaria();
    expect(avisoTrasladoServiceMock.obtenerFraccionArancelaria).toHaveBeenCalled();
    expect(component.fraccionArancelaria).toEqual([{ id: 1, descripcion: 'Fracción 1' }]);
  });
  it('should load unidad de medida data using cargarUnidadMedida', () => {
    component.cargarUnidadMedida();
    expect(avisoTrasladoServiceMock.obtenerUnidadMedida).toHaveBeenCalled();
    expect(component.unidadMedida).toEqual([{ id: 1, descripcion: 'Unidad 1' }]);
  });
  it('should load entidad federativa data using cargarFederativa', () => {
    component.cargarFederativa();
    expect(avisoTrasladoServiceMock.obtenerFederativa).toHaveBeenCalled();
    expect(component.entidadFederativa).toEqual([{ id: 1, descripcion: 'Entidad 1' }]);
  });
  it('should load municipio data using cargarMunicipio', () => {
    component.cargarMunicipio();
    expect(avisoTrasladoServiceMock.obtenerMunicipio).toHaveBeenCalled();
    expect(component.delegacionMunicipio).toEqual([{ id: 1, descripcion: 'Municipio 1' }]);
  });
  it('should load colonias data using cargarColonias', () => {
    component.cargarColonias();
    expect(avisoTrasladoServiceMock.obtenerColonias).toHaveBeenCalled();
    expect(component.colonia).toEqual([{ id: 1, descripcion: 'Colonia 1' }]);
  });
  it('should load aviso tabla data using cargarAvisoTabla', () => {
    component.cargarAvisoTabla();
    expect(avisoTrasladoServiceMock.obtenerAvisoTabla).toHaveBeenCalled();
    expect(component.tablaDeDatos.datos).toEqual([{ id: 1, descripcion: 'Aviso 1' }]);
  });
  it('should load mercancia tabla data using cargarMercanciaTabla', () => {
    component.cargarMercanciaTabla();
    expect(avisoTrasladoServiceMock.obtenerMercanciaTabla).toHaveBeenCalled();
    expect(component.tablaDeMercancia.datos).toEqual([{ id: 1, descripcion: 'Mercancía 1' }]);
  });
  it('should disable forms when soloLectura is true', () => {
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.avisoFormulario.disabled).toBe(true);
    expect(component.domicilioFormulario.disabled).toBe(true);
    expect(component.mercanciaFormulario.disabled).toBe(true);
  });

  it('should enable forms when soloLectura is false', () => {
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.avisoFormulario.enabled).toBe(true);
    expect(component.domicilioFormulario.enabled).toBe(true);
    expect(component.mercanciaFormulario.enabled).toBe(true);
  });

  it('should update filaSeleccionadaLista when filaSeleccionada is called', () => {
    const mockEvento: AvisoTabla[] = [{
      id: 1,
      rfc: "rfc",
      nombreComercial: "nombreComercial",
      entidadFederativa: "entidadFederativa",
      alcaldioOMuncipio: "alcaldioOMuncipio",
      colonia: "colonia"
    }];
    component.filaSeleccionada(mockEvento);
    expect(component.filaSeleccionadaLista).toEqual(mockEvento);
  });

  it('should update filaSeleccionadaMercanciaLista when filaSeleccionadaMercancia is called', () => {
    const mockEvento: MercanciaTabla[] = [{
      id: 1,
      claveFraccionArancelaria: "claveFraccionArancelaria",
      nico: "nico",
      cantidad: "cantidad",
      claveUnidadMedida: "claveUnidadMedida",
      valorUSD: "valorUSD",
      descripcionMercancia: "descripcionMercancia",
      descripcionProceso: "descripcionProceso",
      numPedimentoExportacion: "numPedimentoExportacion",
      numPedimentoImportacion: "numPedimentoImportacion",
    }];
    component.filaSeleccionadaMercancia(mockEvento);
    expect(component.filaSeleccionadaMercanciaLista).toEqual(mockEvento);
  });

  it('should call cargarMercanciaTabla and close the modal when agregarMercancia is called', () => {
    component.mercanciaFormulario = new FormBuilder().group({
      claveFraccionArancelaria: ['test'],
      nico: ['01'],
      cantidad: ['10'],
      claveUnidadMedida: ['KG'],
      valorUSD: ['100'],
      descripcionMercancia: ['test'],
      descripcionProceso: ['test'],
      numPedimentoExportacion: ['123'],
      numPedimentoImportacion: ['456']
    });
    
    component.closeMercancia = {
      nativeElement: {
        click: jest.fn(),
      },
    } as any;

    component.tablaDeMercancia.datos = [];

    component.agregarMercancia();

    expect(component.tablaDeMercancia.datos.length).toBe(1);
    expect(component.closeMercancia.nativeElement.click).toHaveBeenCalled();
  });

  it('should call cargarAvisoTabla, close the modal, and open a notification when agregarDomicilio is called', () => {
    component.domicilioFormulario = new FormBuilder().group({
      nombreComercial: ['test'],
      claveEntidadFederativa: ['01'],
      claveDelegacionMunicipio: ['01'],
      claveColonia: ['01'],
      calle: ['test'],
      numeroExterior: ['123'],
      numeroInterior: ['456'],
      codigoPostal: ['12345'],
      rfc: ['TEST123456789']
    });
    
    component.closeDomicilio = {
      nativeElement: {
        click: jest.fn(),
      },
    } as any;

    component.tablaDeDatos.datos = [];

    component.agregarDomicilio();

    expect(component.tablaDeDatos.datos.length).toBe(1);
    expect(component.closeDomicilio.nativeElement.click).toHaveBeenCalled();
  });

  it('should sanitize input by removing non-alphanumeric characters', () => {
    const mockEvent = {
      target: { value: 'abc123!@#' } as HTMLInputElement,
    } as unknown as Event;
    const form = new FormBuilder().group({
      testField: [''],
    });
    component.sanitizeAlphanumeric(form, 'testField', mockEvent);
    expect(form.get('testField')?.value).toBe('abc123');
  });

  it('should sanitize input by removing non-alphanumeric characters except spaces', () => {
    const mockEvent = {
      target: { value: 'abc 123!@#' } as HTMLInputElement,
    } as unknown as Event;

    const form = new FormBuilder().group({
      testField: [''],
    });
    component.desinfectarAlfanumericoConEspacio(form, 'testField', mockEvent);
    expect(form.get('testField')?.value).toBe('abc 123');
  });

  it('should sanitize input by removing non-numeric characters', () => {
    const mockEvent = {
      target: { value: '123abc!@#' } as HTMLInputElement,
    } as unknown as Event;
    const form = new FormBuilder().group({
      testField: [''],
    });
    component.sanitizeNumeric(form, 'testField', mockEvent);
    expect(form.get('testField')?.value).toBe('123');
  });

  it('should clear the file input and reset the archivoMasivo control', () => {
    const mockFileInput = {
      value: 'mockFile',
    } as HTMLInputElement;

    component.avisoFormulario = new FormBuilder().group({
      archivoMasivo: ['mockFile'],
    });
    component.limpiar(mockFileInput);
    expect(mockFileInput.value).toBe('');
    expect(component.avisoFormulario.get('archivoMasivo')?.value).toBe('');
  });

  it('should set the selected file in the archivoMasivo control', () => {
    const mockFile = new File(['content'], 'testFile.txt', { type: 'text/plain' });
    const mockEvent = {
      target: {
        files: [mockFile],
      },
    } as unknown as Event;

    component.avisoFormulario = new FormBuilder().group({
      archivoMasivo: [null],
    });
    component.onArchivoMasivoSeleccionado(mockEvent);
    expect(component.avisoFormulario.get('archivoMasivo')?.value).toBe(mockFile);
  });

  it('should not set the archivoMasivo control if no file is selected', () => {
    const mockEvent = {
      target: {
        files: [],
      },
    } as unknown as Event;

    component.avisoFormulario = new FormBuilder().group({
      archivoMasivo: [null],
    });
    component.onArchivoMasivoSeleccionado(mockEvent);
    expect(component.avisoFormulario.get('archivoMasivo')?.value).toBeNull();
  });

});