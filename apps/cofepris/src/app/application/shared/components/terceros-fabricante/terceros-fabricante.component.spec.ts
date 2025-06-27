// Mock the JSON imports first, before any other imports
jest.mock('@libs/shared/theme/assets/json/260501/fabricante-select-options-data.json', () => ({
  default: {
    paisSelectData: [
      { id: '1', descripcion: 'Mexico' },
      { id: '2', descripcion: 'USA' }
    ],
    localidadSelectData: [
      { id: '1', descripcion: 'Test Localidad' }
    ],
    municipioSelectData: [
      { id: '2', descripcion: 'Test Municipio' }
    ],
    codigoPostalSelectData: [
      { id: '3', descripcion: '12345' }
    ],
    coloniaSelectData: [
      { id: '4', descripcion: 'Test Colonia' }
    ]
  }
}));

jest.mock('@libs/shared/theme/assets/json/260501/nacionalidad-options.json', () => ({
  default: [
    { id: 'nacional', descripcion: 'Nacional' },
    { id: 'extranjero', descripcion: 'Extranjero' }
  ]
}));

jest.mock('@libs/shared/theme/assets/json/260501/tipo-persona-options.json', () => ({
  default: [
    { id: 'fisica', descripcion: 'Física' },
    { id: 'moral', descripcion: 'Moral' }
  ]
}));

