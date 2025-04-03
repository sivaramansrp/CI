import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RenunciaDeDerechosAlServicio } from '../../../../../../../../libs/shared/data-access-user/src/core/services/140111/renuncia-de-derechos-al.service';
import { PermisoFormInterface } from '../model/renuncia-de-derechos.model';

describe('RenunciaDeDerechosAlServicio', () => {
  let service: RenunciaDeDerechosAlServicio;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RenunciaDeDerechosAlServicio]
    });
    service = TestBed.inject(RenunciaDeDerechosAlServicio);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the description of the cupo', () => {
    const mockResponse: PermisoFormInterface = {
        "folioTrámite": "1701300200420241702000028",
        "tipoDeSolicitud": "Inicial",
        "régimen": "Definitivos",
        "clasificaciónDelRégimen": "De exportación",
        "periodoDeVigencia": "Largo Plazo",
        "unidadDeMedida": "Litro",
        "fracciónArancelaria": "27111101",
        "cantidadAutorizada": "100.00",
        "valorAutorizado": "100",
        "nico": "00",
        "descripciónNico": "Gas Natural.",
        "acotación": "Licuado",
        "permisoVálidoDesde": "29/08/2024",
        "permisoVálidoHasta": "29/08/2029",
        "motivoRenunciaDeDerechos": "",
        "controlar": false
    };

    service.getDescripcionDelCupo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/140111/renuncia-de-derechos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});