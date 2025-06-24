import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ExportacionService } from './exportacion.service';
import { PermisoModel } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

describe('ExportacionService', () => {
  let service: ExportacionService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        ExportacionService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(ExportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocalidaddata', () => {
    it('should return data from the http get', (done) => {
      const mockData = { foo: 'bar' };
      httpClientMock.get.mockReturnValue(of(mockData));
      service.getLocalidaddata().subscribe(data => {
        expect(data).toEqual(mockData);
        done();
      });
    });

    it('should handle error and call throwError', (done) => {
      const error = new Error('Test error');
      httpClientMock.get.mockReturnValue(throwError(() => error));
      service.getLocalidaddata().subscribe({
        error: (err) => {
          expect(err).toBe(error);
          done();
        }
      });
    });
  });

  describe('getTable', () => {
    it('should return PermisoModel[] from http get', (done) => {
      const mockTable: PermisoModel[] = [{ id: 1 } as unknown as PermisoModel];
      httpClientMock.get.mockReturnValue(of(mockTable));
      service.getTable().subscribe(data => {
        expect(data).toEqual(mockTable);
        done();
      });
    });
  });
});
