import { TestBed } from '@angular/core/testing';
import { CertificadoZoosanitarioServiceService } from './certificado-zoosanitario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('CertificadoZoosanitarioServiceService', () => {
  let service: CertificadoZoosanitarioServiceService;
  let mockZoosanitarioStore: any;

  const mockStoreData = {
    datosDeLaSolicitud: { tipoMercancia: 'yes' },
    datosParaMovilizacionNacional: {},
    pagoDeDerechos: {},
    validarEnvio: {},
    tercerosRelacionados: [],
  };

  beforeEach(() => {
    mockZoosanitarioStore = {
      _select: jest.fn().mockReturnValue(of(mockStoreData)),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CertificadoZoosanitarioServiceService,
        { provide: ZoosanitarioStore, useValue: mockZoosanitarioStore },
        { provide: SeccionLibStore, useValue: {} },
      ],
    });

    service = TestBed.inject(CertificadoZoosanitarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all form data from store via getAllDatosForma()', (done) => {
    service.getAllDatosForma().subscribe((data) => {
      expect(mockZoosanitarioStore._select).toHaveBeenCalled();
      expect(data).toEqual(mockStoreData);
      done();
    });
  });
});
