import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { Sanitario260215Store } from '../../estados/tramites/sanitario260215.store';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Subject, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let mockSanitario260215Store: jest.Mocked<Sanitario260215Store>;
  let mockServiciosPermisoSanitarioService: jest.Mocked<ServiciosPermisoSanitarioService>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  const mockDropdownData = [
    { id: 1, descripcion: 'Test Item 1' },
    { id: 2, descripcion: 'Test Item 2' },
    { id: 3, descripcion: 'Test Item 3' }
  ];

  beforeEach(async () => {
    const sanitarioStoreSpy = {
      setFabricante: jest.fn(),
      setDestinatario: jest.fn(),
      setProveedor: jest.fn(),
      setFacturador: jest.fn()
    };

    const serviciosSpy = {
      getData: jest.fn().mockReturnValue(of(mockDropdownData))
    };

    const consultaioQuerySpy = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosComponent,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: Sanitario260215Store, useValue: sanitarioStoreSpy },
        { provide: ServiciosPermisoSanitarioService, useValue: serviciosSpy },
        { provide: ConsultaioQuery, useValue: consultaioQuerySpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    mockSanitario260215Store = TestBed.inject(Sanitario260215Store) as jest.Mocked<Sanitario260215Store>;
    mockServiciosPermisoSanitarioService = TestBed.inject(ServiciosPermisoSanitarioService) as jest.Mocked<ServiciosPermisoSanitarioService>;
    mockConsultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
    formBuilder = TestBed.inject(FormBuilder);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default properties', () => {
      expect(component.showTableDiv).toBe(true);
      expect(component.showFabricante).toBe(false);
      expect(component.showDestinatario).toBe(false);
      expect(component.showProveedor).toBe(false);
      expect(component.showFacturador).toBe(false);
      expect(component.showFabricanteButtons).toBe(false);
      expect(component.showDestinatarioButtons).toBe(false);
      expect(component.showProveedorButtons).toBe(false);
      expect(component.showFacturadorButtons).toBe(false);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.desactivarCatalogoSelectEnPopup).toBe(true);
    });

    it('should have proper dropdown data initialized', () => {
      expect(component.paisDropdownData).toBeDefined();
      expect(component.localidadDropdownData).toBeDefined();
      expect(component.municipioDropdownData).toBeDefined();
      expect(component.codigoPostalDropdownData).toBeDefined();
      expect(component.coloniaDropdownData).toBeDefined();
    });

    it('should have empty row data arrays initialized', () => {
      expect(component.fabricanteRowData).toEqual([]);
      expect(component.destinatarioRowData).toEqual([]);
      expect(component.proveedorRowData).toEqual([]);
      expect(component.facturadorRowData).toEqual([]);
    });
  });

  describe('ngOnInit', () => {
    it('should call service.getData and initialize forms', () => {
      jest.spyOn(component, 'initializeAgregarFabricanteFormGroup');
      jest.spyOn(component, 'initializeAgregarDestinatarioFormGroup');
      jest.spyOn(component, 'initializeAgregarProveedorFormGroup');
      jest.spyOn(component, 'initializeAgregarFacturadorFormGroup');

      component.ngOnInit();

      expect(mockServiciosPermisoSanitarioService.getData).toHaveBeenCalled();
      expect(component.initializeAgregarFabricanteFormGroup).toHaveBeenCalled();
      expect(component.initializeAgregarDestinatarioFormGroup).toHaveBeenCalled();
      expect(component.initializeAgregarProveedorFormGroup).toHaveBeenCalled();
      expect(component.initializeAgregarFacturadorFormGroup).toHaveBeenCalled();
    });

    it('should update dropdownData when service returns data', () => {
      component.ngOnInit();
      expect(component.dropdownData).toEqual(mockDropdownData);
    });
  });

  describe('Form Initialization', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should initialize fabricante form with required validators', () => {
      expect(component.agregarFabricanteFormGroup).toBeDefined();
      expect(component.agregarFabricanteFormGroup.get('tercerosNacionalidad')?.hasError('required')).toBe(true);
      expect(component.agregarFabricanteFormGroup.get('tipoPersona')?.hasError('required')).toBe(true);
      expect(component.agregarFabricanteFormGroup.get('pais')?.hasError('required')).toBe(true);
    });

    it('should initialize destinatario form with required validators', () => {
      expect(component.agregarDestinatarioFormGroup).toBeDefined();
      expect(component.agregarDestinatarioFormGroup.get('tipoPersona')?.hasError('required')).toBe(true);
      expect(component.agregarDestinatarioFormGroup.get('pais')?.hasError('required')).toBe(true);
    });

    it('should initialize proveedor form with required validators', () => {
      expect(component.agregarProveedorFormGroup).toBeDefined();
      expect(component.agregarProveedorFormGroup.get('tipoPersona')?.hasError('required')).toBe(true);
    });

    it('should initialize facturador form with required validators', () => {
      expect(component.agregarFacturadorFormGroup).toBeDefined();
      expect(component.agregarFacturadorFormGroup.get('tipoPersona')?.hasError('required')).toBe(true);
      expect(component.agregarFacturadorFormGroup.get('pais')?.hasError('required')).toBe(true);
    });
  });

  describe('Toggle Methods', () => {
    it('should toggle fabricante visibility and reset persona flags', () => {
      component.fisica = true;
      component.moral = true;
      component.showTableDiv = true;
      component.showFabricante = false;

      component.toggleDivFabricante();

      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
      expect(component.showTableDiv).toBe(false);
      expect(component.showFabricante).toBe(true);
    });

    it('should toggle destinatario visibility and reset persona flags', () => {
      component.fisica = true;
      component.moral = true;
      component.showTableDiv = true;
      component.showDestinatario = false;

      component.toggleDivDestinatario();

      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
      expect(component.showTableDiv).toBe(false);
      expect(component.showDestinatario).toBe(true);
    });

    it('should toggle proveedor visibility and reset persona flags', () => {
      component.fisica = true;
      component.moral = true;
      component.showTableDiv = true;
      component.showProveedor = false;

      component.toggleDivProveedor();

      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
      expect(component.showTableDiv).toBe(false);
      expect(component.showProveedor).toBe(true);
    });

    it('should toggle facturador visibility and reset persona flags', () => {
      component.fisica = true;
      component.moral = true;
      component.showTableDiv = true;
      component.showFacturador = false;

      component.toggleDivFacturador();

      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(false);
      expect(component.showTableDiv).toBe(false);
      expect(component.showFacturador).toBe(true);
    });
  });

  describe('Input Checked Methods', () => {
    it('should set fisica to true and moral to false when fisica is selected', () => {
      component.inputChecked('fisica');

      expect(component.fisica).toBe(true);
      expect(component.moral).toBe(false);
    });

    it('should set moral to true and fisica to false when moral is selected', () => {
      component.inputChecked('moral');

      expect(component.fisica).toBe(false);
      expect(component.moral).toBe(true);
    });

    it('should set nacional to true and extranjero to false when nacional is selected', () => {
      component.tercerosInputChecked('nacional');

      expect(component.nacional).toBe(true);
      expect(component.extranjero).toBe(false);
    });

    it('should set extranjero to true and nacional to false when extranjero is selected', () => {
      component.tercerosInputChecked('extranjero');

      expect(component.nacional).toBe(false);
      expect(component.extranjero).toBe(true);
    });
  });

  describe('Radio Change Methods', () => {
    it('should call tercerosInputChecked with correct value in cambiarRadio', () => {
      jest.spyOn(component, 'tercerosInputChecked');
      
      component.cambiarRadio('nacional');

      expect(component.tercerosInputChecked).toHaveBeenCalledWith('nacional');
    });

    it('should call inputChecked with correct value in cambiarRadioFisica', () => {
      jest.spyOn(component, 'inputChecked');
      
      component.cambiarRadioFisica('fisica');

      expect(component.inputChecked).toHaveBeenCalledWith('fisica');
    });
  });

  describe('onTipoPersonaChange', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should enable form controls when tipo persona is selected', () => {
      const formGroup = component.agregarFabricanteFormGroup;
      formGroup.get('tipoPersona')?.setValue('fisica');

      component.onTipoPersonaChange(formGroup);

      expect(formGroup.get('rfc')?.enabled).toBe(true);
      expect(formGroup.get('curp')?.enabled).toBe(true);
      expect(formGroup.get('denominacionRazonSocial')?.enabled).toBe(true);
      expect(formGroup.get('nombre')?.enabled).toBe(true);
      expect(component.desactivarCatalogoSelectEnPopup).toBe(false);
    });

    it('should disable form controls when tipo persona is not selected', () => {
      const formGroup = component.agregarFabricanteFormGroup;
      formGroup.get('tipoPersona')?.setValue('');

      component.onTipoPersonaChange(formGroup);

      expect(formGroup.get('rfc')?.enabled).toBe(false);
      expect(formGroup.get('curp')?.enabled).toBe(false);
      expect(formGroup.get('denominacionRazonSocial')?.enabled).toBe(false);
      expect(formGroup.get('nombre')?.enabled).toBe(false);
      expect(component.desactivarCatalogoSelectEnPopup).toBe(true);
    });
  });

  describe('Submit Form Methods', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should submit fabricante form and update store', () => {
      // Setup form with valid data
      const formData = {
        denominacionRazonSocial: 'Test Company',
        rfc: 'TEST123456ABC',
        curp: 'CURP123456HDFABC01',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@test.com',
        calle: 'Test Street',
        numeroExterior: '123',
        numeroInterior: '1',
        pais: 'Mexico',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX',
        coloniaoEquivalente: 'Test Colony',
        localidad: 1,
        municipioAlcaldia: 1,
        codigoPostaloEquivalente: 1,
        colonia: 1
      };

      component.agregarFabricanteFormGroup.patchValue(formData);
      component.showTableDiv = false;
      component.showFabricante = true;

      component.submitFabricanteForm();

      expect(component.fabricanteRowData.length).toBe(1);
      expect(mockSanitario260215Store.setFabricante).toHaveBeenCalledWith(component.fabricanteRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showFabricante).toBe(false);
    });

    it('should submit destinatario form and update store', () => {
      // Setup form with valid data
      const formData = {
        denominacionRazonSocial: 'Test Company',
        rfc: 'TEST123456ABC',
        curp: 'CURP123456HDFABC01',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@test.com',
        calle: 'Test Street',
        numeroExterior: '123',
        numeroInterior: '1',
        pais: 'Mexico',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX',
        coloniaoEquivalente: 'Test Colony'
      };

      component.agregarDestinatarioFormGroup.patchValue(formData);
      component.showTableDiv = false;
      component.showDestinatario = true;

      component.submitDestinatarioForm();

      expect(component.destinatarioRowData.length).toBe(1);
      expect(mockSanitario260215Store.setDestinatario).toHaveBeenCalledWith(component.destinatarioRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showDestinatario).toBe(false);
    });

    it('should submit proveedor form and update store', () => {
      // Setup form with valid data
      const formData = {
        denominacionRazonSocial: 'Test Company',
        rfc: 'TEST123456ABC',
        curp: 'CURP123456HDFABC01',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@test.com',
        calle: 'Test Street',
        numeroExterior: '123',
        numeroInterior: '1',
        pais: 'Mexico',
        colonia: 'Test Colony',
        municipioAlcaldia: 'Test Municipality',
        localidad: 'Test Locality',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX',
        codigoPostaloEquivalente: '12345',
        coloniaoEquivalente: 'Test Colony'
      };

      component.agregarProveedorFormGroup.patchValue(formData);
      component.showTableDiv = false;
      component.showProveedor = true;

      component.submitProveedorForm();

      expect(component.proveedorRowData.length).toBe(1);
      expect(mockSanitario260215Store.setProveedor).toHaveBeenCalledWith(component.proveedorRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showProveedor).toBe(false);
    });

    it('should submit facturador form and update store', () => {
      // Setup form with valid data
      const formData = {
        denominacionRazonSocial: 'Test Company',
        rfc: 'TEST123456ABC',
        curp: 'CURP123456HDFABC01',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@test.com',
        calle: 'Test Street',
        numeroExterior: '123',
        numeroInterior: '1',
        pais: 'Mexico',
        colonia: 'Test Colony',
        municipioAlcaldia: 'Test Municipality',
        localidad: 'Test Locality',
        entidadFederativa: 'CDMX',
        estadoLocalidad: 'CDMX',
        codigoPostaloEquivalente: '12345',
        coloniaoEquivalente: 'Test Colony'
      };

      component.agregarFacturadorFormGroup.patchValue(formData);
      component.showTableDiv = false;
      component.showFacturador = true;

      component.submitFacturadorForm();

      expect(component.facturadorRowData.length).toBe(1);
      expect(mockSanitario260215Store.setFacturador).toHaveBeenCalledWith(component.facturadorRowData);
      expect(component.showTableDiv).toBe(true);
      expect(component.showFacturador).toBe(false);
    });
  });

  describe('Validators', () => {
    describe('requiredPaisValidator', () => {
      it('should return null for valid pais values', () => {
        const control = new FormControl('Mexico');
        const result = TercerosRelacionadosComponent.requiredPaisValidator(control);
        expect(result).toBeNull();
      });

      it('should return error for empty string', () => {
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
      it('should return null for valid RFC persona fisica', () => {
        const control = new FormControl('CURP771225ABC');
        const result = TercerosRelacionadosComponent.rfcValidator(control);
        expect(result).toBeNull();
      });

      it('should return null for valid RFC persona moral', () => {
        const control = new FormControl('ABC123456DEF');
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
        const control = new FormControl('CURP771225HDFABC01');
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
      it('should return null for valid telefono with numbers only', () => {
        const control = new FormControl('1234567890');
        const result = TercerosRelacionadosComponent.telefonoValidator(control);
        expect(result).toBeNull();
      });

      it('should return null for valid telefono with allowed characters', () => {
        const control = new FormControl('123-456-7890');
        const result = TercerosRelacionadosComponent.telefonoValidator(control);
        expect(result).toBeNull();
      });

      it('should return null for telefono with parentheses', () => {
        const control = new FormControl('(555) 123-4567');
        const result = TercerosRelacionadosComponent.telefonoValidator(control);
        expect(result).toBeNull();
      });

      it('should return error for telefono with invalid characters', () => {
        const control = new FormControl('123@456#7890');
        const result = TercerosRelacionadosComponent.telefonoValidator(control);
        expect(result).toEqual({ invalidTelefono: true });
      });
    });
  });

  describe('fetchTableDummyJson', () => {
    it('should populate all row data arrays with dummy data', () => {
      component.fetchTableDummyJson();

      expect(component.fabricanteRowData.length).toBe(1);
      expect(component.destinatarioRowData.length).toBe(1);
      expect(component.proveedorRowData.length).toBe(1);
      expect(component.facturadorRowData.length).toBe(1);
    });
  });

  // describe('ConsultaioQuery subscription', () => {
  //   it('should handle readonly state from ConsultaioQuery', () => {
  //     const mockQueryWithReadonly = {
  //       selectConsultaioState$: of({ readonly: true })
  //     };

  //     TestBed.overrideProvider(ConsultaioQuery, { useValue: mockQueryWithReadonly });
      
  //     jest.spyOn(component, 'fetchTableDummyJson');
      
  //     // Recreate component to trigger constructor
  //     const newFixture = TestBed.createComponent(TercerosRelacionadosComponent);
  //     const newComponent = newFixture.componentInstance;

  //     expect(newComponent.esFormularioSoloLectura).toBe(true);
  //     expect(newComponent.fetchTableDummyJson).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$ subject', () => {
      const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

      component.ngOnDestroy();

      expect(destroyNotifierSpy).toHaveBeenCalled();
      expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
    });
  });

  describe('Propiedades del componente', () => {
    it('debe tener el texto de alerta correcto', () => {
      expect(component.TEXTO_DE_ALERTA).toBe('Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.');
    });

    it('debe tener los encabezados de todas las tablas definidos', () => {
      expect(component.fabricanteHeaderData).toBeDefined();
      expect(component.destinatarioHeaderData).toBeDefined();
      expect(component.proveedorHeaderData).toBeDefined();
      expect(component.facturadorHeaderData).toBeDefined();
    });
  });
});
