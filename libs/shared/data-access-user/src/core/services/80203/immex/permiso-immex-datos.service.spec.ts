import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermisoImmexDatosService } from './permiso-immex-datos.service';

describe('PermisoImmexDatosService', () => {
  let service: PermisoImmexDatosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PermisoImmexDatosService]
    });
    service = TestBed.inject(PermisoImmexDatosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch permiso IMMEX datos', () => {
    const dummyData = [
      {
        permisoImmexDatos: [
          {
            tbodyData: ["1", "LAURA CONTRERAS", "LAURA CONTRERAS", "AEVL621207B95", "SAN GABRIEL 144 DURANGO", "laura2992@hotmail.com", "044-6182999535"]
          }
        ]
      }
    ];

    service.getDatos().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('assets/json/80203/permiso-immex-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handle error', () => {
    const errorMessage = 'Error al obtener los datos';

    service.getDatos().subscribe(
      () => fail('should have failed with the error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne('assets/json/80203/permiso-immex-datos.json');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
