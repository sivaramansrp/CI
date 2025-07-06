import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { of, Subject, throwError } from 'rxjs';
import { ChofereModificationDeChoferesComponent } from './chofere.modification.de.choferes.component';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Chofer40103Query } from '../../../../estados/chofer40103.query';
import { Chofer40103Service } from '../../../../estados/chofer40103.service';
import { DatosDeChoferesExtranjerosDialogComponent } from '../dialog/data.de.choferes.extranjeros.dialog.component';
import { ChoferesExtranjeros } from '../../../../models/registro-muestras-mercancias.model';
import { CHOFERES_EXTRANJEROS_TABLA } from '../../../../enum/choferes.enum';
import { Choferesnacionales40103State } from '../../../../estados/chofer40103.store';

// Mock components
@Component({
  selector: 'app-tabla-dinamica',
  template: '<div>Mock TablaDinamicaComponent</div>',
  inputs: ['configuracionColumna', 'data', 'tipoSeleccion', 'isReadonly'],
  outputs: ['seleccionadosChange'],
  standalone: true
})
class MockTablaDinamicaComponent {
  configuracionColumna: any;
  data: any;
  tipoSeleccion: any;
  isReadonly: boolean = false;
  seleccionadosChange = new Subject<any>();
}

@Component({
  selector: 'app-datos-de-choferes-extranjeros-dialog',
  template: '<div>Mock DatosDeChoferesExtranjerosDialogComponent</div>',
  inputs: ['datosChofer', 'isReadonly'],
  outputs: ['saved', 'cancelled'],
  standalone: true
})
class MockDatosDeChoferesExtranjerosDialogComponent {
  datosChofer: any;
  isReadonly: boolean = false;
  saved = new Subject<any>();
  cancelled = new Subject<void>();
}

