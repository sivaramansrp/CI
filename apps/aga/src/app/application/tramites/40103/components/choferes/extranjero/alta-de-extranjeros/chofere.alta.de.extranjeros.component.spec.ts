import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChofereAltaDeExtranjerosComponent } from './chofere.alta.de.extranjeros.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { of, Subject, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Chofer40103Query } from '../../../../estados/chofer40103.query';
import { Chofer40103Service } from '../../../../estados/chofer40103.service';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { ChoferesExtranjeros } from '../../../../models/registro-muestras-mercancias.model';
import { Choferesnacionales40103State } from '../../../../estados/chofer40103.store';


describe('ChofereAltaDeExtranjerosComponent', () => {
  let component: ChofereAltaDeExtranjerosComponent;
  let fixture: ComponentFixture<ChofereAltaDeExtranjerosComponent>;
  let chofer40103QueryMock: jest.Mocked<Chofer40103Query>;
  let chofer40103ServiceMock: jest.Mocked<Chofer40103Service>;
  let consultaioQueryMock: jest.Mocked<ConsultaioQuery>;
  let bsModalServiceMock: jest.Mocked<BsModalService>;
  let mockModalRef: jest.Mocked<BsModalRef>;

  const mockChoferExtranjeroData: ChoferesExtranjeros[] = [
    {
      // id: 1,
      // nombre: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      // numeroDeDocumento: 'ABC123456',
      // tipoDocumento: 'Pasaporte',
      // paisDocumento: 'USA',
      // fechaVencimiento: '2025-12-31',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: 'A',
      pais: 'USA',
      estado: 'California',
      // municipioAlcaldia: 'Los Angeles',
      // colonia: 'Downtown',
      paisDeResidencia: 'USA',
      ciudad: 'LA',
      // localidad: 'Central',
      codigoPostal: '90210',
      correoElectronico: 'john@test.com',
      telefono: '5551234567'
    },
    {
      // id: 2,
      // nombre: 'Jane',
      primerApellido: 'Smith',
      segundoApellido: 'Johnson',
      // numeroDeDocumento: 'XYZ789012',
      // tipoDocumento: 'Visa',
      // paisDocumento: 'Canada',
      // fechaVencimiento: '2026-06-30',
      calle: 'Second Street',
      numeroExterior: '456',
      numeroInterior: 'B',
      pais: 'Canada',
      estado: 'Ontario',
      // municipioAlcaldia: 'Toronto',
      // colonia: 'Central',
      paisDeResidencia: 'Canada',
      ciudad: 'Toronto',
      // localidad: 'Downtown',
      codigoPostal: 'M5V 3A8',
      correoElectronico: 'jane@test.com',
      telefono: '4161234567'
    }
  ];

  const mockConsultaioState: ConsultaioState = {
    readonly: true,
    update: true,
    // solicitudId: '12345',
    // tipoOperacion: 'consulta'
  } as unknown as ConsultaioState;

  beforeEach(async () => {
    mockModalRef = {
      hide: jest.fn(),
      show: jest.fn(),
      content: {},
      onHide: of(undefined),
      onHidden: of(undefined)
    } as unknown as jest.Mocked<BsModalRef>;

    bsModalServiceMock = {
      show: jest.fn().mockReturnValue(mockModalRef),
      hide: jest.fn(),
      config: {}
    } as unknown as jest.Mocked<BsModalService>;

    chofer40103QueryMock = {
      selectSolicitud$: of({
        datosDelChoferExtranjerosAlta: mockChoferExtranjeroData
      }),
      select: jest.fn()
    } as unknown as jest.Mocked<Chofer40103Query>;

    chofer40103ServiceMock = {
      updateChoferExtranjero: jest.fn(),
      deleteChoferExtranjero: jest.fn(),
      addChoferExtranjero: jest.fn(),
      getData: jest.fn().mockReturnValue(of(mockChoferExtranjeroData)),
      updateDatosDelChoferExtranjero: jest.fn(),
    } as unknown as jest.Mocked<Chofer40103Service>;

    consultaioQueryMock = {
      selectConsultaioState$: of(mockConsultaioState),
      select: jest.fn().mockReturnValue(of(mockConsultaioState))
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      imports: [ChofereAltaDeExtranjerosComponent],
      providers: [
        { provide: BsModalService, useValue: bsModalServiceMock },
        { provide: Chofer40103Query, useValue: chofer40103QueryMock },
        { provide: Chofer40103Service, useValue: chofer40103ServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ChofereAltaDeExtranjerosComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (component && component.ngOnDestroy) {
      component.ngOnDestroy();
    }
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to selectSolicitud$ and set datosDelChoferExtranjeros', () => {
      component.ngOnInit();
      
      expect(component.datosDelChoferExtranjeros).toEqual(mockChoferExtranjeroData);
    });

    it('should not set datosConsulta or isReadonly when readonly is false', () => {
      const nonReadonlyState = { ...mockConsultaioState, readonly: false };
      consultaioQueryMock.selectConsultaioState$ = of(nonReadonlyState);
      
      component.ngOnInit();
      
      expect(component.datosConsulta).toBeUndefined();
      expect(component.isReadonly).toBe(false);
    });

    it('should handle empty datosDelChoferExtranjerosAlta', () => {
      chofer40103QueryMock.selectSolicitud$ = of({
        datosDelChoferExtranjerosAlta: null
      } as unknown as Choferesnacionales40103State);
      
      component.ngOnInit();
      
      expect(component.datosDelChoferExtranjeros).toEqual([]);
    });

    it('should handle undefined datosDelChoferExtranjerosAlta', () => {
      chofer40103QueryMock.selectSolicitud$ = of({
        datosDelChoferExtranjerosAlta: undefined
      } as unknown as Choferesnacionales40103State);
      
      component.ngOnInit();
      
      expect(component.datosDelChoferExtranjeros).toEqual([]);
    });

    it('should handle set selected datosDelChoferExtranjerosSelected on call of onChofereNationalSelected', () => {

      component.onChofereNationalSelected(mockChoferExtranjeroData);
      expect(component.datosDelChoferExtranjerosSelected).toEqual(mockChoferExtranjeroData);
    });

    it('should handle observable errors gracefully', () => {
      chofer40103QueryMock.selectSolicitud$ = throwError(() => new Error('Test error'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => component.ngOnInit()).not.toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe on destroy', () => {
      const nextSpy = jest.spyOn(component.destroy$, 'next');
      const completeSpy = jest.spyOn(component.destroy$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should handle multiple destroy calls', () => {
      const nextSpy = jest.spyOn(component.destroy$, 'next');
      const completeSpy = jest.spyOn(component.destroy$, 'complete');
      
      component.ngOnDestroy();
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(2);
      expect(completeSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('addChoferExtranjero', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.datosDelChoferExtranjeros = [...mockChoferExtranjeroData];
    });

    it('should add new chofer extranjero to the list', () => {
      const newChofer: ChoferesExtranjeros = {
        primerApellido: 'Chofer',
        segundoApellido: 'Test',
        calle: 'New Street',
        numeroExterior: '789',
        numeroInterior: 'C',
        pais: 'Mexico',
        estado: 'CDMX',
        paisDeResidencia: 'Mexico',
        ciudad: 'Mexico City',
        codigoPostal: '01000',
        correoElectronico: 'new@test.com',
        telefono: '5559876543'
      };
      
      const initialLength = component.datosDelChoferExtranjeros.length;
      
      
      component.addModal(newChofer);
      
      expect(component.datosDelChoferExtranjeros.length).toBe(initialLength + 1);
      expect(component.datosDelChoferExtranjeros).toContain(newChofer);
      // expect(chofer40103ServiceMock.updateDatosDelChoferExtranjero).toHaveBeenCalledWith(component.datosDelChoferExtranjeros);
    });
        
    it('should add new chofer row and open modal dialog', () => {
      const newChofer: ChoferesExtranjeros = {
        primerApellido: 'Chofer',
        segundoApellido: 'Test',
        calle: 'New Street',
        numeroExterior: '789',
        numeroInterior: 'C',
        pais: 'Mexico',
        estado: 'CDMX',
        paisDeResidencia: 'Mexico',
        ciudad: 'Mexico City',
        codigoPostal: '01000',
        correoElectronico: 'new@test.com',
        telefono: '5559876543'
      };
      
      const initialLength = component.datosDelChoferExtranjeros.length;
      const spy = jest.spyOn(component, 'openModal');
      
      component.addNewRow(newChofer as any);
      
      expect(component.datosChofere).toEqual({});
      expect(spy).toHaveBeenCalled();
    });

    it('should allow editing row by open modal dialog when row is selected', () => {
      const newChofer: ChoferesExtranjeros = {
        primerApellido: 'Chofer',
        segundoApellido: 'Test',
        calle: 'New Street',
        numeroExterior: '789',
        numeroInterior: 'C',
        pais: 'Mexico',
        estado: 'CDMX',
        paisDeResidencia: 'Mexico',
        ciudad: 'Mexico City',
        codigoPostal: '01000',
        correoElectronico: 'new@test.com',
        telefono: '5559876543'
      };
      
      const initialLength = component.datosDelChoferExtranjeros.length;
      const spy = jest.spyOn(component, 'openModal');
      component.datosDelChoferExtranjerosSelected = [newChofer];

      component.editSelectedRow(newChofer as any);
      
      expect(component.datosChofere).toEqual(newChofer);
      expect(spy).toHaveBeenCalled();
    });

    it('should not allow editing row by open modal dialog when row is NOT selected', () => {
      const newChofer: ChoferesExtranjeros = {
        primerApellido: 'Chofer',
        segundoApellido: 'Test',
        calle: 'New Street',
        numeroExterior: '789',
        numeroInterior: 'C',
        pais: 'Mexico',
        estado: 'CDMX',
        paisDeResidencia: 'Mexico',
        ciudad: 'Mexico City',
        codigoPostal: '01000',
        correoElectronico: 'new@test.com',
        telefono: '5559876543'
      };
      
      const initialLength = component.datosDelChoferExtranjeros.length;
      const spy = jest.spyOn(component, 'openModal');

      component.editSelectedRow(newChofer as any);

      expect(component.datosChofere).not.toEqual(newChofer);
      expect(spy).not.toHaveBeenCalled();
    });

    
    it('should delete row when row is selected', () => {
      const newChofer: ChoferesExtranjeros = component.datosDelChoferExtranjeros[0];
      
      const initialLength = component.datosDelChoferExtranjeros.length;
      component.datosDelChoferExtranjerosSelected = [newChofer];

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjeros.length).toEqual(initialLength-1);
    });

    it('should not delete row when row is NOT selected', () => {
      // const newChofer: ChoferesExtranjeros = component.datosDelChoferExtranjeros[0];
      
      const initialLength = component.datosDelChoferExtranjeros.length;
      component.datosDelChoferExtranjerosSelected = [];

      component.deleteSelectedRow();

      expect(component.datosDelChoferExtranjeros.length).toEqual(initialLength);
    });
  });

  describe('Readonly Mode', () => {
    it('should properly set readonly mode when consultaio state indicates readonly', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      consultaioQueryMock.selectConsultaioState$ = of(readonlyState);
      let comp = new ChofereAltaDeExtranjerosComponent(
                        bsModalServiceMock, 
                        chofer40103ServiceMock,
                        chofer40103QueryMock,
                        consultaioQueryMock
      );

      comp.ngOnInit();

      expect(comp.isReadonly).toBe(true);
      expect(comp.datosConsulta?.readonly).toBe(true);
    });

    it('should not set readonly mode when consultaio state indicates not readonly', () => {
      const editableState = { ...mockConsultaioState, readonly: false };
      consultaioQueryMock.selectConsultaioState$ = of(editableState);
      
      component.ngOnInit();
      
      expect(component.isReadonly).toBe(false);
      expect(component.datosConsulta).toBeUndefined();
    });
  });

  describe('Component Properties', () => {
    it('should initialize with default values', () => {
      expect(component.datosDelChoferExtranjeros).toEqual([]);
      expect(component.isReadonly).toBe(false);
      expect(component.destroy$).toBeInstanceOf(Subject);
    });

    it('should handle datosConsulta being undefined', () => {
      expect(component.datosConsulta).toBeUndefined();
    });

    it('should handle modalRef being undefined initially', () => {
      expect(component.modalRef).toBeUndefined();
    });
  });

  // describe('Edge Cases', () => {
  //   // it('should handle concurrent modal operations', () => {
  //   //   const templateRef = {} as any;
  //   //   component.modalAgregarChoferExtranjero = templateRef;
      
  //   //   component.openModalAgregarChoferExtranjero();
  //   //   component.openModalEditarChoferExtranjero(mockChoferExtranjeroData[0]);
      
  //   //   expect(bsModalServiceMock.show).toHaveBeenCalledTimes(2);
  //   //   expect(component.isEdit).toBe(true);
  //   // });

  //   // it('should handle data operations with malformed data', () => {
  //   //   const malformedChofer = {
  //   //     // Missing required fields
  //   //     nombre: 'Malformed'
  //   //   } as ChoferesExtranjeros;
      
  //   //   expect(() => {
  //   //     component.addModal(malformedChofer);
  //   //     component.editSelectedRow(malformedChofer);
  //   //     component.deleteChoferExtranjero(malformedChofer);
  //   //   }).not.toThrow();
  //   // });

  //   // it('should handle extremely large datasets', () => {
  //   //   const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
  //   //     ...mockChoferExtranjeroData[0],
  //   //     id: i + 1,
  //   //     nombre: `Chofer ${i + 1}`
  //   //   }));
      
  //   //   component.datosDelChoferExtranjeros = largeDataset;
      
  //   //   const newChofer = {
  //   //     id: 1001,
  //   //     nombre: 'New Large Dataset Chofer'
  //   //   } as ChoferesExtranjeros;

  //   //   component.addChoferExtranjero(newChofer);
      
  //   //   expect(component.datosDelChoferExtranjeros.length).toBe(1001);
  //   // });
  // });

  describe('Memory Management', () => {
    it('should properly clean up subscriptions', () => {
      const subscription = component.ngOnInit();
      const destroySpy = jest.spyOn(component.destroy$, 'next');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalledWith(true);
    });

    it('should handle multiple subscription cleanup calls', () => {
      component.ngOnInit();
      
      const nextSpy = jest.spyOn(component.destroy$, 'next');
      const completeSpy = jest.spyOn(component.destroy$, 'complete');
      
      component.ngOnDestroy();
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(2);
      expect(completeSpy).toHaveBeenCalledTimes(2);
    });
  });
});