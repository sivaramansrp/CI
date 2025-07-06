import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChofereNacionalRetiradaComponent } from "./chofere.nacional.retirada.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Chofer40103Service } from "../../../../estados/chofer40103.service";
import { Chofer40103Query } from "../../../../estados/chofer40103.query";
import { ConsultaioQuery, ConsultaioState, TablaSeleccion } from "@libs/shared/data-access-user/src";
import { TemplateRef } from "@angular/core";
import { DatosDelChoferNacional } from "../../../../models/registro-muestras-mercancias.model";
import { of } from "rxjs";
import { CHOFERES_NACIONALES_ALTA } from "../../../../enum/choferes.enum";
import { Choferesnacionales40103State } from "../../../../estados/chofer40103.store";
import { DatosDeChoferesNacionalDialogComponent } from "../data.de.choferes.dialog/data.de.choferes.nacional.dialog.component";

describe('ChofereNacionalRetiradaComponent', () => {
  let component: ChofereNacionalRetiradaComponent;
  let fixture: ComponentFixture<ChofereNacionalRetiradaComponent>;
  let mockBsModalService: jest.Mocked<BsModalService>;
  let mockChofer40103Service: jest.Mocked<Chofer40103Service>;
  let mockChofer40103Query: jest.Mocked<Chofer40103Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockModalRef: jest.Mocked<BsModalRef>;

  const mockDatosDelChoferNacional: DatosDelChoferNacional[] = [
    {
      id: '1',
      curp: 'ABCD123456HDFRNT01',
      rfc: 'ABCD123456ABC',
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      numeroDeGafete: '12345',
      vigenciaGafete: '2024-12-31',
      calle: 'Reforma',
      numeroExterior: '123',
      numeroInterior: 'A',
      pais: 'México',
      estado: 'CDMX',
      municipioAlcaldia: 'Cuauhtémoc',
      colonia: 'Centro',
      paisDeResidencia: 'México',
      ciudad: 'Ciudad de México',
      localidad: 'Centro',
      codigoPostal: '06000',
      correoElectronico: 'juan@example.com',
      telefono: '5555555555'
    }
  ];

  beforeEach(async () => {
    mockModalRef = {
      hide: jest.fn(),
      onHidden: jest.fn(),
      onHide: jest.fn()
    } as any;

    mockBsModalService = {
      show: jest.fn().mockReturnValue(mockModalRef),
      hide: jest.fn(),
      config: {}
    } as any;

    mockChofer40103Service = {
      updateDatosDelChoferNacionalRetirada: jest.fn()
    } as any;

    mockChofer40103Query = {
      selectSolicitud$: of({
        datosDelChoferNacionalRetirada: mockDatosDelChoferNacional
      })
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({
        readonly: true
      })
    } as any;

    await TestBed.configureTestingModule({
      imports: [ChofereNacionalRetiradaComponent],
      providers: [
        { provide: BsModalService, useValue: mockBsModalService },
        { provide: Chofer40103Service, useValue: mockChofer40103Service },
        { provide: Chofer40103Query, useValue: mockChofer40103Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChofereNacionalRetiradaComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.ConfiguracionColumna).toBe(CHOFERES_NACIONALES_ALTA);
      expect(component.datosDelChoferNacional).toEqual([]);
      expect(component.datosDelChoferNacionalSelected).toEqual([]);
      expect(component.isReadonly).toBe(false);
      expect(component.datosChofere).toEqual({});
    });

    it('should set isReadonly to true on init', () => {
      component.ngOnInit();
      expect(component.isReadonly).toBe(true);
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to chofer40103Query.selectSolicitud$ and update datosDelChoferNacional', () => {
      component.ngOnInit();

      expect(component.datosDelChoferNacional).toEqual(mockDatosDelChoferNacional);
    });

    // it('should subscribe to consultaioQuery.selectConsultaioState$ and update readonly state', () => {
    //   const mockState: ConsultaioState = { readonly: true } as ConsultaioState;
    //   mockConsultaioQuery.selectConsultaioState$ = of(mockState);

    //   component.ngOnInit();

    //   expect(component.datosConsulta).toEqual(mockState);
    //   expect(component.isReadonly).toBe(true);
    // });

    it('should handle empty datosDelChoferNacionalRetirada', () => {
      mockChofer40103Query.selectSolicitud$ = of({
        datosDelChoferNacionalRetirada: undefined
      } as any as Choferesnacionales40103State);

      component.ngOnInit();

      expect(component.datosDelChoferNacional).toEqual([]);
    });

    it('should handle consultaioState without readonly property', () => {
      mockConsultaioQuery.selectConsultaioState$ = of({} as ConsultaioState);

      component.ngOnInit();

      expect(component.isReadonly).toBe(true);
    });
  });

  describe('Row Selection', () => {
    it('should update datosDelChoferNacionalSelected when onChofereNationalSelected is called', () => {
      const selectedChoferes = [mockDatosDelChoferNacional[0]];

      component.onChofereNationalSelected(selectedChoferes);

      expect(component.datosDelChoferNacionalSelected).toEqual(selectedChoferes);
    });

    it('should handle empty selection', () => {
      component.datosDelChoferNacionalSelected = mockDatosDelChoferNacional;

      component.onChofereNationalSelected([]);

      expect(component.datosDelChoferNacionalSelected).toEqual([]);
    });
  });

  describe('Add New Row', () => {
    it('should initialize empty datosChofere and open modal', () => {
      const mockTemplate = {} as TemplateRef<unknown>;
      jest.spyOn(component, 'openModal');

      component.addNewRow(mockTemplate);

      expect(component.datosChofere).toEqual({});
      expect(component.openModal).toHaveBeenCalledWith(mockTemplate);
    });
  });

  describe('Edit Selected Row', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation();
    });

    it('should set datosChofere to selected item and open modal when row is selected', () => {
      const mockTemplate = {} as TemplateRef<unknown>;
      component.datosDelChoferNacionalSelected = [mockDatosDelChoferNacional[0]];
      jest.spyOn(component, 'openModal');

      component.editSelectedRow(mockTemplate);

      expect(component.datosChofere).toEqual(mockDatosDelChoferNacional[0]);
      expect(component.openModal).toHaveBeenCalledWith(mockTemplate);
    });

    it('should show warning and return early when no row is selected', () => {
      const mockTemplate = {} as TemplateRef<unknown>;
      component.datosDelChoferNacionalSelected = [];
      jest.spyOn(component, 'openModal');

      component.editSelectedRow(mockTemplate);

      expect(console.warn).toHaveBeenCalledWith('No rows selected for editing.');
      expect(component.openModal).not.toHaveBeenCalled();
    });
  });

  describe('Delete Selected Row', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation();
    });

    it('should remove selected rows from datosDelChoferNacional and clear selection', () => {
      component.datosDelChoferNacional = [...mockDatosDelChoferNacional];
      component.datosDelChoferNacionalSelected = [mockDatosDelChoferNacional[0]];

      component.deleteSelectedRow();

      expect(component.datosDelChoferNacional).toEqual([]);
      expect(component.datosDelChoferNacionalSelected).toEqual([]);
    });

    it('should show warning when no rows are selected for deletion', () => {
      component.datosDelChoferNacionalSelected = [];

      component.deleteSelectedRow();

      expect(console.warn).toHaveBeenCalledWith('No rows selected for deletion.');
    });

    it('should only remove selected items and keep unselected ones', () => {
      const additionalChofer = { ...mockDatosDelChoferNacional[0], curp: 'DIFFERENT123456' };
      component.datosDelChoferNacional = [mockDatosDelChoferNacional[0], additionalChofer];
      component.datosDelChoferNacionalSelected = [mockDatosDelChoferNacional[0]];

      component.deleteSelectedRow();

      expect(component.datosDelChoferNacional).toEqual([additionalChofer]);
      expect(component.datosDelChoferNacionalSelected).toEqual([]);
    });
  });

  describe('Modal Management', () => {
    // it('should open modal with correct configuration', () => {
    //   const mockTemplate = {} as TemplateRef<unknown>;

    //   component.openModal(mockTemplate);

    //   expect(mockBsModalService.show).toHaveBeenCalledWith(mockTemplate, {
    //     class: 'modal-fullscreen'
    //   });
    //   expect(component.modalRef).toBe(mockModalRef);
    // });

    it('should close modal and clear reference', () => {
      component.modalRef = mockModalRef;

      component.cancelModal();

      expect(mockModalRef.hide).toHaveBeenCalled();
      expect(component.modalRef).toBeNull();
    });

    it('should handle cancelModal when modalRef is null', () => {
      component.modalRef = null;

      expect(() => component.cancelModal()).not.toThrow();
      expect(component.modalRef).toBeNull();
    });
  });

  describe('Add Modal', () => {
    beforeEach(() => {
      component.modalComponent = {} as DatosDeChoferesNacionalDialogComponent;
      jest.spyOn(component, 'cancelModal');
    });

    it('should add data to datosDelChoferNacional when modalComponent exists', () => {
      const newChofer = mockDatosDelChoferNacional[0];
      component.datosDelChoferNacional = [];
      component.datosDelChoferNacionalSelected = [newChofer];

      component.addModal(newChofer);

      expect(component.datosDelChoferNacional).toContain(newChofer);
      expect(component.datosDelChoferNacionalSelected).toEqual([]);
      expect(mockChofer40103Service.updateDatosDelChoferNacionalRetirada).toHaveBeenCalledWith([newChofer]);
      expect(component.cancelModal).toHaveBeenCalled();
    });

    it('should only call cancelModal when modalComponent does not exist', () => {
      component.modalComponent = undefined as any;
      const newChofer = mockDatosDelChoferNacional[0];

      component.addModal(newChofer);

      expect(mockChofer40103Service.updateDatosDelChoferNacionalRetirada).not.toHaveBeenCalled();
      expect(component.cancelModal).toHaveBeenCalled();
    });

    it('should maintain existing data when adding new chofer', () => {
      const existingChofer = { ...mockDatosDelChoferNacional[0], curp: 'EXISTING123456' };
      const newChofer = mockDatosDelChoferNacional[0];
      component.datosDelChoferNacional = [existingChofer];

      component.addModal(newChofer);

      expect(component.datosDelChoferNacional).toEqual([existingChofer, newChofer]);
    });
  });

  describe('Observable Management', () => {
    it('should unsubscribe from observables when component is destroyed', () => {
      const destroyedSpy = jest.spyOn(component.destroyed$, 'next');
      const completeSpy = jest.spyOn(component.destroyed$, 'complete');

      component.ngOnDestroy();

    //   expect(destroyedSpy).toHaveBeenCalledWith(undefined);
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should use takeUntil with destroyed$ in ngOnInit subscriptions', () => {
      const takeUntilSpy = jest.spyOn(require('rxjs'), 'takeUntil');

      component.ngOnInit();

      expect(takeUntilSpy).toHaveBeenCalledWith(component.destroyed$);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete workflow: add, select, edit, delete', () => {
      const mockTemplate = {} as TemplateRef<unknown>;
      component.modalComponent = {} as DatosDeChoferesNacionalDialogComponent;

      // Add new chofer
      component.addNewRow(mockTemplate);
      component.addModal(mockDatosDelChoferNacional[0]);

      expect(component.datosDelChoferNacional).toContain(mockDatosDelChoferNacional[0]);

      // Select chofer
      component.onChofereNationalSelected([mockDatosDelChoferNacional[0]]);
      expect(component.datosDelChoferNacionalSelected).toEqual([mockDatosDelChoferNacional[0]]);

      // Edit selected chofer
      component.editSelectedRow(mockTemplate);
      expect(component.datosChofere).toEqual(mockDatosDelChoferNacional[0]);

      // Delete selected chofer
      component.deleteSelectedRow();
      expect(component.datosDelChoferNacional).toEqual([]);
      expect(component.datosDelChoferNacionalSelected).toEqual([]);
    });
  });
});