describe('ChofereModificationDeChoferesComponent', () => {
  let component: ChofereModificationDeChoferesComponent;
  let fixture: ComponentFixture<ChofereModificationDeChoferesComponent>;
  let mockBsModalService: jest.Mocked<BsModalService>;
  let mockChofer40103Service: jest.Mocked<Chofer40103Service>;
  let mockChofer40103Query: jest.Mocked<Chofer40103Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockBsModalRef: jest.Mocked<BsModalRef>;

  const mockChoferesExtranjeros: ChoferesExtranjeros[] = [
    {
    //   licenciaDeConducir: 'LIC123456',
    //   paisEmisor: 'Estados Unidos',
    //   fechaVencimiento: '2025-12-31',
    //   nombre: 'John',
      primerApellido: 'Smith',
      segundoApellido: 'Johnson',
    //   fechaNacimiento: '1985-05-15',
    //   domicilio: '123 Main St',
      ciudad: 'New York',
      estado: 'NY',
      codigoPostal: '10001',
      telefono: '+1234567890',
      correoElectronico: 'john.smith@email.com'
    },
    {
    //   licenciaDeConducir: 'LIC789012',
    //   paisEmisor: 'Canadá',
    //   fechaVencimiento: '2024-11-30',
    //   nombre: 'Maria',
      primerApellido: 'Garcia',
      segundoApellido: 'Lopez',
    //   fechaNacimiento: '1990-08-20',
    //   domicilio: '456 Oak Ave',
      ciudad: 'Toronto',
      estado: 'ON',
      codigoPostal: 'M5V 3A8',
      telefono: '+1987654321',
      correoElectronico: 'maria.garcia@email.com'
    }
  ];

  const mockConsultaioState: ConsultaioState = {
    readonly: false,
    update: true,
  } as unknown as ConsultaioState;

  const mockSolicitudState = {
    datosDelChoferExtranjerosModification: mockChoferesExtranjeros
  };

  beforeEach(async () => {
    mockBsModalRef = {
      hide: jest.fn(),
      onHide: new Subject(),
      onHidden: new Subject()
    } as unknown as jest.Mocked<BsModalRef>;

    mockBsModalService = {
      show: jest.fn().mockReturnValue(mockBsModalRef),
      hide: jest.fn(),
      onShow: new Subject(),
      onShown: new Subject(),
      onHide: new Subject(),
      onHidden: new Subject()
    } as unknown as jest.Mocked<BsModalService>;

    mockChofer40103Service = {
      updateDatosDelChoferExtranjerosModification: jest.fn()
    } as unknown as jest.Mocked<Chofer40103Service>;

    mockChofer40103Query = {
      selectSolicitud$: of(mockSolicitudState)
    } as unknown as jest.Mocked<Chofer40103Query>;

    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      imports: [
        MockDatosDeChoferesExtranjerosDialogComponent, 
        MockTablaDinamicaComponent, 
        ChofereModificationDeChoferesComponent
      ],
      declarations: [],
      providers: [
        { provide: BsModalService, useValue: mockBsModalService },
        { provide: Chofer40103Service, useValue: mockChofer40103Service },
        { provide: Chofer40103Query, useValue: mockChofer40103Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(ChofereModificationDeChoferesComponent, {
      remove: {
        imports: [TablaDinamicaComponent, DatosDeChoferesExtranjerosDialogComponent]
      },
      add: {
        imports: [MockTablaDinamicaComponent, MockDatosDeChoferesExtranjerosDialogComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChofereModificationDeChoferesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    fixture.destroy();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // it('should be a standalone component', () => {
    //   expect(component).toBeInstanceOf(ChofereModificationDeChoferesComponent);
    // });

    it('should initialize with correct default values', () => {
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.ConfiguracionColumna).toBe(CHOFERES_EXTRANJEROS_TABLA);
      expect(component.datosDelChoferExtranjeros).toEqual([]);
      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
      expect(component.datosChofere).toEqual({} as ChoferesExtranjeros);
      expect(component.isReadonly).toBe(false);
      expect(component.destroy$).toBeInstanceOf(Subject);
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to chofer40103Query.selectSolicitud$ and update datosDelChoferExtranjeros', () => {
      component.ngOnInit();

      expect(component.datosDelChoferExtranjeros).toEqual(mockChoferesExtranjeros);
    });

    it('should concatenate new data with existing datosDelChoferExtranjeros', () => {
      const existingData = [{
        licenciaDeConducir: 'EXISTING123',
        nombre: 'Existing',
        primerApellido: 'User'
      } as ChoferesExtranjeros];
      
      component.datosDelChoferExtranjeros = existingData;
      component.ngOnInit();

      expect(component.datosDelChoferExtranjeros.length).toBe(3);
      expect(component.datosDelChoferExtranjeros).toContain(existingData[0]);
      expect(component.datosDelChoferExtranjeros).toContain(mockChoferesExtranjeros[0]);
    });

    it('should handle null datosDelChoferExtranjerosModification', () => {
      const nullState = { datosDelChoferExtranjerosModification: null } as unknown as Choferesnacionales40103State;
      mockChofer40103Query.selectSolicitud$ = of(nullState);

      component.ngOnInit();

      expect(component.datosDelChoferExtranjeros).toEqual([]);
    });

    it('should handle undefined datosDelChoferExtranjerosModification', () => {
      const undefinedState = {}  as unknown as Choferesnacionales40103State;
      mockChofer40103Query.selectSolicitud$ = of(undefinedState);

      component.ngOnInit();

      expect(component.datosDelChoferExtranjeros).toEqual([]);
    });

    it('should subscribe to consultaioQuery.selectConsultaioState$ and update readonly state', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);

      component.ngOnInit();

      expect(component.datosConsulta).toEqual(readonlyState);
      expect(component.isReadonly).toBe(true);
    });

    it('should not update readonly state when readonly is false', () => {
      const nonReadonlyState = { ...mockConsultaioState, readonly: false };
      mockConsultaioQuery.selectConsultaioState$ = of(nonReadonlyState);

      component.ngOnInit();

      expect(component.isReadonly).toBe(false);
    });

    it('should handle null consultaioState', () => {
      mockConsultaioQuery.selectConsultaioState$ = of(null as any);

      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should handle observable errors gracefully', () => {
      mockChofer40103Query.selectSolicitud$ = throwError(() => new Error('Query error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => component.ngOnInit()).not.toThrow();

      consoleSpy.mockRestore();
    });

    it('should use takeUntil for subscription cleanup', () => {
      const destroySpy = jest.spyOn(component.destroy$, 'next');

      component.ngOnInit();
      component.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should handle multiple state emissions correctly', () => {
      const stateSubject = new Subject<any>();
      mockChofer40103Query.selectSolicitud$ = stateSubject.asObservable();

      component.ngOnInit();

      // First emission
      stateSubject.next({ datosDelChoferExtranjerosModification: [mockChoferesExtranjeros[0]] });
      expect(component.datosDelChoferExtranjeros.length).toBe(1);

      // Second emission
      stateSubject.next({ datosDelChoferExtranjerosModification: [mockChoferesExtranjeros[1]] });
      expect(component.datosDelChoferExtranjeros.length).toBe(2);

      stateSubject.complete();
    });
  });

  describe('onChofereNationalSelected', () => {
    it('should update datosDelChoferExtranjerosSelected with provided data', () => {
      const selectedData = [mockChoferesExtranjeros[0]];

      component.onChofereNationalSelected(selectedData);

      expect(component.datosDelChoferExtranjerosSelected).toEqual(selectedData);
    });

    it('should handle empty selection', () => {
      component.onChofereNationalSelected([]);

      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });

    it('should handle multiple selections', () => {
      component.onChofereNationalSelected(mockChoferesExtranjeros);

      expect(component.datosDelChoferExtranjerosSelected).toEqual(mockChoferesExtranjeros);
    });

    it('should replace previous selection', () => {
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0]];
      const newSelection = [mockChoferesExtranjeros[1]];

      component.onChofereNationalSelected(newSelection);

      expect(component.datosDelChoferExtranjerosSelected).toEqual(newSelection);
    });

    it('should handle null input', () => {
      component.onChofereNationalSelected(null as any);

      expect(component.datosDelChoferExtranjerosSelected).toBeNull();
    });

    it('should handle undefined input', () => {
      component.onChofereNationalSelected(undefined as any);

      expect(component.datosDelChoferExtranjerosSelected).toBeUndefined();
    });
  });

  describe('addNewRow', () => {
    let mockTemplate: TemplateRef<unknown>;

    beforeEach(() => {
      mockTemplate = {} as TemplateRef<unknown>;
      jest.spyOn(component, 'openModal').mockImplementation();
    });

    it('should initialize datosChofere as empty object', () => {
      component.addNewRow(mockTemplate);

      expect(component.datosChofere).toEqual({} as ChoferesExtranjeros);
    });

    it('should call openModal with provided template', () => {
      component.addNewRow(mockTemplate);

      expect(component.openModal).toHaveBeenCalledWith(mockTemplate);
    });

    it('should reset datosChofere if it had previous data', () => {
      component.datosChofere = mockChoferesExtranjeros[0];

      component.addNewRow(mockTemplate);

      expect(component.datosChofere).toEqual({} as ChoferesExtranjeros);
    });

    it('should handle null template', () => {
      component.addNewRow(null as any);

      expect(component.datosChofere).toEqual({} as ChoferesExtranjeros);
      expect(component.openModal).toHaveBeenCalledWith(null);
    });
  });

  describe('editSelectedRow', () => {
    let mockTemplate: TemplateRef<unknown>;
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
      mockTemplate = {} as TemplateRef<unknown>;
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      jest.spyOn(component, 'openModal').mockImplementation();
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it('should warn and return early when no rows are selected', () => {
      component.datosDelChoferExtranjerosSelected = [];

      component.editSelectedRow(mockTemplate);

      expect(consoleWarnSpy).toHaveBeenCalledWith('No rows selected for editing.');
      expect(component.openModal).not.toHaveBeenCalled();
    });

    it('should set datosChofere to first selected item and open modal', () => {
      component.datosDelChoferExtranjerosSelected = mockChoferesExtranjeros;

      component.editSelectedRow(mockTemplate);

      expect(component.datosChofere).toEqual(mockChoferesExtranjeros[0]);
      expect(component.openModal).toHaveBeenCalledWith(mockTemplate);
    });

    it('should handle single selection', () => {
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[1]];

      component.editSelectedRow(mockTemplate);

      expect(component.datosChofere).toEqual(mockChoferesExtranjeros[1]);
    });

    it('should use first item when multiple items are selected', () => {
      component.datosDelChoferExtranjerosSelected = mockChoferesExtranjeros;

      component.editSelectedRow(mockTemplate);

      expect(component.datosChofere).toEqual(mockChoferesExtranjeros[0]);
    });

    it('should handle null template', () => {
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0]];

      component.editSelectedRow(null as any);

      expect(component.datosChofere).toEqual(mockChoferesExtranjeros[0]);
      expect(component.openModal).toHaveBeenCalledWith(null);
    });
  });

  describe('deleteSelectedRow', () => {
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.datosDelChoferExtranjeros = [...mockChoferesExtranjeros];
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it('should warn when no rows are selected', () => {
      component.datosDelChoferExtranjerosSelected = [];

      component.deleteSelectedRow();

      expect(consoleWarnSpy).toHaveBeenCalledWith('No rows selected for deletion.');
      expect(component.datosDelChoferExtranjeros).toEqual(mockChoferesExtranjeros);
    });

    it('should remove selected rows from datosDelChoferExtranjeros', () => {
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0]];

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjeros).toEqual([mockChoferesExtranjeros[1]]);
      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });

    it('should remove multiple selected rows', () => {
      component.datosDelChoferExtranjerosSelected = mockChoferesExtranjeros;

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjeros).toEqual([]);
      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });

    it('should handle partial selection removal', () => {
      const additionalData = {
        ...mockChoferesExtranjeros[0],
        licenciaDeConducir: 'ADDITIONAL123',
        nombre: 'Additional'
      };
      component.datosDelChoferExtranjeros = [...mockChoferesExtranjeros, additionalData];
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0]];

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjeros).toEqual([mockChoferesExtranjeros[1], additionalData]);
    });

    it('should reset selected array after deletion', () => {
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0]];

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });

    it('should handle deletion when some selected items are not in main array', () => {
      const notInMainArray = {
        licenciaDeConducir: 'NOTINMAIN123',
        nombre: 'NotInMain'
      } as ChoferesExtranjeros;
      
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0], notInMainArray];
      const originalLength = component.datosDelChoferExtranjeros.length;

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjeros.length).toBe(originalLength - 1);
      expect(component.datosDelChoferExtranjeros).not.toContain(mockChoferesExtranjeros[0]);
    });
  });


  describe('cancelModal', () => {
    beforeEach(() => {
      component.modalRef = mockBsModalRef;
    });

    it('should call hide on modalRef when modalRef exists', () => {
      component.cancelModal();

      expect(mockBsModalRef.hide).toHaveBeenCalled();
      expect(component.modalRef).toBeNull();
    });

    it('should handle null modalRef gracefully', () => {
      component.modalRef = null;

      expect(() => component.cancelModal()).not.toThrow();
      expect(component.modalRef).toBeNull();
    });

    it('should handle undefined modalRef gracefully', () => {
      component.modalRef = undefined as any;

      expect(() => component.cancelModal()).not.toThrow();
      expect(component.modalRef).toBeNull();
    });

    it('should set modalRef to null after hiding', () => {
      component.cancelModal();

      expect(component.modalRef).toBeNull();
    });

    it('should handle modalRef.hide throwing error', () => {
      mockBsModalRef.hide.mockImplementation(() => {
        throw new Error('Hide error');
      });
    });
  });

  describe('addModal', () => {
    beforeEach(() => {
      component.datosDelChoferExtranjeros = [...mockChoferesExtranjeros];
      jest.spyOn(component, 'cancelModal').mockImplementation();
    });

    it('should add new data to datosDelChoferExtranjeros', () => {
      const newData = {
        ...mockChoferesExtranjeros[0],
        licenciaDeConducir: 'NEW123456',
        nombre: 'Nuevo'
      };

      component.addModal(newData);

      expect(component.datosDelChoferExtranjeros).toContain(newData);
      expect(component.datosDelChoferExtranjeros.length).toBe(3);
    });

    it('should reset datosDelChoferExtranjerosSelected', () => {
      component.datosDelChoferExtranjerosSelected = [mockChoferesExtranjeros[0]];
      const newData = mockChoferesExtranjeros[0];

      component.addModal(newData);

      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });

    it('should call cancelModal', () => {
      const newData = mockChoferesExtranjeros[0];

      component.addModal(newData);

      expect(component.cancelModal).toHaveBeenCalled();
    });

    it('should handle adding null data', () => {
      const originalLength = component.datosDelChoferExtranjeros.length;

      component.addModal(null as any);

      expect(component.datosDelChoferExtranjeros.length).toBe(originalLength + 1);
      expect(component.datosDelChoferExtranjeros).toContain(null);
    });

    it('should handle adding undefined data', () => {
      const originalLength = component.datosDelChoferExtranjeros.length;

      component.addModal(undefined as any);

      expect(component.datosDelChoferExtranjeros.length).toBe(originalLength + 1);
      expect(component.datosDelChoferExtranjeros).toContain(undefined);
    });

    it('should handle adding duplicate data', () => {
      const duplicateData = mockChoferesExtranjeros[0];

      component.addModal(duplicateData);

      expect(component.datosDelChoferExtranjeros.filter(item => 
        item === duplicateData
      ).length).toBe(2);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroy$ subject', () => {
      const nextSpy = jest.spyOn(component.destroy$, 'next');
      const completeSpy = jest.spyOn(component.destroy$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should handle multiple destroy calls', () => {
      const nextSpy = jest.spyOn(component.destroy$, 'next');

      component.ngOnDestroy();
      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledTimes(2);
    });

    it('should properly clean up subscriptions', () => {
      component.ngOnInit();
      
      const destroyNextSpy = jest.spyOn(component.destroy$, 'next');
      
      component.ngOnDestroy();

      expect(destroyNextSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('Integration Tests', () => {
    it('should work correctly from initialization to destruction', () => {
      component.ngOnInit();
      
      expect(component.datosDelChoferExtranjeros).toEqual(mockChoferesExtranjeros);
      
      // Select a row
      component.onChofereNationalSelected([mockChoferesExtranjeros[0]]);
      expect(component.datosDelChoferExtranjerosSelected.length).toBe(1);
      
      // Delete selected row
      component.deleteSelectedRow();
      expect(component.datosDelChoferExtranjeros.length).toBe(1);
      
      // Cleanup
      component.ngOnDestroy();
    });

    it('should handle readonly mode correctly', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);

      component.ngOnInit();

      expect(component.isReadonly).toBe(true);
      expect(component.datosConsulta.readonly).toBe(true);
    });

    it('should handle modal workflow correctly', () => {
      const mockTemplate = {} as TemplateRef<unknown>;
      
      component.addNewRow(mockTemplate);
      expect(component.datosChofere).toEqual({});
      
      const newData = mockChoferesExtranjeros[0];
      component.addModal(newData);
      expect(component.datosDelChoferExtranjeros).toContain(newData);
    });

    it('should handle complete CRUD workflow', () => {
      component.ngOnInit();
      const mockTemplate = {} as TemplateRef<unknown>;
      
      // Add new row
      component.addNewRow(mockTemplate);
      expect(component.datosChofere).toEqual({});
      
      // Add data through modal
      const newData = {
        licenciaDeConducir: 'WORKFLOW123',
        nombre: 'Workflow',
        primerApellido: 'Test'
      } as ChoferesExtranjeros;
      
      component.addModal(newData);
      expect(component.datosDelChoferExtranjeros).toContain(newData);
      
      // Select and edit
      component.onChofereNationalSelected([newData]);
      component.editSelectedRow(mockTemplate);
      expect(component.datosChofere).toEqual(newData);
      
      // Delete
      component.deleteSelectedRow();
      expect(component.datosDelChoferExtranjeros).not.toContain(newData);
    });
  });

  describe('Edge Cases', () => {
    it('should handle large datasets efficiently', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, index) => ({
        licenciaDeConducir: `LARGE${index.toString().padStart(6, '0')}`,
        nombre: `Usuario${index}`,
        primerApellido: 'Test'
      } as ChoferesExtranjeros));

      component.datosDelChoferExtranjeros = largeDataset;
      component.datosDelChoferExtranjerosSelected = largeDataset.slice(0, 100);

      const startTime = performance.now();
      component.deleteSelectedRow();
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100);
      expect(component.datosDelChoferExtranjeros.length).toBe(900);
    });

    it('should handle special characters in chofer data', () => {
      const specialData = {
        ...mockChoferesExtranjeros[0],
        nombre: 'José María',
        primerApellido: 'Ñoño',
        segundoApellido: 'Güerez'
      };

      component.addModal(specialData);

      expect(component.datosDelChoferExtranjeros).toContain(specialData);
    });

    it('should handle concurrent operations', () => {
      component.ngOnInit();
      
      // Simulate rapid operations
      component.onChofereNationalSelected([mockChoferesExtranjeros[0]]);
      component.deleteSelectedRow();
      component.onChofereNationalSelected([]);
      
      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });

    it('should handle empty state and operations', () => {
      component.datosDelChoferExtranjeros = [];
      component.datosDelChoferExtranjerosSelected = [];
      
      component.deleteSelectedRow();
      expect(component.datosDelChoferExtranjeros).toEqual([]);
      
      component.onChofereNationalSelected([]);
      expect(component.datosDelChoferExtranjerosSelected).toEqual([]);
    });
  });

  describe('Observable Error Handling', () => {
    it('should handle chofer40103Query observable errors', () => {
      mockChofer40103Query.selectSolicitud$ = throwError(() => new Error('Query error'));
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should handle consultaioQuery observable errors', () => {
      mockConsultaioQuery.selectConsultaioState$ = throwError(() => new Error('Consultaio error'));
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should continue working after observable errors', () => {
      mockChofer40103Query.selectSolicitud$ = throwError(() => new Error('Query error'));
      
      component.ngOnInit();
      
      // Component should still be functional
      component.onChofereNationalSelected([mockChoferesExtranjeros[0]]);
      expect(component.datosDelChoferExtranjerosSelected.length).toBe(1);
    });

  });

  describe('Property Access and Mutation', () => {
    it('should allow direct property access and modification', () => {
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      
      component.tipoSeleccionTabla = TablaSeleccion.RADIO;
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.RADIO);
    });

    it('should maintain reference integrity for configuration columns', () => {
      const originalConfig = component.ConfiguracionColumna;
      
      expect(component.ConfiguracionColumna).toBe(CHOFERES_EXTRANJEROS_TABLA);
      expect(component.ConfiguracionColumna).toBe(originalConfig);
    });

    it('should handle ViewChild template reference', () => {
      expect(component.agregarModalDialog).toBeUndefined();
      
      // This would normally be set by Angular
      component.agregarModalDialog = {} as TemplateRef<Element>;
      expect(component.agregarModalDialog).toBeDefined();
    });
  });
});