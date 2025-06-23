import { TestBed } from '@angular/core/testing';
import { SolicitudDeRegistroTplService } from './solicitud-de-registro-tpl.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Tramite120101Store } from '../../../estados/tramites/tramite120101.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { InsumosTabla } from '../models/insumos.model';

describe('SolicitudDeRegistroTplService', () => {
  let service: SolicitudDeRegistroTplService;
  let httpMock: HttpTestingController;
  let store: Tramite120101Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolicitudDeRegistroTplService,
        { provide: Tramite120101Store, useClass: Tramite120101Store },
      ],
    });
    service = TestBed.inject(SolicitudDeRegistroTplService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Tramite120101Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch clasificacion regimen data', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Example' }];

    service.getClasificacionRegimenData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/120101/clasificacion-del-regimen.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should set and get tablaInsumosTemp', () => {
    const insumos: InsumosTabla[] = [
      {
        DescripcionDelInsumo: 'Desc',
        FraccionArancelaria: '123',
        PaisDeOrigen: 'México',
      },
    ];

    service.establecerTablaInsumos(insumos);
    const result = service.obtenerTablaInsumos();
    expect(result).toEqual(insumos);
  });

  it('should call setDynamicFieldValue from store', () => {
  jest.spyOn(store, 'setDynamicFieldValue');
  service.actualizarEstadoFormulario('pais', 'México');
  expect(store.setDynamicFieldValue).toHaveBeenCalledWith('pais', 'México');
});
});
