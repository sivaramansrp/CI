import { TestBed } from '@angular/core/testing';

import { ExpedicionCertificadosAsignacionService } from './expedicion-certificados-asignacion.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('ExpedicionCertificadosAsignacionService', () => {
  let service: ExpedicionCertificadosAsignacionService;  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedicionCertificadosAsignacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the correct URL for getAniosAutorizacionCatalogo', () => {
    const httpSpy = jest.spyOn(TestBed.inject(HttpClient), 'get');
    service.getAniosAutorizacionCatalogo();
    expect(httpSpy).toHaveBeenCalledWith('assets/json/120202/anios-autorizacion-catalogo.json');
  });
  
  it('should return an observable from getAniosAutorizacionCatalogo', (done) => {
    const mockResponse = { data: [{ id: 1, name: '2023' }] };
    jest.spyOn(TestBed.inject(HttpClient), 'get').mockReturnValue(of(mockResponse));
  
    service.getAniosAutorizacionCatalogo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });
  
  it('should call HttpClient.get with the correct URL for getNumeroOficioAsignacionDetalle', () => {
    const httpSpy = jest.spyOn(TestBed.inject(HttpClient), 'get');
    service.getNumeroOficioAsignacionDetalle();
    expect(httpSpy).toHaveBeenCalledWith('assets/json/120202/numero-oficio-asignacion-detalle.json');
  });
  
  it('should return an observable from getNumeroOficioAsignacionDetalle', (done) => {
    const mockResponse = { detalle: 'Test Detail' };
    jest.spyOn(TestBed.inject(HttpClient), 'get').mockReturnValue(of(mockResponse));
  
    service.getNumeroOficioAsignacionDetalle().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });  
});