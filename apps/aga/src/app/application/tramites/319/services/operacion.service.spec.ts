import { of } from 'rxjs';
import { OperacionService } from './operacion.service';
import { HttpClient } from '@angular/common/http';
import { Tramite319Store } from '../estados/tramite319Store.store';

describe('OperacionService', () => {
  let service: OperacionService;
  let httpMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<Tramite319Store>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
    } as any;
    storeMock = {
      actualizarTodo: jest.fn(),
    } as any;
    service = new OperacionService(httpMock, storeMock);
  });

  it('debe obtener la lista de catálogos correctamente', (done) => {
    const mockResponse = { data: [{ id: 1, nombre: 'México' }] };
    httpMock.get.mockReturnValue(of(mockResponse));
    service.obtenerSelectorList('paises.json').subscribe((result) => {
      expect(result).toEqual(mockResponse.data);
      expect(httpMock.get).toHaveBeenCalledWith(service.url + 'paises.json');
      done();
    });
  });

  it('debe obtener la lista de personas correctamente', (done) => {
    const mockResponse = [{ rfc: 'XAXX010101000', nombre: 'Juan' }];
    httpMock.get.mockReturnValue(of(mockResponse));
    service.obtenerTablerList('personas.json').subscribe((result) => {
      expect(result).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith(service.url + 'personas.json');
      done();
    });
  });

  it('debe obtener los datos de registro de toma de muestras correctamente', (done) => {
    const mockResponse = { datos: [], operacion: 'crear' };
    httpMock.get.mockReturnValue(of(mockResponse));
    service.getRegistroTomaMuestrasMercanciasData('registro.json').subscribe((result) => {
      expect(result).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith(service.url + 'registro.json');
      done();
    });
  });

  it('debe actualizar el estado del formulario llamando a actualizarTodo en el store', () => {
    const resp = { datos: [], operacion: 'editar' };
    service.actualizarEstadoFormulario(resp);
    expect(storeMock.actualizarTodo).toHaveBeenCalledWith(resp);
  });
});