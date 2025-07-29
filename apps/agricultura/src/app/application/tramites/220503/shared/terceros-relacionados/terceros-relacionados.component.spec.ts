import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { of, Subject } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let mockConsultaQuery: any;
  let mockCertificadoZoosanitarioServices: any;
  let mockTercerosrelacionadosService: any;
  let mockCertificadoZoosanitarioStore: any;

  beforeEach(() => {
    // Mock services and observables
    mockConsultaQuery = {
      selectConsultaioState$: of({ readonly: true })
    };
    mockCertificadoZoosanitarioServices = {
      getAllDatosForma: jest.fn().mockReturnValue(of({
      tercerosRelacionados: [
        {
        tipoMercancia: 'yes',
        nombre: 'Carlos',
        primerApellido: 'Ramírez',
        segundoApellido: 'Santos',
        razonSocial: 'ExportMex S.A.',
        pais: 'México',
        domicilio: 'Av. Reforma 123, CDMX',
        lada: '55',
        telefono: '5551234567',
        correo: 'carlos.ramirez@exportmex.com'
        },
        {
        tipoMercancia: 'no',
        nombre: 'Lucía',
        primerApellido: 'Fernández',
        segundoApellido: 'Gómez',
        razonSocial: 'AgroSur S.A.',
        pais: 'México',
        domicilio: 'Calle Sur 456, Monterrey',
        lada: '81',
        telefono: '8187654321',
        correo: 'lucia.fernandez@agrosur.com'
        }
      ],
      datosForma: [{ id: 2 }]
      })),
      updateTercerosRelacionado: jest.fn()
    };
    mockTercerosrelacionadosService = {
      obtenerSelectorList: jest.fn().mockReturnValue(of([{ id: 'MX', nombre: 'México' }]))
    };
    mockCertificadoZoosanitarioStore = {
      updatedatosForma: jest.fn(),
      actualizarSelectedTerceros: jest.fn(),
      actualizarSelectedExdora: jest.fn()
    };

    // Create instance
    component = new TercerosRelacionadosComponent(
      mockConsultaQuery,
      mockCertificadoZoosanitarioServices,
      mockTercerosrelacionadosService,
      mockCertificadoZoosanitarioStore
    );

    // Mock modal and child component
    component.modalRef = { abrir: jest.fn() } as any;
    component.tercerosRelacionados = { validarFormulario: jest.fn(() => true) } as any;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize values and fetch data in ngOnInit', () => {
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.personas.length).toBe(2);
    expect(component.datosForma.length).toBe(1);
  });

  it('should call pairsCatalogChange and estadoCatalogChange in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(mockTercerosrelacionadosService.obtenerSelectorList).toHaveBeenCalledWith('paisprocedencia.json');
    expect(mockTercerosrelacionadosService.obtenerSelectorList).toHaveBeenCalledWith('estados.json');
  });

  it('should clear personas and call updateTercerosRelacionado on handleEliminar', () => {
    component.personas = [{
      tipoMercancia: 'Física',
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      razonSocial: 'Agro S.A.',
      pais: 'México',
      codigoPostal: '12345',
      estado: 'Jalisco',
      municipio: 'Guadalajara',
      colonia: 'Centro',
      calle: 'Av. Principal',
      numeroExterior: '100',
      numeroInterior: '10',
      lada: '33',
      telefono: '12345678',
      correo: 'juan.perez@agro.com'
    }];
    component.handleEliminar();
    expect(component.personas).toEqual([]);
    expect(mockCertificadoZoosanitarioServices.updateTercerosRelacionado).toHaveBeenCalledWith([]);
  });

  it('should clear datosForma and call updatedatosForma on handleEliminarExportador', () => {
    component.datosForma = [{
      tipoMercancia: 'yes',
      nombre: 'Ana',
      primerApellido: 'López',
      segundoApellido: 'Martínez',
      razonSocial: 'Comercializadora Ana S.A.',
      pais: 'México',
      domicilio: 'Calle Norte 789, Guadalajara',
      lada: '33',
      telefono: '3312345678',
      correo: 'ana.lopez@comercializadora.com'
    }];
    component.handleEliminarExportador();
    expect(component.personas).toEqual([]);
    expect(mockCertificadoZoosanitarioStore.updatedatosForma).toHaveBeenCalledWith([]);
  });

  it('should open modal for destinatario with data', () => {
    const data = { id: 10 };
    component.abrirModalDestinatario(data as any);
    expect(mockCertificadoZoosanitarioStore.actualizarSelectedTerceros).toHaveBeenCalledWith(data);
    expect(component.modalRef.abrir).toHaveBeenCalled();
  });

  it('should open modal for exportador with data', () => {
    const data = { id: 20 };
    component.abrirModalExportador(data as any);
    expect(mockCertificadoZoosanitarioStore.actualizarSelectedExdora).toHaveBeenCalledWith(data);
    expect(component.modalRef.abrir).toHaveBeenCalled();
  });

  it('should call validarFormulario and return true', () => {
    const result = component.validarFormulario();
    expect(result).toBe(true);
    expect(component.tercerosRelacionados.validarFormulario).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['DESTROY_NOTIFIER$'], 'complete');
    const nextSpy = jest.spyOn(component['DESTROY_NOTIFIER$'], 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
