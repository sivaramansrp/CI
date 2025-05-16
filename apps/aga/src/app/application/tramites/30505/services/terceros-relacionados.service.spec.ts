import { TercerosRelacionadosService } from './terceros-relacionados.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TercerosRelacionadosService', () => {
  let service: TercerosRelacionadosService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = { get: jest.fn() };
    service = new TercerosRelacionadosService(httpMock as HttpClient);
  });

  it('should call http.get with correct URL for obtenerDatos', () => {
    const mockResponse = { foo: 'bar' };
    httpMock.get.mockReturnValue(of(mockResponse));
    service.obtenerDatos().subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/30505/aviso.json');
  });

  it('should call http.get with correct URL and params for obtenerDatosPersona', () => {
    const mockResponse = { baz: 'qux' };
    httpMock.get.mockReturnValue(of(mockResponse));
    const rfc = 'ABC123';
    service.obtenerDatosPersona(rfc).subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    expect(httpMock.get).toHaveBeenCalledWith(
      'assets/json/30505/fusion.json',
      { params: { rfc } }
    );
  });
});
