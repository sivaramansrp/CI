import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CancelarSolicitudService } from './cancelar-solicitud.service';
import { CancelarSolicitudForm } from '../modelos/cancelar-solicitud.modalidad.model';

describe('CancelarSolicitudService', () => {
  let service: CancelarSolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancelarSolicitudService],
    });

    service = TestBed.inject(CancelarSolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cancelarSolicitud data from the specified URL', () => {
    const mockData: CancelarSolicitudForm = {
      folioSVEX: "SVEX470000012025",
      folioVUCEM: "01057001000120252470000002",
      tipoDeCancelacion: "",
      horaInicio: "06:00",
      horaFin: "23:00",
      descripcion: "",
      fechasSeleccionadas: {
          selectedFechas: [] 
      }
    };

    service.getCancelarSolicitud().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/570101/cancelarSolicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle HTTP error gracefully', () => {
    const errorMessage = 'Failed to fetch data';

    service.getCancelarSolicitud().subscribe({
      next: () => fail('Should have failed with an error'),
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('/assets/json/570101/cancelarSolicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should fetch selectRangoDias data from the specified URL', () => {
    const mockData: string[] = ['2023-01-01', '2023-01-02'];

    service.getSelectRangoDias().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/570101/selectRangoDias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch tipoSolicitud data from the specified URL', () => {
    const mockData = [
      { modalidad: 'Total' },
      { modalidad: 'Parcial' },
    ];

    service.getTipoSolicitud().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/570101/tipoSolicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
