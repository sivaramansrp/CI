import { SolicitudService } from './solicitud.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('SolicitudService (Jest)', () => {
  let service: SolicitudService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as any;
    service = new SolicitudService(httpClientMock);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar a getSolicitudes y devolver los datos esperados', (done) => {
    const mockData = [{ id: 1, name: 'Solicitud1' }];
    httpClientMock.get.mockReturnValue(of(mockData));

    service.getSolicitudes().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/260212/solicitud.json');
      done();
    });
  });

  it('debería llamar a getClave y devolver los datos esperados', (done) => {
    const mockData = [{ clave: 'A1', descripcion: 'Clave A1' }];
    httpClientMock.get.mockReturnValue(of(mockData));

    service.getClave().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/260212/clave.json');
      done();
    });
  });

  it('debería llamar a getOpcionesPublicacion y devolver los datos esperados', (done) => {
    const mockData = [{ opcion: 'Publicar' }];
    httpClientMock.get.mockReturnValue(of(mockData));

    service.getOpcionesPublicacion().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('/assets/json/260212/opciones-de-radio.json');
      done();
    });
  });

  it('debería llamar a getTestadoFisico y devolver los datos esperados', (done) => {
    const mockData = [{ estado: 'Solido' }];
    httpClientMock.get.mockReturnValue(of(mockData));

    service.getTestadoFisico().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('/assets/json/260212/estadoFisico.json');
      done();
    });
  });

  it('debería llamar a getClasificacionProducto y devolver los datos esperados', (done) => {
    const mockData = [{ clasificacion: 'Tipo1' }];
    httpClientMock.get.mockReturnValue(of(mockData));

    service.getClasificacionProducto().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('/assets/json/260212/clasificacionProducto.json');
      done();
    });
  });
});