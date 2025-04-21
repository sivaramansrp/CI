import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvoCarService } from './invocar.service';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Tramite10301Store } from '../../10301/estados/tramite10301.store';
import { Tramite105Store } from '../../105/estados/tramite105.store';

describe('ImportadorExportadorService', () => {
  let service: InvoCarService;
  let httpMock: HttpTestingController;
  let store: Tramite10301Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvoCarService, Tramite10301Store]
    });

    service = TestBed.inject(InvoCarService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Tramite10301Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should run #getAduanaIngresara()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: 'Aduana 1' },
        { id: 2, descripcion: 'Aduana 2' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setAduana');

    service.getAduana().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/10301/aduanaIngresara.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should run #getAno()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: '2021' },
        { id: 2, descripcion: '2022' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setAno');

    service.getAno().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/10301/ano.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should run #getCondicion()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: 'Nuevo' },
        { id: 2, descripcion: 'Usado' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setCondicion');

    service.getColonia().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/10301/condicion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should run #getPais()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: 'México' },
        { id: 2, descripcion: 'Estados Unidos' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setPais');

    service.getPais().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/105/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should run #getTipoDocumento()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: 'Pasaporte' },
        { id: 2, descripcion: 'Visa' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setTipoDocumento');

    service.getTipoDocumento().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/10301/tipodocumento.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should run #getFechasSeleccionadas()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: 'Fecha 1' },
        { id: 2, descripcion: 'Fecha 2' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setFechasSeleccionadas');

    service.getFechasSeleccionadas().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/10301/fechasSeleccionadas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should run #getDocumentos()', () => {
    const mockResponse: RespuestaCatalogos = {
      data: [
        { id: 1, descripcion: 'Documento 1' },
        { id: 2, descripcion: 'Documento 2' }
      ],
      code: 0,
      message: ''
    };

    const spy = jest.spyOn(store, 'setDocumentos');

    service.getDocumentos().subscribe(response => {
      expect(response).toEqual(mockResponse.data);
      expect(spy).toHaveBeenCalledWith(mockResponse.data);
    });

    const req = httpMock.expectOne('assets/json/10301/documentos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  describe('InvoCarService', () => {
    let service: InvoCarService;
    let httpMock: HttpTestingController;
    let store: Tramite105Store;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [InvoCarService, Tramite105Store]
      });

      service = TestBed.inject(InvoCarService);
      httpMock = TestBed.inject(HttpTestingController);
      store = TestBed.inject(Tramite105Store);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should fetch and set Pais data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'México' }, { id: 2, descripcion: 'Estados Unidos' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setPais');

      service.getPais().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/pais.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch and set Entidad Federativa data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'Entidad 1' }, { id: 2, descripcion: 'Entidad 2' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setEntidadFederativa');

      service.getEntidadFederativa().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/entidadfederativa.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch and set Colonia data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'Colonia 1' }, { id: 2, descripcion: 'Colonia 2' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setColonia');

      service.getColonia().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/colonia.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch and set Fechas Seleccionadas data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'Fecha 1' }, { id: 2, descripcion: 'Fecha 2' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setEntidadFederativa');

      service.getFechasSeleccionadas().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/fechasSeleccionadas.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch and set Fracción Arancelaria Options data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'Option 1' }, { id: 2, descripcion: 'Option 2' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setFraccionarancelaria');

      service.getFraccionArancelariaOptions().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/fracciónarancelaria-options.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch and set Municipio Delegacion data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'Municipio 1' }, { id: 2, descripcion: 'Municipio 2' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setMunicipioDelegacion');

      service.getMunicipioDelegacion().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/municipiodelegacion.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch and set Aduana data', () => {
      const mockResponse: RespuestaCatalogos = {
        data: [{ id: 1, descripcion: 'Aduana 1' }, { id: 2, descripcion: 'Aduana 2' }],
        code: 0,
        message: ''
      };

      const spy = jest.spyOn(store, 'setAduana');

      service.getAduana().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(spy).toHaveBeenCalledWith(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/105/aduana.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});