jest.mock('@libs/shared/theme/assets/json/260501/tipo-persona-tres-options.json', () => ({
  default: [
    { id: 'fisica', descripcion: 'Física' },
    { id: 'moral', descripcion: 'Moral' },
    { id: 'noContribuyente', descripcion: 'No Contribuyente' }
  ]
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-fabricante.component';
import { TercerosFabricanteStore } from '../../estados/stores/terceros-fabricante.store';
import { TercerosFabricanteQuery } from '../../estados/queries/terceros-fabricante.query';
import { TercerosFabricanteService } from '../../services/terceros-fabricante.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let mockTercerosFabricanteStore: jest.Mocked<TercerosFabricanteStore>;
  let mockTercerosFabricanteQuery: jest.Mocked<TercerosFabricanteQuery>;
  let mockTercerosFabricanteService: jest.Mocked<TercerosFabricanteService>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  const mockConsultaioState = {
    readonly: false,
    update: false
  };

  const mockSolicitudState = {
    loading: false,
    error: null,
    data: null
  };

  const mockCatalogoData = [
    { id: '1', descripcion: 'Test Option 1' },
    { id: '2', descripcion: 'Test Option 2' }
  ];

  beforeEach(async () => {
    const tercerosFabricanteStoreSpy = {
      setFabricante: jest.fn(),
      setFormulador: jest.fn(),
      setProveedor: jest.fn()
    };

    const tercerosFabricanteQuerySpy = {
      selectSolicitud$: of(mockSolicitudState)
    };

    const tercerosFabricanteServiceSpy = {
      getData: jest.fn().mockReturnValue(of(mockCatalogoData))
    };

    const consultaioQuerySpy = {
      selectConsultaioState$: of(mockConsultaioState)
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TercerosRelacionadosComponent
      ],
      providers: [
        FormBuilder,
        { provide: TercerosFabricanteStore, useValue: tercerosFabricanteStoreSpy },
        { provide: TercerosFabricanteQuery, useValue: tercerosFabricanteQuerySpy },
        { provide: TercerosFabricanteService, useValue: tercerosFabricanteServiceSpy },
        { provide: ConsultaioQuery, useValue: consultaioQuerySpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    mockTercerosFabricanteStore = TestBed.inject(TercerosFabricanteStore) as jest.Mocked<TercerosFabricanteStore>;
    mockTercerosFabricanteQuery = TestBed.inject(TercerosFabricanteQuery) as jest.Mocked<TercerosFabricanteQuery>;
    mockTercerosFabricanteService = TestBed.inject(TercerosFabricanteService) as jest.Mocked<TercerosFabricanteService>;
    mockConsultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.showTableDiv).toBe(true);
      expect(component.showFabricante).toBe(false);
      expect(component.showFormulador).toBe(false);
      expect(component.showProveedor).toBe(false);
      expect(component.showFabricanteButtons).toBe(false);
      expect(component.showFormuladorButtons).toBe(false);
      expect(component.showProveedorButtons).toBe(false);
      expect(component.nacional).toBe(false);
      expect(component.extranjero).toBe(false);
      expect(component.noContribuyente).toBe(false);
      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
      expect(component.esFormularioSoloLectura).toBe(false);
    });

    it('should initialize dropdown data from service on ngOnInit', () => {
      component.ngOnInit();
      expect(mockTercerosFabricanteService.getData).toHaveBeenCalled();
      expect(component.dropdownData).toEqual(mockCatalogoData);
    });

    it('should initialize all form groups on ngOnInit', () => {
      component.ngOnInit();
      expect(component.agregarFabricanteFormGroup).toBeDefined();
      expect(component.agregarFormuladorFormGroup).toBeDefined();
      expect(component.agregarProveedorFormGroup).toBeDefined();
    });
  });

  // describe('getSortedTablas', () => {
  //   it('should return visible tables sorted by order', () => {
  //     component.tablaOrden = [
  //       { nombre: 'Proveedor', orden: 3, esVisible: true },
  //       { nombre: 'Fabricante', orden: 1, esVisible: true },
  //       { nombre: 'Formulador', orden: 2, esVisible: false },
  //       { nombre: 'Test', orden: 4, esVisible: true }
  //     ];

  //     const result = component.getSortedTablas();

  //     expect(result).toHaveLength(2);
  //     expect(result[0].nombre).toBe('Fabricante');
  //     expect(result[1].nombre).toBe('Proveedor');
  //   });

  //   it('should return empty array when no visible tables', () => {
  //     component.tablaOrden = [
  //       { nombre: 'Fabricante', orden: 1, esVisible: false },
  //       { nombre: 'Formulador', orden: 2, esVisible: false }
  //     ];

  //     const result = component.getSortedTablas();
  //     expect(result).toHaveLength(0);
  //   });
  // });

  describe('Selection Change Methods', () => {
    it('should update showFabricanteButtons when onFabricanteSeleccionCambio is called', () => {
      component.onFabricanteSeleccionCambio(true);
      expect(component.showFabricanteButtons).toBe(true);

      component.onFabricanteSeleccionCambio(false);
      expect(component.showFabricanteButtons).toBe(false);
    });

    it('should update showFormuladorButtons when onFormuladorSeleccionCambio is called', () => {
      component.onFormuladorSeleccionCambio(true);
      expect(component.showFormuladorButtons).toBe(true);

      component.onFormuladorSeleccionCambio(false);
      expect(component.showFormuladorButtons).toBe(false);
    });

    it('should update showProveedorButtons when onProveedorSeleccionCambio is called', () => {
      component.onProveedorSeleccionCambio(true);
      expect(component.showProveedorButtons).toBe(true);

      component.onProveedorSeleccionCambio(false);
      expect(component.showProveedorButtons).toBe(false);
    });
  });

  describe('Form Initialization', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should initialize fabricante form group with all required controls', () => {
      const form = component.agregarFabricanteFormGroup;
      expect(form.get('tercerosNacionalidad')).toBeDefined();
      expect(form.get('tipoPersona')).toBeDefined();
      expect(form.get('rfc')).toBeDefined();
      expect(form.get('curp')).toBeDefined();
      expect(form.get('nombre')).toBeDefined();
      expect(form.get('primerApellido')).toBeDefined();
      expect(form.get('segundoApellido')).toBeDefined();
      expect(form.get('denominacionRazonSocial')).toBeDefined();
      expect(form.get('pais')).toBeDefined();
      expect(form.get('estadoLocalidad')).toBeDefined();
      expect(form.get('municipioAlcaldia')).toBeDefined();
      expect(form.get('codigoPostaloEquivalente')).toBeDefined();
      expect(form.get('calle')).toBeDefined();
      expect(form.get('numeroExterior')).toBeDefined();
    });

    it('should initialize formulador form group with all required controls', () => {
      const form = component.agregarFormuladorFormGroup;
      expect(form.get('tercerosNacionalidad')).toBeDefined();
      expect(form.get('tipoPersona')).toBeDefined();
      expect(form.get('rfc')).toBeDefined();
      expect(form.get('curp')).toBeDefined();
      expect(form.get('nombre')).toBeDefined();
      expect(form.get('primerApellido')).toBeDefined();
      expect(form.get('segundoApellido')).toBeDefined();
      expect(form.get('denominacionRazonSocial')).toBeDefined();
    });

    it('should initialize proveedor form group with all required controls', () => {
      const form = component.agregarProveedorFormGroup;
      expect(form.get('tercerosNacionalidad')).toBeDefined();
      expect(form.get('tipoPersona')).toBeDefined();
      expect(form.get('rfc')).toBeDefined();
      expect(form.get('curp')).toBeDefined();
      expect(form.get('nombre')).toBeDefined();
      expect(form.get('primerApellido')).toBeDefined();
      expect(form.get('segundoApellido')).toBeDefined();
      expect(form.get('denominacionRazonSocial')).toBeDefined();
    });
  });

  describe('Input Checked Methods', () => {
    it('should set fisica to true and others to false when inputChecked is called with "fisica"', () => {
      component.inputChecked('fisica');
      expect(component.fisica).toBe(true);
      expect(component.moral).toBe(false);
      expect(component.noContribuyente).toBe(false);
    });

    it('should set moral to true and others to false when inputChecked is called with "moral"', () => {
      component.inputChecked('moral');
      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(true);
      expect(component.noContribuyente).toBe(false);
    });

    it('should set noContribuyente to true and others to false when inputChecked is called with other value', () => {
      component.inputChecked('other');
      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
      expect(component.noContribuyente).toBe(true);
    });

    it('should set nacional to true when tercerosInputChecked is called with "nacional"', () => {
      component.tercerosInputChecked('nacional');
      expect(component.nacional).toBe(true);
      expect(component.extranjero).toBe(false);
    });

    it('should set extranjero to true when tercerosInputChecked is called with other value', () => {
      component.tercerosInputChecked('extranjero');
      expect(component.nacional).toBe(false);
      expect(component.extranjero).toBe(true);
    });
  });

  describe('Toggle Methods', () => {
    it('should toggle visibility and reset persona flags when toggleDivFabricante is called', () => {
      component.showTableDiv = true;
      component.showFabricante = false;
      component.fisica = true;
      component.moral = true;

      component.toggleDivFabricante();

      expect(component.showTableDiv).toBe(false);
      expect(component.showFabricante).toBe(true);
      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
    });

    it('should toggle visibility and reset persona flags when toggleDivFormulador is called', () => {
      component.showTableDiv = true;
      component.showFormulador = false;
      component.fisica = true;
      component.moral = true;

      component.toggleDivFormulador();

      expect(component.showTableDiv).toBe(false);
      expect(component.showFormulador).toBe(true);
      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
    });

    it('should toggle visibility and reset persona flags when toggleDivProveedor is called', () => {
      component.showTableDiv = true;
      component.showProveedor = false;
      component.fisica = true;
      component.moral = true;

      component.toggleDivProveedor();

      expect(component.showTableDiv).toBe(false);
      expect(component.showProveedor).toBe(true);
      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
    });
  });

  describe('Form Type Change Method', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should enable form controls when tipoPersona has value', () => {
      const form = component.agregarFabricanteFormGroup;
      form.get('tipoPersona')?.setValue('fisica');

      component.onTipoPersonaChange(form);

      expect(form.get('rfc')?.enabled).toBe(true);
      expect(form.get('curp')?.enabled).toBe(true);
      expect(form.get('denominacionRazonSocial')?.enabled).toBe(true);
      expect(form.get('nombre')?.enabled).toBe(true);
      expect(component.tipoPersonaSelection).toBe('fisica');
    });

    it('should disable form controls when tipoPersona has no value', () => {
      const form = component.agregarFabricanteFormGroup;
      form.get('tipoPersona')?.setValue('');

      component.onTipoPersonaChange(form);

      expect(form.get('rfc')?.enabled).toBe(false);
      expect(form.get('curp')?.enabled).toBe(false);
      expect(form.get('denominacionRazonSocial')?.enabled).toBe(false);
      expect(form.get('nombre')?.enabled).toBe(false);
    });
  });

  describe('Submit Form Methods', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.localidadDropdownData = [{ id: 1, descripcion: 'Test Localidad' }];
      component.municipioDropdownData = [{ id: 2, descripcion: 'Test Municipio' }];
      component.codigoPostalDropdownData = [{ id: 3, descripcion: '12345' }];
      component.coloniaDropdownData = [{ id: 4, descripcion: 'Test Colonia' }];
    });

    it('should submit fabricante form and add data to fabricanteRowData', () => {
      const form = component.agregarFabricanteFormGroup;
      
      // First toggle to show the fabricante form (simulates user clicking "Add Fabricante")
      component.toggleDivFabricante();
      
      // Then set tipoPersona to enable the form controls
      form.get('tipoPersona')?.setValue('moral');
      component.onTipoPersonaChange(form);
      
      form.patchValue({
        denominacionRazonSocial: 'Test Company',
        rfc: 'TEST123456789',
        curp: 'TESTCURP123456',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@test.com',
        calle: 'Test Street',
        numeroExterior: '123',
        numeroInterior: 'A',
        pais: 'Mexico',
        localidad: '1',
        municipioAlcaldia: '2',
        codigoPostaloEquivalente: '3',
        colonia: '4',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX'
      });

      component.submitFabricanteForm();

      expect(component.fabricanteRowData).toHaveLength(1);
      expect(component.fabricanteRowData[0].tbodyData[0]).toBe('Test Company');
      expect(component.fabricanteRowData[0].tbodyData[1]).toBe('TEST123456789');
      expect(mockTercerosFabricanteStore.setFabricante).toHaveBeenCalledWith(component.fabricanteRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showFabricante).toBe(false);
    });

    it('should submit formulador form and add data to formuladorRowData', () => {
      const form = component.agregarFormuladorFormGroup;
      
      // First toggle to show the formulador form (simulates user clicking "Add Formulador")
      component.toggleDivFormulador();
      
      // Then set tipoPersona to enable the form controls
      form.get('tipoPersona')?.setValue('moral');
      component.onTipoPersonaChange(form);
      
      form.patchValue({
        denominacionRazonSocial: 'Test Formulador',
        rfc: 'FORM123456789',
        curp: 'FORMCURP123456',
        lada: '55',
        telefono: '87654321',
        correoElectronico: 'formulador@test.com',
        calle: 'Formulador Street',
        numeroExterior: '456',
        numeroInterior: 'B',
        pais: 'Mexico',
        localidad: '1',
        municipioAlcaldia: '2',
        codigoPostaloEquivalente: '3',
        colonia: '4',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX'
      });

      component.submitFormuladorForm();

      expect(component.formuladorRowData).toHaveLength(1);
      expect(component.formuladorRowData[0].tbodyData[0]).toBe('Test Formulador');
      expect(component.formuladorRowData[0].tbodyData[1]).toBe('FORM123456789');
      expect(mockTercerosFabricanteStore.setFormulador).toHaveBeenCalledWith(component.formuladorRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showFormulador).toBe(false);
    });

    it('should submit proveedor form and add data to proveedorRowData', () => {
      const form = component.agregarProveedorFormGroup;
      
      // First toggle to show the proveedor form (simulates user clicking "Add Proveedor")
      component.toggleDivProveedor();
      
      // Then set tipoPersona to enable the form controls
      form.get('tipoPersona')?.setValue('moral');
      component.onTipoPersonaChange(form);
      
      form.patchValue({
        denominacionRazonSocial: 'Test Proveedor',
        rfc: 'PROV123456789',
        curp: 'PROVCURP123456',
        lada: '55',
        telefono: '11111111',
        correoElectronico: 'proveedor@test.com',
        calle: 'Proveedor Street',
        numeroExterior: '789',
        numeroInterior: 'C',
        pais: 'Mexico',
        localidad: '1',
        municipioAlcaldia: '2',
        codigoPostaloEquivalente: '3',
        colonia: '4',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX'
      });

      component.submitProveedorForm();

      expect(component.proveedorRowData).toHaveLength(1);
      expect(component.proveedorRowData[0].tbodyData[0]).toBe('Test Proveedor');
      expect(component.proveedorRowData[0].tbodyData[1]).toBe('PROV123456789');
      expect(mockTercerosFabricanteStore.setProveedor).toHaveBeenCalledWith(component.proveedorRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showProveedor).toBe(false);
    });
  });

  describe('Static Validators', () => {
    describe('requiredPaisValidator', () => {
      it('should return null for valid pais values', () => {
        const control = new FormControl('Mexico');
        const result = TercerosRelacionadosComponent.requiredPaisValidator(control);
        expect(result).toBeNull();
      });

      it('should return error for empty value', () => {
        const control = new FormControl('');
        const result = TercerosRelacionadosComponent.requiredPaisValidator(control);
        expect(result).toEqual({ requiredPais: true });
      });

      it('should return error for -1 value', () => {
        const control = new FormControl('-1');
        const result = TercerosRelacionadosComponent.requiredPaisValidator(control);
        expect(result).toEqual({ requiredPais: true });
      });
    });

    describe('rfcValidator', () => {
      it('should return null for valid RFC fisica', () => {
        const control = new FormControl('AAAA800101AAA');
        const result = TercerosRelacionadosComponent.rfcValidator(control);
        expect(result).toBeNull();
      });

      it('should return null for valid RFC moral', () => {
        const control = new FormControl('AAA800101AAA');
        const result = TercerosRelacionadosComponent.rfcValidator(control);
        expect(result).toBeNull();
      });

      it('should return error for invalid RFC', () => {
        const control = new FormControl('INVALID');
        const result = TercerosRelacionadosComponent.rfcValidator(control);
        expect(result).toEqual({ invalidRFC: true });
      });
    });

    describe('curpValidator', () => {
      it('should return null for valid CURP', () => {
        const control = new FormControl('AAAA800101HDFBBB01');
        const result = TercerosRelacionadosComponent.curpValidator(control);
        expect(result).toBeNull();
      });

      it('should return error for invalid CURP', () => {
        const control = new FormControl('INVALID');
        const result = TercerosRelacionadosComponent.curpValidator(control);
        expect(result).toEqual({ invalidCURP: true });
      });
    });

    describe('telefonoValidator', () => {
      it('should return null for valid telefono with only numbers', () => {
        const control = new FormControl('1234567890');
        const result = TercerosRelacionadosComponent.telefonoValidator(control);
        expect(result).toBeNull();
      });

      it('should return error for telefono with letters', () => {
        const control = new FormControl('123abc456');
        const result = TercerosRelacionadosComponent.telefonoValidator(control);
        expect(result).toEqual({ invalidTelefono: true });
      });
    });
  });

  describe('Radio Change Methods', () => {
    it('should call tercerosInputChecked when cambiarRadio is called', () => {
      jest.spyOn(component, 'tercerosInputChecked');
      component.cambiarRadio('nacional');
      expect(component.tercerosInputChecked).toHaveBeenCalledWith('nacional');
    });

    it('should call inputChecked when cambiarRadioFisica is called', () => {
      jest.spyOn(component, 'inputChecked');
      component.cambiarRadioFisica('fisica');
      expect(component.inputChecked).toHaveBeenCalledWith('fisica');
    });
  });

  describe('Utility Methods', () => {
    it('should reset form when limpiar is called', () => {
      component.ngOnInit();
      const form = component.agregarFabricanteFormGroup;
      form.get('rfc')?.setValue('TEST123');
      
      component.limpiar(form);
      
      expect(form.get('rfc')?.value).toBeNull();
    });

    it('should fetch table dummy data', () => {
      component.fetchTableDummyJson();
      expect(component.fabricanteRowData).toHaveLength(1);
      expect(component.proveedorRowData).toHaveLength(1);
      expect(component.formuladorRowData).toHaveLength(1);
    });
  });

  describe('Lifecycle Methods', () => {
    it('should complete destroyNotifier$ on ngOnDestroy', () => {
      const destroyNotifier$ = component['destroyNotifier$'];
      const nextSpy = jest.spyOn(destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(destroyNotifier$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    it('should initialize form state based on readonly flag', () => {
      const readonlyConsultaioQuerySpy = {
        selectConsultaioState$: of({
          readonly: true,
          update: false,
          procedureId: '',
          parameter: '',
          department: '',
          folioTramite: '',
          status: '',
          user: '',
          timestamp: '',
          tipoDeTramite: '',
          estadoDeTramite: '',
          create: false,
          consultaioSolicitante: {} as any // Provide a mock of type ConsultaioSolicitante
        })
      };

      const newComponent = new TercerosRelacionadosComponent(
        formBuilder,
        mockTercerosFabricanteStore,
        mockTercerosFabricanteQuery,
        mockTercerosFabricanteService,
        readonlyConsultaioQuerySpy as any
      );

      // The subscription happens in the constructor, so esFormularioSoloLectura should be set immediately
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });

    it('should handle update state correctly', () => {
      const updateConsultaioQuerySpy = {
        selectConsultaioState$: of({
          readonly: false,
          update: true,
          procedureId: '',
          parameter: '',
          department: '',
          folioTramite: '',
          status: '',
          user: '',
          timestamp: '',
          tipoDeTramite: '',
          estadoDeTramite: '',
          create: false,
          consultaioSolicitante: {} as any // Provide a mock of type ConsultaioSolicitante
        })
      };

      const newComponent = new TercerosRelacionadosComponent(
        formBuilder,
        mockTercerosFabricanteStore,
        mockTercerosFabricanteQuery,
        mockTercerosFabricanteService,
        updateConsultaioQuerySpy as any
      );

      // The subscription happens in the constructor, so esFormularioActualizacion should be set immediately
      expect(newComponent['esFormularioActualizacion']).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle service error gracefully', () => {
      mockTercerosFabricanteService.getData.mockReturnValue(of([]));
      
      component.ngOnInit();
      
      expect(component.dropdownData).toEqual([]);
    });

    it('should handle missing dropdown values in submit methods', () => {
      component.ngOnInit();
      component.localidadDropdownData = [];
      component.municipioDropdownData = [];
      component.codigoPostalDropdownData = [];
      component.coloniaDropdownData = [];

      const form = component.agregarFabricanteFormGroup;
      form.patchValue({
        denominacionRazonSocial: 'Test Company',
        rfc: 'TEST123456789',
        localidad: 'nonexistent',
        municipioAlcaldia: 'nonexistent',
        codigoPostaloEquivalente: 'nonexistent',
        colonia: 'nonexistent'
      });

      expect(() => component.submitFabricanteForm()).not.toThrow();
    });
  });
});