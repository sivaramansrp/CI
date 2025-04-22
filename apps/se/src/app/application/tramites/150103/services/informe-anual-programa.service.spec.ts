import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InformeAnualProgramaService } from './informe-anual-programa.service';
import { ProgramasReporte } from '../models/programas-reporte.model';
import { ReporteFechas } from '../models/programas-reporte.model';

describe('SolicitudService', () => {
  let service: InformeAnualProgramaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InformeAnualProgramaService],
    });

    service = TestBed.inject(InformeAnualProgramaService);
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

    const req = httpMock.expectOne('assets/json/150103/programas-reporte.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProgramasReporte);
  });

  it('should fetch reporte-fechas data', () => {
    const mockReporteFechas: ReporteFechas = {
      inicio: '',
      fin: ''
    };

    service.obtenerReporteFechas().subscribe((data) => {
      expect(data).toEqual(mockReporteFechas);
    });

    const req = httpMock.expectOne('assets/json/150103/reporte-fechas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockReporteFechas);
  });
});
