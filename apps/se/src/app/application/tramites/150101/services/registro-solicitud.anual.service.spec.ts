import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './registro-solicitud-anual.service';
import { ProgramasReporte } from '../models/programas-reporte.model';
import { ReporteFechas } from '../models/programas-reporte.model';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService],
    });

    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch programas-reporte data', () => {
    const mockProgramasReporte: ProgramasReporte[] = [
      { folioPrograma: '12345', tipoPrograma: 'Type A', modalidad: 'Modal A', estatus: 'Active' },
    ];

    service.obtenerProgramasReporte().subscribe((data) => {
      expect(data).toEqual(mockProgramasReporte);
    });

    const req = httpMock.expectOne('assets/json/150101/programas-reporte.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProgramasReporte);
  });

  it('should fetch reporte-fechas data', () => {
    const mockReporteFechas: ReporteFechas = {
      reporteAnualFechaInicio: '2023-01-01',
      reporteAnualFechaFin: '2023-12-31',
    };

    service.obtenerReporteFechas().subscribe((data) => {
      expect(data).toEqual(mockReporteFechas);
    });

    const req = httpMock.expectOne('assets/json/150101/reporte-fechas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockReporteFechas);
  });
});
