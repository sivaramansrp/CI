import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { ColumnasTabla, ListaClave, Mercancia } from '../../models/consulta.model';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let consultaServiceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerTablaScian: jest.fn().mockReturnValue(of([])),
      obtenerTablaMercancias: jest.fn().mockReturnValue(of([])),
      obtenerTablaListaClave: jest.fn().mockReturnValue(of([])),
      obtenerDatosEstado: jest.fn().mockReturnValue(of([])),
      obtenerDatosClave: jest.fn().mockReturnValue(of([])),
      getDescripcionScian: jest.fn().mockReturnValue(of({ data: [{ descripcion: 'Test Description' }] })),
    };

    storeMock = {
      setDescripcionScian: jest.fn(),
      setClaveScian: jest.fn(),
      addMercanciasDatos: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setClaveDeLosLotes: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDeLaSolicitudComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: storeMock },
        { provide: Tramite260704Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and fetch data on ngOnInit', () => {
    const spyDonanteDomicilio = jest.spyOn(component, 'donanteDomicilio');
    const spyObtenerTablaScian = jest.spyOn(component, 'obtenerTablaScian');
    const spyObtenerDatosEstado = jest.spyOn(component, 'obtenerDatosEstado');
    const spyObtenerTablaMercancias = jest.spyOn(component, 'obtenerTablaMercancias');
    const spyObtenerDatosClave = jest.spyOn(component, 'obtenerDatosClave');
    const spyObtenerTablaListaClave = jest.spyOn(component, 'obtenerTablaListaClave');

    component.ngOnInit();

    expect(spyDonanteDomicilio).toHaveBeenCalled();
    expect(spyObtenerTablaScian).toHaveBeenCalled();
    expect(spyObtenerDatosEstado).toHaveBeenCalled();
    expect(spyObtenerTablaMercancias).toHaveBeenCalled();
    expect(spyObtenerDatosClave).toHaveBeenCalled();
    expect(spyObtenerTablaListaClave).toHaveBeenCalled();
  });

  it('should fetch SCIA table data', () => {
    component.obtenerTablaScian();
    expect(consultaServiceMock.obtenerTablaScian).toHaveBeenCalled();
    expect(component.certificadoDisponsiblesTablaDatos).toEqual([]);
  });

  it('should fetch Mercancias table data', () => {
    component.obtenerTablaMercancias();
    expect(consultaServiceMock.obtenerTablaMercancias).toHaveBeenCalled();
    expect(component.mercanciasConfiguracionTabla).toEqual([]);
  });

  it('should fetch ListaClave table data', () => {
    component.obtenerTablaListaClave();
    expect(consultaServiceMock.obtenerTablaListaClave).toHaveBeenCalled();
    expect(component.listaClaveTabla).toEqual([]);
  });

  it('should fetch Estado data', () => {
    component.obtenerDatosEstado();
    expect(consultaServiceMock.obtenerDatosEstado).toHaveBeenCalled();
    expect(component.estadoCatalogo.catalogos).toEqual([]);
  });

  it('should fetch Clave data', () => {
    component.obtenerDatosClave();
    expect(consultaServiceMock.obtenerDatosClave).toHaveBeenCalled();
    expect(component.catalogoClave.catalogos).toEqual([]);
  });

  it('should handle SCIA selection', () => {
    component.scianForm = component.fb.group({
      cveSCIAN: ['TestClave'],
      cveSCIANDescripcion: [''],
    });

    component.claveScianSeleccion();

    expect(consultaServiceMock.getDescripcionScian).toHaveBeenCalled();
    expect(storeMock.setDescripcionScian).toHaveBeenCalledWith('Test Description');
    expect(storeMock.setClaveScian).toHaveBeenCalledWith('TestClave');
  });

  it('should toggle paisOrigen state', () => {
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(true);
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(false);
  });

  it('should toggle paisProcedencisColapsable state', () => {
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(true);
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(false);
  });

  it('should toggle usoEspecifico state', () => {
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(true);
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(false);
  });

  it('should add Mercancias data', () => {
    component.datosDelEstablecimientoForm = component.fb.group({
      clasificaionProductos: ['TestClasificacion'],
      especificarProducto: ['TestEspecificar'],
      nombreProductoEspecifico: ['TestNombre'],
      marca: ['TestMarca'],
      tipoProducto: ['TestTipo'],
      fraccionArancelaria: ['TestFraccion'],
      descripcionFraccionArancelaria: ['TestDescripcion'],
      cantidadUMT: ['TestUMT'],
      umt: ['TestUMTValue'],
      cantidadUMC: ['TestUMC'],
      umc: ['TestUMCValue'],
    });

    component.agregarMercanias();

    expect(storeMock.addMercanciasDatos).toHaveBeenCalledWith({
      clasificaionProductos: 'TestClasificacion',
      especificarProducto: 'TestEspecificar',
      nombreProductoEspecifico: 'TestNombre',
      marca: 'TestMarca',
      tipoProducto: 'TestTipo',
      fraccionArancelaria: 'TestFraccion',
      descripcionFraccionArancelaria: 'TestDescripcion',
      cantidadUMT: 'TestUMT',
      umt: 'TestUMTValue',
      cantidadUMC: 'TestUMC',
      umc: 'TestUMCValue',
      paisDeOrigen: 'paisDeOrigen',
      paisDeProcedencia: 'paisDeProcedencia',
      usoEspecifico: 'usoEspecifico',
    });
  });

  it('should set AvisoDeFuncionamiento', () => {
    const event = { target: { checked: true } } as unknown as Event;
    component.establecerAvisoDeFuncionamiento(event);
    expect(storeMock.setAvisoDeFuncionamiento).toHaveBeenCalledWith(true);
  });

  it('should set LicenciaSanitaria', () => {
    const event = { target: { value: 'TestLicencia' } } as unknown as Event;
    component.establecerLicenciaSanitaria(event);
    expect(storeMock.setLicenciaSanitaria).toHaveBeenCalledWith('TestLicencia');
  });

  it('should set ClaveDeLosLotes', () => {
    const event = { target: { value: 'TestClave' } } as unknown as Event;
    component.establecerClaveDeLosLotes(event);
    expect(storeMock.setClaveDeLosLotes).toHaveBeenCalledWith('TestClave');
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should have correct table headers configuration', () => {
    // Test mercancias headers
    expect(component.mercanciasDatos.length).toBe(14);
    expect(component.mercanciasDatos[0].encabezado).toBe('Clasificación del producto');
    expect(component.mercanciasDatos[1].encabezado).toBe('Especificar Clasificación del producto');
    expect(component.mercanciasDatos[2].encabezado).toBe('Denominación específico del producto');
    expect(component.mercanciasDatos[3].encabezado).toBe('Marca');
    expect(component.mercanciasDatos[4].encabezado).toBe('Fracción arancelaria');
    expect(component.mercanciasDatos[5].encabezado).toBe('Descripción de la fracción arancelaria');
    expect(component.mercanciasDatos[6].encabezado).toBe('Unidad de medida de comercialización (UMC)');
    expect(component.mercanciasDatos[7].encabezado).toBe('Cantidad UMC');
    expect(component.mercanciasDatos[8].encabezado).toBe('Unidad de medida de tarifa (UMT)');
    expect(component.mercanciasDatos[9].encabezado).toBe('Cantidad UMT');
    expect(component.mercanciasDatos[10].encabezado).toBe('País de origen');
    expect(component.mercanciasDatos[11].encabezado).toBe('País de procedencia');
    expect(component.mercanciasDatos[12].encabezado).toBe('Tipo de producto');
    expect(component.mercanciasDatos[13].encabezado).toBe('Uso específico');

  });

  it('should have correct table headers configuration', () => {
    expect(component.encabezados.length).toBe(2);
    expect(component.encabezados[0].encabezado).toBe('Clave S.C.I.A.N.');
    expect(component.encabezados[1].encabezado).toBe('Descripción del S.C.I.A.N.');
  });

  it('should have correct table headers configuration', () => {
    expect(component.listaClave.length).toBe(3);
    expect(component.listaClave[0].encabezado).toBe('claveDeLosLotes');
    expect(component.listaClave[1].encabezado).toBe('fechaDeFabricacion');
    expect(component.listaClave[2].encabezado).toBe('fechaDeCaducidad');
  });


  it('should correctly extract values through clave functions', () => {
    const mockMercancia: Mercancia = {
      clasificaionProductos: '1',
      especificarProducto: 1234,
      nombreProductoEspecifico: 'Test Tech',
      marca: 'Test Comm',
      fraccionArancelaria: 'Test Eng',
      descripcionFraccionArancelaria: 'Test Desc',
      umc: 123,
      cantidadUMC: 'MX',
      umt: 'T-MEC',
      cantidadUMT: '2023-01-01',
      paisDeOrigen: '2024-01-01',
      paisDeProcedencia: 'CERT-123',
      tipoProducto: 1234,
      usoEspecifico: 'Test Uso',
    };


    // Test mercancia clave functions
    expect(component.mercanciasDatos[0].clave(mockMercancia)).toBe('1');
    expect(component.mercanciasDatos[1].clave(mockMercancia)).toBe(1234);
    expect(component.mercanciasDatos[2].clave(mockMercancia)).toBe('Test Tech');
    expect(component.mercanciasDatos[3].clave(mockMercancia)).toBe('Test Comm');
    expect(component.mercanciasDatos[4].clave(mockMercancia)).toBe('Test Eng');
    expect(component.mercanciasDatos[5].clave(mockMercancia)).toBe('Test Desc');
    expect(component.mercanciasDatos[6].clave(mockMercancia)).toBe(123);
    expect(component.mercanciasDatos[7].clave(mockMercancia)).toBe('CERT-123');

    expect(component.mercanciasDatos[8].clave(mockMercancia)).toBe('MX');
    expect(component.mercanciasDatos[9].clave(mockMercancia)).toBe('T-MEC');
    expect(component.mercanciasDatos[10].clave(mockMercancia)).toBe('2023-01-01');
    expect(component.mercanciasDatos[11].clave(mockMercancia)).toBe('2024-01-01');
    expect(component.mercanciasDatos[12].clave(mockMercancia)).toBe('CERT-123');
    expect(component.mercanciasDatos[13].clave(mockMercancia)).toBe(1234);
    expect(component.mercanciasDatos[14].clave(mockMercancia)).toBe('Test Uso');


  });

  it('should correctly extract values through clave functions', () => {
   
    const mockProductor: ListaClave = {
      claveDeLosLotes: 'John Doe',
      fechaDeFabricacion: 'TAX123',
      fechaDeCaducidad: '123 Main St',
      
    };

    // Test productores clave functions
    expect(component.listaClave[0].clave(mockProductor)).toBe('John Doe');
    expect(component.listaClave[1].clave(mockProductor)).toBe('TAX123');
    expect(component.listaClave[2].clave(mockProductor)).toBe('123 Main St');
    

  });

  it('should correctly extract values through clave functions', () => {
   

    const mockencabezados : ColumnasTabla = {
      claveScian:'abc',
      descripcionScian:'Test'
    }

   
    expect(component.encabezados[0].clave(mockencabezados)).toBe('abc');
    expect(component.encabezados[1].clave(mockencabezados)).toBe('Test');
    

  });

  it('should set esCheckboxSeleccionado to true when a checked checkbox is clicked', () => {
    // Arrange
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    jest.spyOn(checkbox, 'closest').mockImplementation((selector) => 
      selector === 'input[type="checkbox"]' ? checkbox : null
    );
    const event = { target: checkbox } as unknown as MouseEvent;

    // Act
    component.verificarSeleccionCheckbox(event);

    // Assert
    expect(component.esCheckboxSeleccionado).toBe(true);
  });

  it('should set esCheckboxSeleccionado to false when an unchecked checkbox is clicked', () => {
    // Arrange
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    jest.spyOn(checkbox, 'closest').mockImplementation((selector) => 
      selector === 'input[type="checkbox"]' ? checkbox : null
    );
    const event = { target: checkbox } as unknown as MouseEvent;

    // Act
    component.verificarSeleccionCheckbox(event);

    // Assert
    expect(component.esCheckboxSeleccionado).toBe(false);
  });

  it('should set esCheckboxSeleccionado to false when a non-checkbox element is clicked', () => {
    // Arrange
    const divElement = document.createElement('div');
    jest.spyOn(divElement, 'closest').mockReturnValue(null);
    const event = { target: divElement } as unknown as MouseEvent;

    // Act
    component.verificarSeleccionCheckbox(event);

    // Assert
    expect(component.esCheckboxSeleccionado).toBe(false);
  });

  it('should enable controls and set flag to true for "modificacion"', () => {
    // Arrange
    const form = new FormGroup({ tipoOperacion: new FormControl('modificacion') });
    const campo = 'tipoOperacion';

    // Act
    component.alCambiarSeleccion(form, campo);

    // Assert
    expect(component.esTipoOperacionSeleccionado).toBe(true);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enabled).toBe(true);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enabled).toBe(true);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enabled).toBe(true);
  });

  it('should disable controls and set flag to false for "modificacionYProrroga"', () => {
    // Arrange
    const form = new FormGroup({ tipoOperacion: new FormControl('modificacionYProrroga') });
    const campo = 'tipoOperacion';

    // Act
    component.alCambiarSeleccion(form, campo);

    // Assert
    expect(component.esTipoOperacionSeleccionado).toBe(false);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enabled).toBe(false);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enabled).toBe(false);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enabled).toBe(false);
  });

  it('should disable controls and set flag to false for "prorroga"', () => {
    // Arrange
    const form = new FormGroup({ tipoOperacion: new FormControl('prorroga') });
    const campo = 'tipoOperacion';

    // Act
    component.alCambiarSeleccion(form, campo);

    // Assert
    expect(component.esTipoOperacionSeleccionado).toBe(false);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enabled).toBe(false);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enabled).toBe(false);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enabled).toBe(false);
  });

  it('should do nothing for unknown values', () => {
    // Arrange
    const form = new FormGroup({ tipoOperacion: new FormControl('unknown') });
    const campo = 'tipoOperacion';
    // Set initial state
    component.esTipoOperacionSeleccionado = true;
    component.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enable();
    component.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enable();
    component.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enable();

    // Act
    component.alCambiarSeleccion(form, campo);

    // Assert
    expect(component.esTipoOperacionSeleccionado).toBe(true);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enabled).toBe(true);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enabled).toBe(true);
    expect(component.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enabled).toBe(true);
  });

});

