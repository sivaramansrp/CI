import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportadorExportadorService } from './importador-exportador.service';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Tramite10301Store } from '../../10301/estados/tramite10301.store';

describe('ImportadorExportadorService', () => {
  let service: ImportadorExportadorService;
  let httpMock: HttpTestingController;
  let store: Tramite10301Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImportadorExportadorService, Tramite10301Store]
    });

    service = TestBed.inject(ImportadorExportadorService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Tramite10301Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});