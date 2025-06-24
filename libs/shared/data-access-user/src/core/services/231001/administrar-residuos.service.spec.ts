import { AdministrarResiduosService } from './administrar-residuos.service';
import { HttpCoreService } from '../shared/http/http.service';
import { of, throwError } from 'rxjs';

describe('AdministrarResiduosService', () => {
  let service: AdministrarResiduosService;
  let httpMock: jest.Mocked<HttpCoreService>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as any;

    service = new AdministrarResiduosService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data from getAdministrarResiduos', (done) => {
    const mockData = { foo: 'bar' };
    httpMock.get.mockReturnValue(of(mockData));

    service.getAdministrarResiduos().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpMock.get).toHaveBeenCalledWith('./assets/json/231001/administrar-residuos-mesa.json');
      done();
    });
  });

  it('should handle error in getAdministrarResiduos', (done) => {
    const mockError = new Error('Test error');
    httpMock.get.mockReturnValue(throwError(() => mockError));

    service.getAdministrarResiduos().subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toBe(mockError);
        done();
      }
    });
  });
});