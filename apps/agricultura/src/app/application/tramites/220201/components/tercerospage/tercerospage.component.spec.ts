import { TestBed } from '@angular/core/testing';
import { TercerospageComponent } from './tercerospage.component';
import { of, Subject } from 'rxjs';

describe('TercerospageComponent', () => {
  let component: TercerospageComponent;
  let consultaQueryMock: any;
  let certificadoZoosanitarioServicesMock: any;
  let certificadoZoosanitarioQueryMock: any;
  let tercerosrelacionadosServiceMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ readonly: true })
    };
    certificadoZoosanitarioServicesMock = {
      updateTercerosRelacionado: jest.fn()
    };
    certificadoZoosanitarioQueryMock = {
      seleccionarTercerosRelacionados$: of([{ nombre: 'Persona 1' }])
    };
    tercerosrelacionadosServiceMock = {
      obtenerSelectorList: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Test' }]))
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: 'ConsultaioQuery', useValue: consultaQueryMock },
        { provide: 'CertificadoZoosanitarioServiceService', useValue: certificadoZoosanitarioServicesMock },
        { provide: 'ZoosanitarioQuery', useValue: certificadoZoosanitarioQueryMock },
        { provide: 'TercerosrelacionadosService', useValue: tercerosrelacionadosServiceMock }
      ]
    }).compileComponents();

    // Manual instantiation since standalone component
    component = new TercerospageComponent(
      consultaQueryMock,
      certificadoZoosanitarioServicesMock,
      certificadoZoosanitarioQueryMock,
      tercerosrelacionadosServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and set esFormularioSoloLectura and personas on ngOnInit', () => {
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
    expect(component.personas.length).toBe(1);
    expect(component.personas[0].nombre).toBe('Persona 1');
  });

  it('should load paises and estados catalogs on ngAfterViewInit', () => {
    component.catalogosDatos = { paises: [], estados: [] };
    component.ngAfterViewInit();
    expect(tercerosrelacionadosServiceMock.obtenerSelectorList).toHaveBeenCalledWith('paisprocedencia.json');
    expect(tercerosrelacionadosServiceMock.obtenerSelectorList).toHaveBeenCalledWith('estados.json');
  });

  it('should update catalogosDatos.paises on pairsCatalogChange', () => {
    component.catalogosDatos = { paises: [], estados: [] };
    component.pairsCatalogChange();
    expect(component.catalogosDatos.paises.length).toBeGreaterThan(0);
  });

  it('should update catalogosDatos.estados on estadoCatalogChange', () => {
    component.catalogosDatos = { paises: [], estados: [] };
    component.estadoCatalogChange();
    expect(component.catalogosDatos.estados.length).toBeGreaterThan(0);
  });

  it('should clear personas and call updateTercerosRelacionado on handleEliminar', () => {
    component.personas = [{
      tipoMercancia: '',
      nombre: 'Persona 1',
      primerApellido: '',
      segundoApellido: '',
      razonSocial: '',
      pais: '',
      codigoPostal: '',
      estado: '',
      municipio: '',
      colonia: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      lada: '',
      telefono: '',
      correo: ''
    }];
    component.handleEliminar();
    expect(component.personas.length).toBe(0);
    expect(certificadoZoosanitarioServicesMock.updateTercerosRelacionado).toHaveBeenCalledWith([]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});