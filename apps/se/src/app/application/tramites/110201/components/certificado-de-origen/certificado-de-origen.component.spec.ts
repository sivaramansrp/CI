import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroService: jest.Mocked<RegistroService>;
  let store: jest.Mocked<Tramite110201Store>;
  let query: jest.Mocked<Tramite110201Query>;
  let validacionesService: jest.Mocked<ValidacionesFormularioService>;
  let consultaioQuery: jest.Mocked<ConsultaioQuery>;

  const mockCatalogs = [
    { id: '1', nombre: 'Test Catalog 1' },
    { id: '2', nombre: 'Test Catalog 2' }
  ];

  const mockSolicitudState = {
    tratado: '1',
    pais: '1',
    fraccionArancelaria: '12345678',
    numeroRegistro: 'REG123',
    nombreComercial: 'Test Commercial',
    fechaInicial: '2024-01-01',
    fechaFinal: '2024-12-31',
    archivo: 'test.csv',
    marca: 'Test Brand',
    cantidad: '100.0000',
    umc: '1',
    valorDelaMercancia: '1000.0000',
    complementoDelaDescripcion: 'Test Description',
    masaBruta: '50.0000',
    unidadMedida: '1',
    tipoFactura: '1',
    fecha: '2024-01-01',
    numeroFactura: 'FAC123'
  };

  const mockConsultaState = {
    readonly: false
  };

  const mockColumnasTabla = {
    fraccionArancelaria: '12345678',
    nombreTecnico: 'Test Technical',
    nombreComercial: 'Test Commercial',
    numeroRegistroProductos: 'REG123',
    fechaExpedicion: '2024-01-01',
    fechaVencimiento: '2024-12-31'
  };

  const mockSeleccionadasTabla = {
    id: 1,
    fraccionArancelaria: '12345678',
    cantidad: '100.0000',
    unidadMedida: '1',
    valorMercancia: '1000.0000',
    nombreTecnico: 'Test Technical',
    nombreComercial: 'Test Commercial',
    numeroRegistroProductos: 'REG123',
    fechaExpedicion: '2024-01-01',
    fechaVencimiento: '2024-12-31',
    tipoFactura: '1',
    numFactura: 'FAC123',
    complementoDescripcion: 'Test Description',
    fechaFactura: '2024-01-01'
  };

  beforeEach(async () => {
    const registroServiceMock = {
      getTratado: jest.fn().mockReturnValue(of(mockCatalogs)),
      getPais: jest.fn().mockReturnValue(of(mockCatalogs)),
      getUMC: jest.fn().mockReturnValue(of(mockCatalogs)),
      getUnidadMedida: jest.fn().mockReturnValue(of(mockCatalogs)),
      getTipoFactura: jest.fn().mockReturnValue(of(mockCatalogs)),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([mockColumnasTabla])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([mockSeleccionadasTabla]))
    };

    const storeMock = {
      setFechInicioB: jest.fn(),
      setFechFinB: jest.fn(),
      setFecha: jest.fn(),
      setFraccionArancelaria: jest.fn()
    };

    const queryMock = {
      selectSolicitud$: of(mockSolicitudState)
    };

    const validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true)
    };

    const consultaioQueryMock = {
      selectConsultaioState$: of(mockConsultaState)
    };

    await TestBed.configureTestingModule({
      imports: [CertificadoDeOrigenComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110201Store, useValue: storeMock },
        { provide: Tramite110201Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    registroService = TestBed.inject(RegistroService) as jest.Mocked<RegistroService>;
    store = TestBed.inject(Tramite110201Store) as jest.Mocked<Tramite110201Store>;
    query = TestBed.inject(Tramite110201Query) as jest.Mocked<Tramite110201Query>;
    validacionesService = TestBed.inject(ValidacionesFormularioService) as jest.Mocked<ValidacionesFormularioService>;
    consultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;

    component.modalAgregar = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    component.closeModal = {
      nativeElement: {
        click: jest.fn()
      }
    } as any;

    component.getMercanciaTable = {
      tableHeader: ['Header1', 'Header2'],
      tableBody: [{ tbodyData: ['data1', 'data2'] }]
    };

    Object.defineProperty(window, 'bootstrap', {
      value: {
        Modal: jest.fn().mockImplementation(() => ({
          show: jest.fn(),
          hide: jest.fn()
        }))
      },
      writable: true
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize component correctly', () => {
      jest.spyOn(component, 'mercanciatable');
      jest.spyOn(component, 'getTratado');
      jest.spyOn(component, 'getPais');
      jest.spyOn(component, 'getUMC');
      jest.spyOn(component, 'getUnidadMedida');
      jest.spyOn(component, 'getTipoFactura');
      jest.spyOn(component, 'getSolicitudesTabla');
      jest.spyOn(component, 'inicializarEstadoFormulario');
      jest.spyOn(component, 'donanteDomicilio');

      component.ngOnInit();

      expect(component.mercanciatable).toHaveBeenCalled();
      expect(component.getTratado).toHaveBeenCalled();
      expect(component.getPais).toHaveBeenCalled();
      expect(component.getUMC).toHaveBeenCalled();
      expect(component.getUnidadMedida).toHaveBeenCalled();
      expect(component.getTipoFactura).toHaveBeenCalled();
      expect(component.getSolicitudesTabla).toHaveBeenCalled();
      expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
      expect(component.donanteDomicilio).toHaveBeenCalled();
    });
  });

  describe('manejarClic', () => {
    it('should set esFormulario to true', () => {
      component.manejarClic({});
      expect(component.esFormulario).toBe(true);
    });
  });

  describe('validarDestinatarioFormulario', () => {
    it('should mark form as touched when invalid', () => {
      component.donanteDomicilio();
      component.registroForm.get('validacionForm.tratado')?.setValue('');
      jest.spyOn(component.registroForm, 'markAllAsTouched');

      component.validarDestinatarioFormulario();

      expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not mark form as touched when valid', () => {
      component.donanteDomicilio();
      component.registroForm.patchValue({
        validacionForm: {
          tratado: '1',
          pais: '1',
          fraccionArancelaria: '12345678',
          numeroRegistro: 'REG123',
          nombreComercial: 'Test',
          fechaInicial: '2024-01-01',
          fechaFinal: '2024-12-31',
          archivo: 'test.csv'
        }
      });
      jest.spyOn(component.registroForm, 'markAllAsTouched');

      component.validarDestinatarioFormulario();

      expect(component.registroForm.markAllAsTouched).not.toHaveBeenCalled();
    });
  });

  describe('validarMercanciaForm', () => {
    it('should mark form as touched when invalid', () => {
      component.donanteDomicilio();
      component.mercanciaForm.get('validacionMercanciaForm.fraccionMercanciaArancelaria')?.setValue('');
      jest.spyOn(component.mercanciaForm, 'markAllAsTouched');

      component.validarMercanciaForm();

      expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not mark form as touched when valid', () => {
      component.donanteDomicilio();
      component.mercanciaForm.patchValue({
        validacionMercanciaForm: {
          fraccionMercanciaArancelaria: '12345678',
          nombreTecnico: 'Test Technical',
          nombreComercialDelaMercancia: 'Test Commercial',
          criterioParaConferir: 'Test Criteria',
          nombreEnIngles: 'Test English',
          marca: 'Test Brand',
          cantidad: '100.0000',
          umc: '1',
          valorDelaMercancia: '1000.0000',
          complementoDelaDescripcion: 'Test Description',
          masaBruta: '50.0000',
          unidadMedida: '1',
          tipoFactura: '1',
          fecha: '2024-01-01',
          numeroFactura: 'FAC123'
        }
      });
      jest.spyOn(component.mercanciaForm, 'markAllAsTouched');

      component.validarMercanciaForm();

      expect(component.mercanciaForm.markAllAsTouched).not.toHaveBeenCalled();
    });
  });

  describe('validarFormularios', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should return true when all forms are valid and merchandise data exists', () => {
      component.donanteDomicilio();
      component.registroForm.patchValue({
        validacionForm: {
          tratado: '1',
          pais: '1',
          fraccionArancelaria: '12345678',
          numeroRegistro: 'REG123',
          nombreComercial: 'Test',
          fechaInicial: '2024-01-01',
          fechaFinal: '2024-12-31',
          archivo: 'test.csv'
        }
      });
      component.mercanciaForm.patchValue({
        validacionMercanciaForm: {
          fraccionMercanciaArancelaria: '12345678',
          nombreTecnico: 'Test Technical',
          nombreComercialDelaMercancia: 'Test Commercial',
          criterioParaConferir: 'Test Criteria',
          nombreEnIngles: 'Test English',
          marca: 'Test Brand',
          cantidad: '100.0000',
          umc: '1',
          valorDelaMercancia: '1000.0000',
          complementoDelaDescripcion: 'Test Description',
          masaBruta: '50.0000',
          unidadMedida: '1',
          tipoFactura: '1',
          fecha: '2024-01-01',
          numeroFactura: 'FAC123'
        }
      });
      component.mercanciaSeleccionadasTablaData = [mockSeleccionadasTabla];

      const result = component.validarFormularios();

      expect(result).toBe(true);
      expect(component.validationAttempted).toBe(true);
      expect(component.mostrarErrorMercancias).toBe(false);
    });

    it('should return false when registroForm is invalid', () => {
      component.registroForm.get('validacionForm.tratado')?.setValue('');
      component.mercanciaSeleccionadasTablaData = [mockSeleccionadasTabla];

      const result = component.validarFormularios();

      expect(result).toBe(false);
      expect(component.validationAttempted).toBe(true);
    });

    it('should return false when mercanciaForm is invalid', () => {
      component.mercanciaForm.get('validacionMercanciaForm.fraccionMercanciaArancelaria')?.setValue('');
      component.mercanciaSeleccionadasTablaData = [mockSeleccionadasTabla];

      const result = component.validarFormularios();

      expect(result).toBe(false);
      expect(component.validationAttempted).toBe(true);
    });

    it('should return false when no merchandise is selected', () => {
      component.mercanciaSeleccionadasTablaData = [];

      const result = component.validarFormularios();

      expect(result).toBe(false);
      expect(component.mostrarErrorMercancias).toBe(true);
    });

    it('should return false when merchandise data is null', () => {
      component.mercanciaSeleccionadasTablaData = null as any;

      const result = component.validarFormularios();

      expect(result).toBe(false);
      expect(component.mostrarErrorMercancias).toBe(true);
    });
  });

  describe('inicializarEstadoFormulario', () => {
    it('should call guardarDatosFormulario when soloLectura is true', () => {
      component.soloLectura = true;
      jest.spyOn(component, 'guardarDatosFormulario');

      component.inicializarEstadoFormulario();

      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });

    it('should call donanteDomicilio when soloLectura is false', () => {
      component.soloLectura = false;
      jest.spyOn(component, 'donanteDomicilio');

      component.inicializarEstadoFormulario();

      expect(component.donanteDomicilio).toHaveBeenCalled();
    });
  });

  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should disable forms when soloLectura is true', () => {
      component.soloLectura = true;
      jest.spyOn(component, 'donanteDomicilio');

      component.guardarDatosFormulario();

      expect(component.donanteDomicilio).toHaveBeenCalled();
      expect(component.registroForm.disabled).toBe(true);
      expect(component.mercanciaForm.disabled).toBe(true);
    });

    it('should enable forms when soloLectura is false', () => {
      component.soloLectura = false;
      jest.spyOn(component, 'donanteDomicilio');

      component.guardarDatosFormulario();

      expect(component.donanteDomicilio).toHaveBeenCalled();
      expect(component.registroForm.enabled).toBe(true);
      expect(component.mercanciaForm.enabled).toBe(true);
    });
  });

  describe('cambioFechaInicial', () => {
    it('should update form and store with new initial date', () => {
      component.donanteDomicilio();
      jest.spyOn(component, 'setValoresStore');

      component.cambioFechaInicial('2024-01-15');

      expect(component.registroForm.get('validacionForm.fechaInicial')?.value).toBe('2024-01-15');
      expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionForm, 'fechaInicial', 'setFechInicioB');
    });
  });

  describe('cambioFechaFinal', () => {
    it('should update form and store with new final date', () => {
      component.donanteDomicilio();
      jest.spyOn(component, 'setValoresStore');

      component.cambioFechaFinal('2024-12-15');

      expect(component.registroForm.get('validacionForm.fechaFinal')?.value).toBe('2024-12-15');
      expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionForm, 'fechaFinal', 'setFechFinB');
    });
  });

  describe('cambioFechaFactura', () => {
    it('should update form and store with new invoice date', () => {
      component.donanteDomicilio();
      jest.spyOn(component, 'setValoresStore');

      component.cambioFechaFactura('2024-06-15');

      expect(component.mercanciaForm.get('validacionMercanciaForm.fecha')?.value).toBe('2024-06-15');
      expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionMercanciaForm, 'fecha', 'setFecha');
    });
  });

  describe('buscarMercancias', () => {
    it('should search merchandise and update table data', () => {
      component.donanteDomicilio();
      component.registroForm.patchValue({
        validacionForm: {
          fraccionArancelaria: '12345678',
          nombreTecnico: 'Test Technical',
          nombreComercial: 'Test Commercial',
          numeroRegistro: 'REG123',
          fechaInicial: '2024-01-01',
          fechaFinal: '2024-12-31'
        }
      });

      component.buscarMercancias();

      expect(component.mercanciaDisponsiblesTablaDatos).toHaveLength(1);
      expect(component.hayMercanciasDisponibles).toBe(true);
      expect(component.mercanciaDisponsiblesTablaDatos[0].fraccionArancelaria).toBe('12345678');
    });
  });

  describe('abrirModalMercancia', () => {
    it('should open modal and populate form with row data', () => {
      component.donanteDomicilio();
      jest.spyOn(component, 'getTratado');
      jest.spyOn(component, 'getPais');
      jest.spyOn(component, 'getUMC');
      jest.spyOn(component, 'getUnidadMedida');
      jest.spyOn(component, 'getTipoFactura');

      component.abrirModalMercancia(mockColumnasTabla);

      expect(component.esFormulario).toBe(true);
      expect(component.esMercanciaEnEdicion).toBe(false);
      expect(component.getTratado).toHaveBeenCalled();
      expect(component.getPais).toHaveBeenCalled();
      expect(component.getUMC).toHaveBeenCalled();
      expect(component.getUnidadMedida).toHaveBeenCalled();
      expect(component.getTipoFactura).toHaveBeenCalled();
      expect(component.mercanciaForm.get('validacionMercanciaForm.fraccionMercanciaArancelaria')?.value).toBe('12345678');
    });
  });

  describe('agregar', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should add merchandise when form is valid', () => {
      component.mercanciaForm.patchValue({
        validacionMercanciaForm: {
          fraccionMercanciaArancelaria: '12345678',
          nombreTecnico: 'Test Technical',
          nombreComercialDelaMercancia: 'Test Commercial',
          criterioParaConferir: 'Test Criteria',
          nombreEnIngles: 'Test English',
          marca: 'Test Brand',
          cantidad: '100.0000',
          umc: '1',
          valorDelaMercancia: '1000.0000',
          complementoDelaDescripcion: 'Test Description',
          masaBruta: '50.0000',
          unidadMedida: '1',
          tipoFactura: '1',
          fecha: '2024-01-01',
          numeroFactura: 'FAC123'
        }
      });
      jest.spyOn(component, 'cerrarModal');
      component.mercanciaSeleccionadasTablaData = [];

      component.agregar();

      expect(component.mostrarErrorRegistro).toBe(false);
      expect(component.mercanciaSeleccionadasTablaData).toHaveLength(1);
      expect(component.mostrarErrorMercancias).toBe(false);
      expect(component.esMercanciaEnEdicion).toBe(true);
      expect(component.esFormulario).toBe(true);
      expect(component.cerrarModal).toHaveBeenCalled();
    });

    it('should show error when form is invalid', () => {
      component.mercanciaForm.get('validacionMercanciaForm.fraccionMercanciaArancelaria')?.setValue('');
      jest.spyOn(component.mercanciaForm, 'markAllAsTouched');

      component.agregar();

      expect(component.mostrarErrorRegistro).toBe(true);
      expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
    });
  });

  describe('cerrarModal', () => {
    it('should reset error state and click close button', () => {
      component.mostrarErrorRegistro = true;

      component.cerrarModal();

      expect(component.mostrarErrorRegistro).toBe(false);
      expect(component.closeModal.nativeElement.click).toHaveBeenCalled();
    });
  });

  describe('cancelar', () => {
    it('should reset form state', () => {
      component.mostrarErrorRegistro = true;
      component.esMercanciaEnEdicion = false;
      component.esFormulario = true;

      component.cancelar();

      expect(component.mostrarErrorRegistro).toBe(false);
      expect(component.esMercanciaEnEdicion).toBe(true);
      expect(component.esFormulario).toBe(false);
    });
  });

  describe('modificar', () => {
    it('should open modal when merchandise is checked', () => {
      component.ischecked = true;
      jest.spyOn(component, 'abrirModalModificar');

      component.modificar();

      expect(component.abrirModalModificar).toHaveBeenCalled();
    });

    it('should show notification when no merchandise is checked', () => {
      component.ischecked = false;
      component.mostrarMensajeError = false;

      component.modificar();

      expect(component.nuevaNotificacion).toBeDefined();
      expect(component.nuevaNotificacion?.mensaje).toBe('Debes seleccionar una mercancía');
      expect(component.mostrarMensajeError).toBe(true);
    });
  });

  describe('abrirModalModificar', () => {
    it('should load catalogs and open modal', () => {
      jest.spyOn(component, 'getTratado');
      jest.spyOn(component, 'getPais');
      jest.spyOn(component, 'getUMC');
      jest.spyOn(component, 'getUnidadMedida');
      jest.spyOn(component, 'getTipoFactura');

      component.abrirModalModificar();

      expect(component.getTratado).toHaveBeenCalled();
      expect(component.getPais).toHaveBeenCalled();
      expect(component.getUMC).toHaveBeenCalled();
      expect(component.getUnidadMedida).toHaveBeenCalled();
      expect(component.getTipoFactura).toHaveBeenCalled();
    });
  });

  describe('mercanciatable', () => {
    it('should set merchandise table headers and body', () => {
      component.mercanciatable();

      expect(component.mercanciasHeader).toBeDefined();
      expect(component.mercanciasBody).toBeDefined();
    });
  });

  describe('cargaArchivo', () => {
    it('should set cargarArchivo to true and emit event', () => {
      jest.spyOn(component.dataEvent, 'emit');

      component.cargaArchivo();

      expect(component.cargarArchivo).toBe(true);
      expect(component.dataEvent.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('analizarGramaticalmenteCSV', () => {
    it('should parse CSV and update merchandise data', () => {
      const csvData = 'fraccionArancelaria,cantidad,unidadMedida\n12345678,100.0000,1\n87654321,200.0000,2';
      
      component.analizarGramaticalmenteCSV(csvData);

      expect(component.mercanciaSeleccionadasTablaData).toHaveLength(2);
      expect(component.mostrarErrorMercancias).toBe(false);
    });
   
  });

  describe('darError', () => {
    beforeEach(() => {
      Object.defineProperty(document, 'getElementById', {
        value: jest.fn().mockReturnValue({
          files: [new File(['test'], 'test.csv', { type: 'text/csv' })]
        }),
        writable: true
      });
    });

    it('should process file when selected', () => {
      jest.spyOn(component, 'analizarGramaticalmenteCSV');
      const mockReader = {
        onload: jest.fn(),
        readAsText: jest.fn()
      };
      Object.defineProperty(window, 'FileReader', {
        value: jest.fn().mockImplementation(() => mockReader),
        writable: true
      });

      component.darError();

      mockReader.onload({ target: { result: 'test,data\n1,2' } } as any);

      expect(component.mostrarErrores).toBe(true);
      expect(component.cargarArchivo).toBe(false);
      expect(component.esMercanciaEnEdicion).toBe(true);
    });

    it('should open modal when no file selected', () => {
      Object.defineProperty(document, 'getElementById', {
        value: jest.fn().mockReturnValue({ files: [] }),
        writable: true
      });
      jest.spyOn(component, 'abrirModal');

      component.darError();

      expect(component.abrirModal).toHaveBeenCalled();
    });
  });

  describe('Catalog methods', () => {
    it('should get tratado catalog', () => {
      component.getTratado();
      expect(registroService.getTratado).toHaveBeenCalled();
    });

    it('should get pais catalog', () => {
      component.getPais();
      expect(registroService.getPais).toHaveBeenCalled();
    });

    it('should get UMC catalog', () => {
      component.getUMC();
      expect(registroService.getUMC).toHaveBeenCalled();
    });

    it('should get unidad medida catalog', () => {
      component.getUnidadMedida();
      expect(registroService.getUnidadMedida).toHaveBeenCalled();
    });

    it('should get tipo factura catalog', () => {
      component.getTipoFactura();
      expect(registroService.getTipoFactura).toHaveBeenCalled();
    });
  });

  describe('cerrarAdjuntarArchivoMercancias', () => {
    it('should set cargarArchivo to false', () => {
      component.cargarArchivo = true;

      component.cerrarAdjuntarArchivoMercancias();

      expect(component.cargarArchivo).toBe(false);
    });
  });

  describe('alSeleccionarArchivo', () => {
    it('should set file name when file is selected', () => {
      const mockFile = new File(['test'], 'test.csv', { type: 'text/csv' });
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      } as any;

      component.alSeleccionarArchivo(mockEvent);

      expect(component.nombreArchivo).toBe('test.csv');
    });

    it('should set default message when no file is selected', () => {
      const mockEvent = {
        target: {
          files: null
        }
      } as any;

      component.alSeleccionarArchivo(mockEvent);

      expect(component.nombreArchivo).toBe('No se eligió ningún archivo');
    });
  });

  describe('onFraccionArancelariaInput', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should format input to only numbers and limit to 8 digits', () => {
      const mockInput = {
        value: '123abc456def78901'
      } as HTMLInputElement;
      const mockEvent = {
        target: mockInput
      } as unknown as Event;
      jest.spyOn(component, 'setValoresStore');

      component.onFraccionArancelariaInput(mockEvent);

      expect(mockInput.value).toBe('12345678');
      expect(component.setValoresStore).toHaveBeenCalledWith(component.validacionForm, 'fraccionArancelaria', 'setFraccionArancelaria');
    });

    it('should handle empty input', () => {
      const mockInput = {
        value: ''
      } as HTMLInputElement;
      const mockEvent = {
        target: mockInput
      } as unknown as Event;

      component.onFraccionArancelariaInput(mockEvent);

      expect(mockInput.value).toBe('');
    });
  });

  describe('onSubmit', () => {
    it('should handle form submission when valid', () => {
      component.donanteDomicilio();

      component.onSubmit();

      expect(component).toBeDefined();
    });
  });

  describe('isValid', () => {
    it('should return validation result from service', () => {
      const mockForm = component.fb.group({ test: [''] });
      validacionesService.isValid.mockReturnValue(true);

      const result = component.isValid(mockForm, 'test');

      expect(result).toBe(true);
      expect(validacionesService.isValid).toHaveBeenCalledWith(mockForm, 'test');
    });

    it('should return false when service returns null', () => {
      const mockForm = component.fb.group({ test: [''] });
      validacionesService.isValid.mockReturnValue(null as any);

      const result = component.isValid(mockForm, 'test');

      expect(result).toBe(false);
    });
  });

  describe('setValoresStore', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should call store method with form value', () => {
      component.registroForm.get('validacionForm.tratado')?.setValue('test-value');

      component.setValoresStore(component.validacionForm, 'tratado', 'setFechInicioB');

      expect(store.setFechInicioB).toHaveBeenCalledWith('test-value');
    });
  });

  describe('validarFormulario', () => {
    it('should return true when validarFormularios returns true', () => {
      jest.spyOn(component, 'validarFormularios').mockReturnValue(true);

      const result = component.validarFormulario();

      expect(result).toBe(true);
    });

    it('should return false when validarFormularios returns false', () => {
      jest.spyOn(component, 'validarFormularios').mockReturnValue(false);

      const result = component.validarFormulario();

      expect(result).toBe(false);
    });
  });

  describe('Form getters', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should return validacionForm', () => {
      const result = component.validacionForm;
      expect(result).toBeDefined();
    });

    it('should return validacionMercanciaForm', () => {
      const result = component.validacionMercanciaForm;
      expect(result).toBeDefined();
    });
  });

  describe('donanteDomicilio', () => {
    it('should create forms with validators', () => {
      component.donanteDomicilio();

      expect(component.registroForm).toBeDefined();
      expect(component.mercanciaForm).toBeDefined();
      expect(component.registroForm.get('validacionForm.tratado')?.hasError('required')).toBe(true);
    });
  });

  describe('getSolicitudesTabla', () => {
    it('should get table data from service', () => {
      component.getSolicitudesTabla();

      expect(registroService.getSolicitudesTabla).toHaveBeenCalled();
    });
  });

  describe('getSolicitudesDataTabla', () => {
    it('should get selected table data from service', () => {
      component.getSolicitudesDataTabla();

      expect(registroService.getSolicitudesDataTabla).toHaveBeenCalled();
    });
  });

  describe('formatearCantidad', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should format value to 4 decimals when no decimals exist', () => {
      component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.setValue('100');

      component.formatearCantidad();

      expect(component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.value).toBe('100.0000');
    });

    it('should format value to exactly 4 decimals when decimals exist', () => {
      component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.setValue('100.5');

      component.formatearCantidad();

      expect(component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.value).toBe('100.5000');
    });

    it('should handle empty value', () => {
      component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.setValue('');

      component.formatearCantidad();

      expect(component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.value).toBe('');
    });

    it('should handle null value', () => {
      component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.setValue(null);

      component.formatearCantidad();

      expect(component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.value).toBe(null);
    });
  });

  describe('formatearValorDelaMercancia', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should format value to 4 decimals', () => {
      component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.setValue('1000');

      component.formatearValorDelaMercancia();

      expect(component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.value).toBe('1000.0000');
    });

    it('should set maxlength error when value exceeds 22 characters', () => {
      const longValue = '123456789012345678901234';
      component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.setValue(longValue);

      component.formatearValorDelaMercancia();

      expect(component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.hasError('maxlength')).toBe(true);
    });

    it('should set pattern error for invalid format', () => {
      component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.setValue('invalid123.12345');

      component.formatearValorDelaMercancia();

      expect(component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.hasError('pattern')).toBe(true);
    });

    it('should handle empty value', () => {
      component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.setValue('');

      component.formatearValorDelaMercancia();

      expect(component.mercanciaForm.get('validacionMercanciaForm.valorDelaMercancia')?.value).toBe('');
    });
  });

  describe('formatearMasaBruta', () => {
    beforeEach(() => {
      component.donanteDomicilio();
    });

    it('should format value to 4 decimals', () => {
      component.mercanciaForm.get('validacionMercanciaForm.masaBruta')?.setValue('50');

      component.formatearMasaBruta();

      expect(component.mercanciaForm.get('validacionMercanciaForm.masaBruta')?.value).toBe('50.0000');
    });

    it('should handle decimals correctly', () => {
      component.mercanciaForm.get('validacionMercanciaForm.masaBruta')?.setValue('50.12');

      component.formatearMasaBruta();

      expect(component.mercanciaForm.get('validacionMercanciaForm.masaBruta')?.value).toBe('50.1200');
    });

    it('should handle empty value', () => {
      component.mercanciaForm.get('validacionMercanciaForm.masaBruta')?.setValue('');

      component.formatearMasaBruta();

      expect(component.mercanciaForm.get('validacionMercanciaForm.masaBruta')?.value).toBe('');
    });
  });

  describe('eliminarPedimento', () => {
    beforeEach(() => {
      component.mercanciaSeleccionadasTablaData = [mockSeleccionadasTabla];
      component.selectedRow = mockSeleccionadasTabla;
    });

    it('should remove merchandise when confirmed', () => {
      component.eliminarPedimento(true);

      expect(component.ischecked).toBe(true);
      expect(component.mercanciaSeleccionadasTablaData).toHaveLength(0);
      expect(component.selectedRow).toBeNull();
      expect(component.mostrarMensajeError).toBe(false);
      expect(component.nuevaNotificacion).toBeNull();
    });

    it('should not remove merchandise when not confirmed', () => {
      component.eliminarPedimento(false);

      expect(component.ischecked).toBe(false);
      expect(component.mercanciaSeleccionadasTablaData).toHaveLength(1);
      expect(component.mostrarMensajeError).toBe(false);
      expect(component.nuevaNotificacion).toBeNull();
    });
  });

  describe('abrirModal', () => {
    it('should set notification and element for deletion', () => {
      component.abrirModal(5);

      expect(component.nuevaNotificacion).toBeDefined();
      expect(component.nuevaNotificacion?.mensaje).toBe('Debes seleccionar un archivo(txt o csv)');
      expect(component.elementoParaEliminar).toBe(5);
    });

    it('should use default index when not provided', () => {
      component.abrirModal();

      expect(component.elementoParaEliminar).toBe(0);
    });
  });

  describe('onFilaSeleccionadaradio', () => {
    it('should set selected row', () => {
      component.onFilaSeleccionadaradio(mockSeleccionadasTabla);

      expect(component.selectedRow).toBe(mockSeleccionadasTabla);
    });
  });

  describe('cerrarEdicionMercancia', () => {
    it('should call eliminarMensajeConfirmacion when row is selected', () => {
      component.selectedRow = mockSeleccionadasTabla;
      jest.spyOn(component, 'eliminarMensajeConfirmacion');

      component.cerrarEdicionMercancia();

      expect(component.eliminarMensajeConfirmacion).toHaveBeenCalled();
    });

    it('should call errorMessageExportador when no row is selected', () => {
      component.selectedRow = null as any;
      jest.spyOn(component, 'errorMessageExportador');

      component.cerrarEdicionMercancia();

      expect(component.errorMessageExportador).toHaveBeenCalled();
    });
  });

  describe('errorMessageExportador', () => {
    it('should set error notification', () => {
      component.errorMessageExportador();

      expect(component.nuevaNotificacion).toBeDefined();
      expect(component.nuevaNotificacion?.mensaje).toBe('Debes seleccionar una mercancía');
      expect(component.mostrarMensajeError).toBe(true);
    });
  });

  describe('eliminarMensajeConfirmacion', () => {
    it('should set confirmation notification', () => {
      component.eliminarMensajeConfirmacion();

      expect(component.nuevaNotificacion).toBeDefined();
      expect(component.nuevaNotificacion?.mensaje).toBe('¿Desea eliminar este dato?');
      expect(component.mostrarMensajeError).toBe(true);
    });
  });

  describe('eliminarErrorMessage', () => {
    beforeEach(() => {
      component.mercanciaSeleccionadasTablaData = [mockSeleccionadasTabla];
      component.selectedRow = mockSeleccionadasTabla;
      component.modalInstances = {
        hide: jest.fn()
      } as any;
    });

    it('should remove merchandise when event is true', () => {
      component.eliminarErrorMessage(true);

      expect(component.mercanciaSeleccionadasTablaData).toHaveLength(0);
      expect(component.selectedRow).toEqual({});
      expect(component.mostrarMensajeError).toBe(false);
    });

    it('should not remove merchandise when event is false', () => {
      component.eliminarErrorMessage(false);

      expect(component.mercanciaSeleccionadasTablaData).toHaveLength(1);
      expect(component.mostrarMensajeError).toBe(false);
    });

    it('should hide modal when modal instance exists', () => {
      component.eliminarErrorMessage(true);

      expect(component.modalInstances?.hide).toHaveBeenCalled();
    });

    it('should handle null modal instance', () => {
      component.modalInstances = null;

      expect(() => component.eliminarErrorMessage(true)).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyed subject', () => {
      const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(destroyedSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
