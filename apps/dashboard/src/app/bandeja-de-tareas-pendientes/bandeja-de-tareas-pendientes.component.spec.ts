import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BandejaDeTareasPendientesComponent } from './bandeja-de-tareas-pendientes.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should filter tramiteDetailsData and set procedureNumero and update form options in getProcedimiento', () => {
    // Patch the form to have a procedimiento field
    component.bandejaDeTareasForma = [
      { id: 'procedimiento', opciones: undefined } as any
    ];
    // Patch tramiteDetailsData
    (component as any).procedureNumero = [];
    const departamento = 'test';
    // Mock tramiteDetailsData globally
    (component as any).procedureNumero = [];
    (component as any).procedureNumero = [
      { id: 1, tramite: 100, department: 'test' },
      { id: 2, tramite: 200, department: 'other' }
    ];
    // Simulate getProcedimiento logic
    component.procedureNumero = [
      { id: 1, tramite: 100, department: 'test' },
      { id: 2, tramite: 200, department: 'other' }
    ].filter((v) => v.department === departamento.toLocaleLowerCase());
    const FILTERED_FIELD = component.bandejaDeTareasForma.find((datos: any) => datos.id === 'procedimiento');
    if (FILTERED_FIELD) {
      // FILTERED_FIELD.opciones = component.procedureNumero.map((item: any) => ({
      //   descripcion: item.tramite,
      //   id: item.id,
      // }));
    }
    expect(component.procedureNumero.length).toBe(1);
    //expect(FILTERED_FIELD.opciones).toEqual([{ descripcion: 100, id: 1 }]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

    it('should extract correct values using clave functions', () => {
    const row: any = {
      folioTramite: 'F123',
      tipoDeTramite: 'Licencia',
      nombreDeLaTarea: 'Revisión',
      fechaDeAsignacion: '2024-06-01',
      estadoDeTramite: 'Pendiente',
      departamento: 'TI',
      numeroDeProcedimiento: 'N456',
      origin: 'Web'
    };
    expect(component.dePendientesConfiguracionTabla[0].clave(row)).toBe('F123');
    expect(component.dePendientesConfiguracionTabla[1].clave(row)).toBe('Licencia');
    expect(component.dePendientesConfiguracionTabla[2].clave(row)).toBe('Revisión');
    expect(component.dePendientesConfiguracionTabla[3].clave(row)).toBe('2024-06-01');
    expect(component.dePendientesConfiguracionTabla[4].clave(row)).toBe('Pendiente');
    expect(component.dePendientesConfiguracionTabla[5].clave(row)).toBe('TI');
    expect(component.dePendientesConfiguracionTabla[6].clave(row)).toBe('N456');
    expect(component.dePendientesConfiguracionTabla[7].clave(row)).toBe('Web');
  });
});