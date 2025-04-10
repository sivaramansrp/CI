import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';

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
      aceptar: jest.fn().mockReturnValue(of({})),
      claveScianSeleccion: jest.fn().mockReturnValue(of({})),
      seleccionarEstablecimiento: jest.fn().mockReturnValue(of({})),
      agregarMercanciaGrid: jest.fn().mockReturnValue(of({})),
      verificarSeleccionCheckbox: jest.fn().mockReturnValue(of({})),
      alCambiarSeleccion: jest.fn().mockReturnValue(of({})),
      eliminarMercanciaGrid: jest.fn().mockReturnValue(of({})),
      establecerAvisoDeFuncionamiento: jest.fn().mockReturnValue(of({})),
      establecerLicenciaSanitaria: jest.fn().mockReturnValue(of({})),
      paisOrigenColapsable: jest.fn().mockReturnValue(of({})),
      paisProcedencis_colapsable: jest.fn().mockReturnValue(of({})),
      establecerClaveDeLosLotes: jest.fn().mockReturnValue(of({})),
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

  it('should fetch Estado data', () => {
    component.claveScianSeleccion();
    expect(consultaServiceMock.claveScianSeleccion).toHaveBeenCalled();
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
});