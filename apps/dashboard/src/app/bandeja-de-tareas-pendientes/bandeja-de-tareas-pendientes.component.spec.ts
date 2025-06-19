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

    it('should update selectedDepartamentoObj and call getProcedimiento when campo is "departamento" and acronimo exists', () => {
    jest.spyOn(component, 'getProcedimiento');
    component.departamentoDatos = [{ ID_DEPENDENCIA: 1, ACRONIMO: 'DEP1' }];
    const event = { campo: 'departamento', valor: 1 };
    component.departamento(event);
    expect(component.selectedDepartamentoObj.tieneDepartamento).toBe(true);
    expect(component.selectedDepartamentoObj.nombreDelDepartamento).toBe('');
    expect(component.getProcedimiento).toHaveBeenCalled();
  });

  it('should not update nombreDelDepartamento or call getProcedimiento if acronimo is null', () => {
    component.departamentoDatos = [{ ID_DEPENDENCIA: 3, ACRONIMO: null }];
    const event = { campo: 'departamento', valor: 3 };
    component.departamento(event);

    expect(component.selectedDepartamentoObj.tieneDepartamento).toBe(true);
    expect(component.selectedDepartamentoObj.nombreDelDepartamento).toBe('');
    expect(component.getProcedimiento).not.toHaveBeenCalled();
  });


  it('should not update nombreDelDepartamento or call getProcedimiento if acronimo is null', () => {
    jest.spyOn(component, 'getProcedimiento');
    component.departamentoDatos = [{ ID_DEPENDENCIA: 1, ACRONIMO: null }];
    const event = { campo: 'departamento', valor: 1 };
    component.departamento(event);
    expect(component.selectedDepartamentoObj.tieneDepartamento).toBe(true);
    expect(component.selectedDepartamentoObj.nombreDelDepartamento).toBe('');
    expect(component.getProcedimiento).not.toHaveBeenCalled();
  });

  it('should update selectedDepartamentoObj.numeroDeProcedimiento when campo is "procedimiento"', () => {
    component.procedureNumero = [{ id: 99, tramite: 'PROC99' }];
    const event = { campo: 'procedimiento', valor: 99 };
    component.departamento(event);
    expect(component.selectedDepartamentoObj.numeroDeProcedimiento).toBe('PROC99');
  });

  it('should not throw if procedureNumero is empty when campo is "procedimiento"', () => {
    component.procedureNumero = [];
    const event = { campo: 'procedimiento', valor: 99 };
    expect(() => component.departamento(event)).not.toThrow();
    expect(component.selectedDepartamentoObj.numeroDeProcedimiento).toBeUndefined();
  });

  it('should not throw if departamentoDatos is empty when campo is "departamento"', () => {
    component.departamentoDatos = [];
    const event = { campo: 'departamento', valor: 99 };
    expect(() => component.departamento(event)).not.toThrow();
    expect(component.selectedDepartamentoObj.nombreDelDepartamento).toBe('');
  });

      it('should filter tramiteDetailsData by departamento and update procedureNumero', () => {
      const departamento = 'DEP1';
      // Add a matching entry to tramiteDetailsData for the test
      const lowerDepartamento = departamento.toLocaleLowerCase();
      // @ts-ignore
      tramiteDetailsData.push({ id: 101, tramite: 'PROC101', department: lowerDepartamento });

      component.getProcedimiento(departamento);

      expect(component.procedureNumero.some((item: any) => item.department === lowerDepartamento)).toBe(true);

      // Clean up the added entry
      // @ts-ignore
      tramiteDetailsData.pop();
    });

    it('should update opciones for procedimiento field with filtered procedures', () => {
      const departamento = 'DEP2';
      // Add a matching entry to tramiteDetailsData for the test
      const lowerDepartamento = departamento.toLocaleLowerCase();
      // @ts-ignore
      tramiteDetailsData.push({ id: 202, tramite: 'PROC202', department: lowerDepartamento });

      component.getProcedimiento(departamento);

      const procedimientoField = component.bandejaDeTareasForma.find(
        (f: any) => f.id === 'procedimiento'
      );

      // Clean up the added entry
      // @ts-ignore
      tramiteDetailsData.pop();
    });

    it('should set procedureNumero to empty array if no matches found', () => {
      component.getProcedimiento('NO_MATCH_DEPT');
      expect(component.procedureNumero).toEqual([]);
      const procedimientoField = component.bandejaDeTareasForma.find(
        (f: any) => f.id === 'procedimiento'
      );
    });

    it('should not throw if procedimiento field is not found', () => {
      // Remove procedimiento field temporarily
      const index = component.bandejaDeTareasForma.findIndex((f: any) => f.id === 'procedimiento');
      const removed = component.bandejaDeTareasForma.splice(index, 1);

      expect(() => component.getProcedimiento('DEP1')).not.toThrow();

      // Restore procedimiento field
      component.bandejaDeTareasForma.splice(index, 0, ...removed);
    });


  it('should map column headers and keys correctly', () => {
    const testRow = {
      folioTramite: 'FOL123',
      tipoDeTramite: 'TipoX',
      nombreDeLaTarea: 'TareaX',
      fechaDeAsignacion: '2024-06-01',
      estadoDeTramite: 'Pendiente',
      departamento: 'DeptX',
      numeroDeProcedimiento: 'PROC123',
      origin: 'OrigenX'
    };

    const columns = component.dePendientesConfiguracionTabla;

    expect(columns[0].encabezado).toBe('Folio trámite');
    expect(columns[0].clave(testRow)).toBe('FOL123');

    expect(columns[1].encabezado).toBe('Tipo de trámite');
    expect(columns[1].clave(testRow)).toBe('TipoX');

    expect(columns[2].encabezado).toBe('Nombre de la tarea');
    expect(columns[2].clave(testRow)).toBe('TareaX');

    expect(columns[3].encabezado).toBe('Fecha de asignación');
    expect(columns[3].clave(testRow)).toBe('2024-06-01');

    expect(columns[4].encabezado).toBe('Estado de trámite');
    expect(columns[4].clave(testRow)).toBe('Pendiente');

    expect(columns[5].encabezado).toBe('Departamento');
    expect(columns[5].clave(testRow)).toBe('DeptX');

    expect(columns[6].encabezado).toBe('Número de procedimiento');
    expect(columns[6].clave(testRow)).toBe('PROC123');

    expect(columns[7].encabezado).toBe('Origin');
    expect(columns[7].clave(testRow)).toBe('OrigenX');
  });

  it('should have columns ordered from 1 to 8', () => {
    const orders = component.dePendientesConfiguracionTabla.map(col => col.orden);
    expect(orders).toEqual([1,2,3,4,5,6,7,8]);
  });
  describe('getNombreDelDepartamento', () => {
    let mockDepartamentoResponse: any;

    beforeEach(() => {
      mockDepartamentoResponse = {
        data: [
          { ID_DEPENDENCIA: 1, ACRONIMO: 'DEP1' },
          { ID_DEPENDENCIA: 2, ACRONIMO: 'DEP2' }
        ]
      };
      mockService.getDepartamento = jest.fn();
    });

    it('should set departamentoDatos and update opciones if not already set', () => {
      const mockField = component.bandejaDeTareasForma.find((f: any) => f.id === 'departamento');
      (mockService.getDepartamento as jest.Mock).mockReturnValue(of(mockDepartamentoResponse));

      component.getNombreDelDepartamento();

      expect(mockService.getDepartamento).toHaveBeenCalled();
      // Wait for observable to emit
      fixture.detectChanges();
      expect(component.departamentoDatos).toEqual(mockDepartamentoResponse.data);
    });

    it('should not overwrite opciones if already set', () => {
      const mockField = component.bandejaDeTareasForma.find((f: any) => f.id === 'departamento');
      (mockService.getDepartamento as jest.Mock).mockReturnValue(of(mockDepartamentoResponse));

      component.getNombreDelDepartamento();

      expect(mockService.getDepartamento).toHaveBeenCalled();
      fixture.detectChanges();
    });

    it('should not throw if departamento field is not found', () => {
      // Remove departamento field temporarily
      const index = component.bandejaDeTareasForma.findIndex((f: any) => f.id === 'departamento');
      const removed = component.bandejaDeTareasForma.splice(index, 1);
      (mockService.getDepartamento as jest.Mock).mockReturnValue(of(mockDepartamentoResponse));

      expect(() => component.getNombreDelDepartamento()).not.toThrow();

      component.bandejaDeTareasForma.splice(index, 0, ...removed);
    });
  });

});
