import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModificatNoticeService } from './modificat-notice.service';
import { ReprestantanteData } from '../models/aduaneras-informaciones.model';
import { Aduana } from '../models/aduaneras-informaciones.model';

describe('ModificatNoticeService', () => {
  let service: ModificatNoticeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para simular solicitudes HTTP
      providers: [ModificatNoticeService], // Proporciona el servicio que se está probando
    });

    service = TestBed.inject(ModificatNoticeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería recuperar los datos del representante desde un archivo JSON', () => {
    const mockReprestantanteData: ReprestantanteData = {
      rfc: 'RFC123',
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
    };

    service.ObtenerReprestantanteData().subscribe((data) => {
      expect(data).toEqual(mockReprestantanteData);
    });

    const req = httpMock.expectOne('assets/json/260605/represtantante.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockReprestantanteData); // Simula la respuesta del servidor
  });

  it('debería manejar errores al recuperar los datos del representante', () => {
    const mockError = new ErrorEvent('Network error');

    service.ObtenerReprestantanteData().subscribe({
      next: () => fail('Se esperaba un error, pero se recibió una respuesta exitosa'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('assets/json/260605/represtantante.json');
    req.error(mockError); // Simula un error de red
  });

  it('debería recuperar la lista de aduanas disponibles desde un archivo JSON', () => {
    const mockAduanas: Aduana[] = [
      { id: 1, name: 'Aduana 1' },
      { id: 2, name: 'Aduana 2' },
    ];

    service.obteneraduanasDisponiblesdatos().subscribe((data) => {
      expect(data).toEqual(mockAduanas);
    });

    const req = httpMock.expectOne('assets/json/260605/aduaneras-informaciones.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAduanas); // Simula la respuesta del servidor
  });

  it('debería manejar errores al recuperar la lista de aduanas disponibles', () => {
    const mockError = new ErrorEvent('Network error');

    service.obteneraduanasDisponiblesdatos().subscribe({
      next: () => fail('Se esperaba un error, pero se recibió una respuesta exitosa'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('assets/json/260605/aduaneras-informaciones.json');
    req.error(mockError); // Simula un error de red
  });
});