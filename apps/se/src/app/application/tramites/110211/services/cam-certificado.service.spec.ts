import { CamCertificadoService } from './cam-certificado.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CamState, camCertificadoStore } from '../estados/cam-certificado.store';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Mercancia } from '../../../shared/models/modificacion.enum';

describe('CamCertificadoService', () => {
  let service: CamCertificadoService;
  let httpMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<camCertificadoStore>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as any;

    storeMock = {
      setEstadoCompleto: jest.fn()
    } as any;

    service = new CamCertificadoService(httpMock, storeMock);
  });

  describe('obtenerMenuDesplegable', () => {
    it('should fetch and map catalogos from JSON', (done) => {
      const fileName = 'menu.json';
      const mockResponse: RespuestaCatalogos = { data: [{ id: 1, descripcion: 'Test' }] as Catalogo[], code: 200, message: 'OK' };
      httpMock.get.mockReturnValue(of(mockResponse));

      service.obtenerMenuDesplegable(fileName).subscribe(result => {
        expect(httpMock.get).toHaveBeenCalledWith('../../../../../assets/json/110211/menu.json');
        expect(result).toEqual(mockResponse.data);
        done();
      });
    });
  });

  describe('obtenerTablaDatos', () => {
    it('should fetch Mercancia array from JSON', (done) => {
      const fileName = 'data.json';
      const mockData: Mercancia[] = [{
        fraccionArancelaria: '12345678',
        numeroDeRegistrodeProductos: 'REG456',
        fechaExpedicion: '2024-02-01',
        fechaVencimiento: '2025-02-01',
        nombreTecnico: 'Ácido Acético',
        nombreComercial: 'Vinagre Industrial',
        normaOrigen: 'NOM-001',
        id: '1',
        cantidad: '100',
        umc: 'kg',
        tipoFactura: 'Exportación',
        valorMercancia: '5000',
        fechaFinalInput: '2024-12-31',
        numeroFactura: 'FAC-2024-001',
        unidadMedidaMasaBruta: 'kg',
        complementoClasificacion: 'Clase A',
        complementoDescripcion: 'Producto químico para laboratorio'
      } as Mercancia];
      httpMock.get.mockReturnValue(of(mockData));

      service.obtenerTablaDatos(fileName).subscribe(result => {
        expect(httpMock.get).toHaveBeenCalledWith('../../../../../assets/json/110211/data.json');
        expect(result).toEqual(mockData);
        done();
      });
    });
  });

  describe('obtenerTodosDatosCamCertificado', () => {
    it('should fetch CamState from JSON', (done) => {
      const fileName = 'camcertificado.json';
      const mockState: CamState = { some: 'state' } as any;
      httpMock.get.mockReturnValue(of(mockState));

      service.obtenerTodosDatosCamCertificado(fileName).subscribe(result => {
        expect(httpMock.get).toHaveBeenCalledWith('../../../../../assets/json/110211/camcertificado.json');
        expect(result).toEqual(mockState);
        done();
      });
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('should call setEstadoCompleto on store', () => {
      const datos: CamState = { foo: 'bar' } as any;
      service.actualizarEstadoFormulario(datos);
      expect(storeMock.setEstadoCompleto).toHaveBeenCalledWith(datos);
    });
  });
});