import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BandejaDeTareasPendientesComponent } from './bandeja-de-tareas-pendientes.component';
import { BandejaDeSolicitudeService } from '../services/bandeja-de-solicitude.service';
import { of, throwError } from 'rxjs';
import { JSONResponse, LibBandejaComponent } from '@libs/shared/data-access-user/src';

describe('BandejaDeTareasPendientesComponent (Jest)', () => {
  let component: BandejaDeTareasPendientesComponent;
  let fixture: ComponentFixture<BandejaDeTareasPendientesComponent>;
  let mockService: jest.Mocked<BandejaDeSolicitudeService>;

  const expectedData = [
    {
      folioTramite: 'ABC123',
      tipoDeTramite: 'Tipo',
      nombreDeLaTarea: 'Tarea',
      fechaDeAsignacion: '2024-05-01',
      estadoDeTramite: 'En proceso',
      departamento: 'Dept',
      numeroDeProcedimiento: 'P123',
      origin: 'Origen'
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
      getTareasPendientesTablaDatos: jest.fn()
    } as unknown as jest.Mocked<BandejaDeSolicitudeService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, LibBandejaComponent, BandejaDeTareasPendientesComponent],
      providers: [{ provide: BandejaDeSolicitudeService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaDeTareasPendientesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTareasPendientesTablaDatos and set dePendientesTablaDatos', () => {
    mockService.getTareasPendientesTablaDatos.mockReturnValue(of(mockResponse));

    component.getBandejaDeTablaDatos();

    expect(mockService.getTareasPendientesTablaDatos).toHaveBeenCalled();
    expect(component.dePendientesTablaDatos).toEqual(mockResponse);
  });

  it('should handle JSON parse string data', () => {
    const stringifiedDataResponse: JSONResponse = {
      id: 1,
      descripcion: 'Success',
      codigo: '200',
      data: JSON.stringify(expectedData)
    };

    mockService.getTareasPendientesTablaDatos.mockReturnValue(of(stringifiedDataResponse));

    component.getBandejaDeTablaDatos();

    expect(component.dePendientesTablaDatos).toEqual(stringifiedDataResponse);
  });

  it('should call getBandejaDeTablaDatos on ngOnInit', () => {
    mockService.getTareasPendientesTablaDatos.mockReturnValue(of(mockResponse));
    const spy = jest.spyOn(component, 'getBandejaDeTablaDatos');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should handle service error gracefully', () => {
    mockService.getTareasPendientesTablaDatos.mockReturnValue(throwError(() => new Error('API error')));

    component.getBandejaDeTablaDatos();
  
    expect(mockService.getTareasPendientesTablaDatos).toHaveBeenCalled();
    expect(component.dePendientesTablaDatos).toEqual([]);
  });
});
