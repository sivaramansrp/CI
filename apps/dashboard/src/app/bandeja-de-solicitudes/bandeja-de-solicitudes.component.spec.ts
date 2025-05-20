import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BandejaDeSolicitudesComponent } from './bandeja-de-solicitudes.component';
import { BandejaDeSolicitudeService } from '../services/bandeja-de-solicitude.service';
import { of, throwError } from 'rxjs';
import { LibBandejaComponent, BandejaDeSolicitudes, JSONResponse } from '@libs/shared/data-access-user/src';

describe('BandejaDeSolicitudesComponent (Jest)', () => {
  let component: BandejaDeSolicitudesComponent;
  let fixture: ComponentFixture<BandejaDeSolicitudesComponent>;
  let mockService: jest.Mocked<BandejaDeSolicitudeService>;

  const expectedData: BandejaDeSolicitudes[] = [
    {
      id: 1,
      tipoDeTramite: "Solicitud de Permiso",
      fecha: "2023-10-01",
      fechaActualizacion: "2023-10-05",
      diasTranscurridos: "4",
      departamento: "AGA",
      numeroDeProcedimiento: "301"
    }
  ];
  
  const mockResponse: JSONResponse = {
    id: 1,
    descripcion: 'Success',
    codigo: '200',
    data: expectedData as any
  };
  

  beforeEach(async () => {
    mockService = {
      getSolicitudeTablaDatos: jest.fn()
    } as unknown as jest.Mocked<BandejaDeSolicitudeService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, LibBandejaComponent, BandejaDeSolicitudesComponent],
      providers: [{ provide: BandejaDeSolicitudeService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaDeSolicitudesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSolicitudeTablaDatos and set bandejaTablaDatos', () => {
    mockService.getSolicitudeTablaDatos.mockReturnValue(of(mockResponse));

    component.getSolicitudeTablaDatos();

    expect(mockService.getSolicitudeTablaDatos).toHaveBeenCalled();
    expect(component.bandejaTablaDatos).toEqual(mockResponse);
  });

  it('should call getSolicitudeTablaDatos on ngOnInit', () => {
    mockService.getSolicitudeTablaDatos.mockReturnValue(of(mockResponse));
    const spy = jest.spyOn(component, 'getSolicitudeTablaDatos');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should handle service error gracefully', () => {
    const mockError = new Error('Test error');
  mockService.getSolicitudeTablaDatos.mockReturnValue(throwError(() => mockError));

  expect(() => component.getSolicitudeTablaDatos()).not.toThrow();
  expect(mockService.getSolicitudeTablaDatos).toHaveBeenCalled();
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
