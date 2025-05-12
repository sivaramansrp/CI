import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { ReporteFechas } from '../models/programas-reporte.model';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService]
    });
    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve report dates from the API via GET', () => {
    const dummyReporteFechas: ReporteFechas = { inicio: '2023-01-01', fin: '2023-12-31' };

    service.obtenerReporteFechas().subscribe((fechas) => {
      expect(fechas).toEqual(dummyReporteFechas);
    });

    const req = httpMock.expectOne('assets/json/150102/reporte-fechas.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyReporteFechas);
  });
});