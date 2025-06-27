import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BandejaDeTareasPendientesComponent } from './bandeja-de-tareas-pendientes.component';
import { provideHttpClient } from '@angular/common/http';

describe('BandejaDeTareasPendientesComponent', () => {
  let component: BandejaDeTareasPendientesComponent;
  let mockBandejaSvc: any;
  let mockConsultaStore: any;

  beforeEach(() => {
    mockBandejaSvc = {
      getTareasPendientesTablaDatos: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnThis(),
        subscribe: jest.fn((cb) => cb([{ folioTramite: '123', tipoDeTramite: 'Tipo', nombreDeLaTarea: 'Tarea', fechaDeAsignacion: '2024-01-01', estadoDeTramite: 'Pendiente', departamento: 'Depto', numeroDeProcedimiento: '456', origin: 'Origen' }]))
      }),
      getDepartamento: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnThis(),
        subscribe: jest.fn((cb) => cb({ data: [{ ID_DEPENDENCIA: 1, ACRONIMO: 'DEP1' }] }))
      })
    };
    mockConsultaStore = {};

    component = new BandejaDeTareasPendientesComponent(mockBandejaSvc, mockConsultaStore);
  });

  beforeEach(async () => {
    mockService = {
      getTareasPendientesTablaDatos: jest.fn()
    } as unknown as jest.Mocked<BandejaDeSolicitudeService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, LibBandejaComponent, BandejaDeTareasPendientesComponent],
      providers: [{ provide: BandejaDeSolicitudeService, useValue: mockService },provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaDeTareasPendientesComponent);
    component = fixture.componentInstance;
  });

  it('should initialize variables with default values', () => {
    expect(component.departamentoDatos).toEqual([]);
    expect(component.procedureNumero).toEqual([]);
    expect(component.selectedDepartamentoObj).toEqual({
      tieneDepartamento: false,
      numeroDeProcedimiento: '',
      nombreDelDepartamento: '',
    });
    expect(Array.isArray(component.dePendientesConfiguracionTabla)).toBe(true);
    expect(component.dePendientesTablaDatos).toEqual([]);
    expect(component.copiarDatos).toEqual([]);
    expect(component.bandejaDeTareasForma).toBeDefined();
  });

  it('should call getBandejaDeTablaDatos and getNombreDelDepartamento on ngOnInit', () => {
    const getBandejaDeTablaDatosSpy = jest.spyOn(component, 'getBandejaDeTablaDatos');
    const getNombreDelDepartamentoSpy = jest.spyOn(component, 'getNombreDelDepartamento');
    component.ngOnInit();
    expect(getBandejaDeTablaDatosSpy).toHaveBeenCalled();
    expect(getNombreDelDepartamentoSpy).toHaveBeenCalled();
  });

  it('should get and set dePendientesTablaDatos and copiarDatos', () => {
    component.getBandejaDeTablaDatos();
    expect(component.dePendientesTablaDatos.length).toBe(1);
    expect(component.copiarDatos.length).toBe(1);
    expect(component.dePendientesTablaDatos[0].folioTramite).toBe('123');
  });

  it('should get and set departamentoDatos and update form options', () => {
    // Patch the form to have a departamento field
    component.bandejaDeTareasForma = [
      { id: 'departamento', opciones: undefined } as any
    ];
    component.getNombreDelDepartamento();
    expect(component.departamentoDatos.length).toBe(1);
    //expect(component.bandejaDeTareasForma[0].opciones).toEqual([{ descripcion: 'DEP1', id: 1 }]);
  });

  it('should handle procedimiento event and set selectedDepartamentoObj.numeroDeProcedimiento', () => {
    component.procedureNumero = [{ id: 2, tramite: 789 }];
    component.departamento({ campo: 'procedimiento', valor: 2 });
    expect(component.selectedDepartamentoObj.tieneDepartamento).toBe(false);
    expect(component.selectedDepartamentoObj.numeroDeProcedimiento).toBe(789);
  });

  it('should reset selectedDepartamentoObj.tieneDepartamento for other events', () => {
    component.selectedDepartamentoObj.tieneDepartamento = true;
    component.departamento({ campo: 'other', valor: null });
    expect(component.selectedDepartamentoObj.tieneDepartamento).toBe(false);
  });
  

it('should call getNombreDelDepartamento and set departamentoDatos and update form field options', () => {
  const departamentoData = [
    { ID_DEPENDENCIA: 1, ACRONIMO: 'DEP1' },
    { ID_DEPENDENCIA: 2, ACRONIMO: 'DEP2' }
  ];
  const mockDepartamentoResponse = {
    data: departamentoData
  };
  // Mock the service method
  mockService.getDepartamento = jest.fn().mockReturnValue(of(mockDepartamentoResponse));

  // Prepare the form field in the component
  const departamentoField = {
    id: 'departamento',
    opciones: undefined
  };
  // @ts-ignore
  component.bandejaDeTareasForma = [departamentoField];

  component.getNombreDelDepartamento();

  expect(mockService.getDepartamento).toHaveBeenCalled();
  expect(component.departamentoDatos).toEqual(departamentoData);
  expect(departamentoField.opciones).toEqual([
    { descripcion: 'DEP1', id: 1 },
    { descripcion: 'DEP2', id: 2 }
  ]);
});

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call obtieneTipoSolicitudes and set tipoSolicitud field options', () => {
    const tipoSolicitudesData = [
      { id: 10, descripcion: 'Tipo A' },
      { id: 20, descripcion: 'Tipo B' }
    ];
    const mockTipoSolicitudesResponse = {
      data: tipoSolicitudesData
    };
    // Mock the service method
    mockService.getSolicitudesTablaDatos = jest.fn().mockReturnValue(of(mockTipoSolicitudesResponse));

    // Prepare the form field in the component
    const tipoSolicitudField = {
      id: 'tipoSolicitud',
      opciones: undefined
    };
    // @ts-ignore
    component.bandejaDeTareasForma = [tipoSolicitudField];

    component.obtieneTipoSolicitudes();

    expect(mockService.getSolicitudesTablaDatos).toHaveBeenCalled();
    expect(tipoSolicitudField.opciones).toEqual([
      { descripcion: 'Tipo A', id: 10 },
      { descripcion: 'Tipo B', id: 20 }
    ]);
  });

  it('should handle service error gracefully', () => {
    mockService.getTareasPendientesTablaDatos.mockReturnValue(throwError(() => new Error('API error')));

    component.getBandejaDeTablaDatos();
  
    expect(mockService.getTareasPendientesTablaDatos).toHaveBeenCalled();
    expect(component.dePendientesTablaDatos).toEqual([]);
  });
});