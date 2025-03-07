import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite80207State } from '../modelos/submanufacturer-modelos';
import { SubManufacturerService } from './servicios-submanufacturer-servico';


const mockSubManufacturerDatos: Tramite80207State = {
    infoRegistro: {
      modalidad: 'Modalidad Test',
      folio: 'Folio 12345',
      ano: 2022,
    },
    datosSubcontratista: {
      rfc: 'RFC12345',
      estado: 'Activo',
    },
    plantasSubfabricantesAgregar:[],
    plantasBuscadas:[],
    formaValida: {
      esDatosSubcontratistaValido:false
    },
  };

describe('ServiciosExtraordinariosService', () => {
  let service: SubManufacturerService;
 let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], // Import HttpClientTestingModule if the service makes HTTP requests
      providers: [SubManufacturerService], // Provide the service
    });
    service = TestBed.inject(SubManufacturerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should fetch submanufacturer data and return mapped data', () => {
    service.getDatos().subscribe((data) => {
      // Assert that the data returned matches the expected structure
      expect(data).toEqual(mockSubManufacturerDatos.infoRegistro); // The service is returning 'data' part, so we check 'infoRegistro'
    });

    // Mock the HTTP request and provide the mock data
    const req = httpMock.expectOne('assets/json/80207/submanufacturer-datos.json');
    expect(req.request.method).toBe('GET'); // Ensure the request method is GET
    req.flush({ data: mockSubManufacturerDatos }); // Simulate the response with 'data' as the key
  });
});


