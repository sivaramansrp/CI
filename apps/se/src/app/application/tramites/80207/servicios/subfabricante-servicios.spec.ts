import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubfabricanteService } from './servicios-subfabricante.service';
import { Tramites80207Store } from '../estados/tramite80207.store';
import { InfoRegistro, SubfabricanteDireccionModelo, Tramite80207State } from '../modelos/subfabricante.model';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

describe('SubfabricanteService', () => {
  let service: SubfabricanteService;
  let httpMock: HttpTestingController;
  let tramites80207StoreMock: Partial<Tramites80207Store>;

  beforeEach(() => {
    tramites80207StoreMock = {
      setInfoRegistro: jest.fn(),
      setDatosContr: jest.fn(),
      setPlantasBuscadas: jest.fn(),
      setFormValida: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SubfabricanteService,
        { provide: Tramites80207Store, useValue: tramites80207StoreMock },
      ],
    });

    service = TestBed.inject(SubfabricanteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch datos de registro and subcontratista', () => {
    const mockResponse = { data: { infoRegistro: { modalidad: 'test', folio: '123', ano: 2023 } } };

    service.getDatos().subscribe((data: InfoRegistro) => {
      expect(data).toEqual(mockResponse.data.infoRegistro);
    });

    const req = httpMock.expectOne('assets/json/80207/submanufacturer-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

 

  it('should fetch lista de subfabricantes disponibles', () => {
    const mockResponse = { data: [{ calle: 'Test Street', numExterior: 123 }] };

    service.getSubfabricantesDisponibles().subscribe((data: SubfabricanteDireccionModelo[]) => {
      expect(data).toEqual(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/80207/submanufactureras-disponibles-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update formulario state', () => {
    const mockState: Tramite80207State = {
      infoRegistro: { modalidad: 'test', folio: '123', ano: 2023 },
      datosSubcontratista: { rfc: 'RFC123', estado: 'Test State' },
      plantasBuscadas: [],
      plantasSubfabricantesAgregar: [],
      formaValida: { esDatosSubcontratistaValido: true },
    };

    service.actualizarEstadoFormulario(mockState);

    expect(tramites80207StoreMock.setInfoRegistro).toHaveBeenCalledWith(mockState.infoRegistro);
    expect(tramites80207StoreMock.setDatosContr).toHaveBeenCalledWith(mockState.datosSubcontratista);
    expect(tramites80207StoreMock.setPlantasBuscadas).toHaveBeenCalledWith(mockState.plantasBuscadas);
    expect(tramites80207StoreMock.setFormValida).toHaveBeenCalledWith(mockState.formaValida);
  });

  it('should fetch datos de servicios de submanufactureras', () => {
    const mockResponse: Tramite80207State = {
      infoRegistro: { modalidad: 'test', folio: '123', ano: 2023 },
      datosSubcontratista: { rfc: 'RFC123', estado: 'Test State' },
      plantasBuscadas: [],
      plantasSubfabricantesAgregar: [],
      formaValida: { esDatosSubcontratistaValido: true },
    };

    service.getServiciosData().subscribe((data: Tramite80207State) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80207/datos-submanufactureras.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});