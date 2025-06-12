import { CancelacionDeAutorizacionesComponent } from './Cancelacion-de-autorizaciones.component';
import { CancelacionDeAutorizacionesService } from '../../services/cancelacion-de-autorizaciones.service';
import { of, Subject } from 'rxjs';
import { CancelacionTabla } from '../../models/Cancelacion-de-autorizaciones';

describe('CancelacionDeAutorizacionesComponent (Jest)', () => {
  let component: CancelacionDeAutorizacionesComponent;
  let mockCancelacionService: jest.Mocked<CancelacionDeAutorizacionesService>;

  const mockData: CancelacionTabla[] = [
    {
      folioDePrograma: 'FP001',
      seleccionaLaModalidad: 'Modalidad A',
      representacionFederal: 'Nacional',
      tipoPrograma: 'Tipo A',
      estatus: 'Activo',
    },
  ];

  beforeEach(() => {
    mockCancelacionService = {
      getCancelacionTabla: jest.fn().mockReturnValue(of(mockData)),
    } as any;

    component = new CancelacionDeAutorizacionesComponent(mockCancelacionService);
  });

  test('should create component', () => {
    expect(component).toBeDefined();
    expect(component.CancelacionTabladatos).toEqual([]);
  });

  test('should call obtenerDatosCancelacionTabla on ngOnInit', () => {
    const spy = jest.spyOn(component, 'obtenerDatosCancelacionTabla');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  test('should populate CancelacionTabladatos from service', () => {
    component.ngOnInit();
    expect(mockCancelacionService.getCancelacionTabla).toHaveBeenCalled();
    expect(component.CancelacionTabladatos).toEqual(mockData);
  });

  test('should clean up destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroy$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  
  it('should return correct value when calling clave function for each tableHeaderExtranjeros entry', () => {
    const mockRow: CancelacionTabla = {
      folioDePrograma: 'F123',
      seleccionaLaModalidad: 'Presencial',
      representacionFederal: 'CDMX',
      tipoPrograma: 'Educativo',
      estatus: 'Vigente',
    };

    const expectedValues = [
      'F123',
      'Presencial',
      'CDMX',
      'Educativo',
      'Vigente',
    ];

    component.tableHeaderExtranjeros.forEach((column, index) => {
      expect(column.clave(mockRow)).toBe(expectedValues[index]);
    });
  });
});
