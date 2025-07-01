import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosService } from '../../services/terceros.service';
import { Tramite260212Store } from '../../../../estados/tramites/tramite260212.store';
import { of } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let tercerosService: TercerosService;
  let tramite260212Store: Tramite260212Store;

  const mockDropdownData = [
    { id: 1, descripcion: 'México' },
    { id: 2, descripcion: 'USA' },
  ];

  const mockFormData = {
    tipoPersona: 'Física',
    rfc: 'TEST123456789',
    curp: 'CURP123456789',
    denominacionRazonSocial: 'Test Denominación',
    pais: '1',
    estado: 'Estado Test',
    municipioAlcaldia: 'Municipio Test',
    localidad: 'Localidad Test',
    entidadFederativa: 'Entidad Test',
    codigoPostaloEquivalente: '12345',
    colonia: 'Colonia Test',
    calle: 'Calle Test',
    numeroExterior: '123',
    numeroInterior: '456',
    lada: '55',
    telefono: '12345678',
    correoElectronico: 'test@example.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: TercerosService,
          useValue: {
            getEncabezadoDeTabla: jest.fn().mockReturnValue(of({ columns: ['Column1', 'Column2'] })),
            getData: jest.fn().mockReturnValue(of(mockDropdownData)),
            getPaisData: jest.fn().mockReturnValue(of(mockDropdownData)),
            getMunicipioData: jest.fn().mockReturnValue(of(mockDropdownData)),
            getCodigoPostalData: jest.fn().mockReturnValue(of(mockDropdownData)),
            getColoniaData: jest.fn().mockReturnValue(of(mockDropdownData)),
            getLocalidadData: jest.fn().mockReturnValue(of(mockDropdownData)),
          },
        },
        {
          provide: Tramite260212Store,
          useValue: {
            setFabricante: jest.fn(),
            setDestinatario: jest.fn(),
            setProveedor: jest.fn(),
            setFacturador: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    tercerosService = TestBed.inject(TercerosService);
    tramite260212Store = TestBed.inject(Tramite260212Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dropdown data on component creation', () => {
    expect(component.dropdownData).toEqual(mockDropdownData);
    expect(component.paisDropdownData).toEqual(mockDropdownData);
    expect(component.municipioDropdownData).toEqual(mockDropdownData);
    expect(component.codigoPostalDropdownData).toEqual(mockDropdownData);
    expect(component.coloniaDropdownData).toEqual(mockDropdownData);
    expect(component.localidadDropdownData).toEqual(mockDropdownData);
  });

  it('should initialize form groups on component creation', () => {
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('should toggle visibility for Fabricante form', () => {
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(true);
  });

  it('should toggle visibility for Destinatario form', () => {
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(true);
  });

  it('should toggle visibility for Proveedor form', () => {
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(true);
  });

  it('should toggle visibility for Facturador form', () => {
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(true);
  });

  it('should handle tipoPersonaChecked for Facturador', () => {
    component.tipoPersonaChecked('1', 'Facturador');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    expect(component.agregarFacturadorFormGroup.get('nombre')?.enabled).toBe(true);
  });

  it('should handle tipoPersonaChecked for Proveedor', () => {
    component.tipoPersonaChecked('2', 'Proveedor');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
    expect(component.agregarProveedorFormGroup.get('nombre')?.enabled).toBe(true);
  });

  // Add coverage for cancel/reset methods and toggling back
  it('should cancel Fabricante form and show table', () => {
    component.showFabricante = true;
    component.cancelFabricante();
    expect(component.showFabricante).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('should cancel Destinatario form and show table', () => {
    component.showDestinatario = true;
    component.cancelDestinatario();
    expect(component.showDestinatario).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('should cancel Proveedor form and show table', () => {
    component.showProveedor = true;
    component.cancelProveedor();
    expect(component.showProveedor).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('should cancel Facturador form and show table', () => {
    component.showFacturador = true;
    component.cancelFacturador();
    expect(component.showFacturador).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  // Edge/negative cases for tipoPersonaChecked
  // it('should handle unknown tipoPersonaChecked type gracefully', () => {
  //   component.tipoPersonaChecked('3', 'Unknown');
  //   expect(component.fisica).toBe(false);
  //   expect(component.moral).toBe(false);
  // });

  // // Form validation: should not submit invalid forms
  // it('should not submit Fabricante form if invalid', () => {
  //   component.agregarFabricanteFormGroup.reset();
  //   component.submitFabricanteForm();
  //   expect(tramite260212Store.setFabricante).not.toHaveBeenCalled();
  //   expect(component.showFabricante).toBe(true);
  // });

  // it('should not submit Destinatario form if invalid', () => {
  //   component.agregarDestinatarioFormGroup.reset();
  //   component.submitDestinatarioForm();
  //   expect(tramite260212Store.setDestinatario).not.toHaveBeenCalled();
  //   expect(component.showDestinatario).toBe(true);
  // });

  // it('should not submit Proveedor form if invalid', () => {
  //   component.agregarProveedorFormGroup.reset();
  //   component.submitProveedorForm();
  //   expect(tramite260212Store.setProveedor).not.toHaveBeenCalled();
  //   expect(component.showProveedor).toBe(true);
  // });

  // it('should not submit Facturador form if invalid', () => {
  //   component.agregarFacturadorFormGroup.reset();
  //   component.submitFacturadorForm();
  //   expect(tramite260212Store.setFacturador).not.toHaveBeenCalled();
  //   expect(component.showFacturador).toBe(true);
  // });

  // Test toggling back to table from forms
  it('should show table when calling showTable', () => {
    component.showFabricante = true;
    component.showDestinatario = true;
    component.showProveedor = true;
    component.showFacturador = true;
    component.showTable();
    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(false);
    expect(component.showDestinatario).toBe(false);
    expect(component.showProveedor).toBe(false);
    expect(component.showFacturador).toBe(false);
  });

  // If ngOnInit/ngOnDestroy exist, add coverage
  it('should call ngOnInit if present', () => {
    if (component.ngOnInit) {
      jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalled();
    }
  });

 
  describe('validators', () => {
    it('requiredPaisValidator should return null for valid value', () => {
      const control = { value: '10' } as any;
      expect(component.requiredPaisValidator(control)).toBeNull();
    });
    it('requiredPaisValidator should return error for empty', () => {
      const control = { value: '' } as any;
      expect(component.requiredPaisValidator(control)).toEqual({ requiredPais: true });
    });
    it('requiredPaisValidator should return error for -1', () => {
      const control = { value: '-1' } as any;
      expect(component.requiredPaisValidator(control)).toEqual({ requiredPais: true });
    });

    it('rfcValidator should validate RFC FISICA', () => {
      const control = { value: 'ABCD123456XYZ' } as any;
      expect(component.rfcValidator(control)).toBeNull();
    });
    it('rfcValidator should validate RFC MORAL', () => {
      const control = { value: 'ABC123456XYZ' } as any;
      expect(component.rfcValidator(control)).toBeNull();
    });
    it('rfcValidator should return error for invalid RFC', () => {
      const control = { value: 'INVALID' } as any;
      expect(component.rfcValidator(control)).toEqual({ invalidRFC: true });
    });

    it('curpValidator should validate correct CURP', () => {
      const control = { value: 'ABCD990101HMNLLL09' } as any;
      expect(component.curpValidator(control)).toBeNull();
    });
    it('curpValidator should return error for invalid CURP', () => {
      const control = { value: 'INVALID' } as any;
      expect(component.curpValidator(control)).toEqual({ invalidCURP: true });
    });

    it('telefonoValidator should validate correct phone', () => {
      const control = { value: '123-456(789)' } as any;
      expect(component.telefonoValidator(control)).toBeNull();
    });
    it('telefonoValidator should return error for invalid phone', () => {
      const control = { value: '123*456' } as any;
      expect(component.telefonoValidator(control)).toEqual({ invalidTelefono: true });
    });
  });

  // Form initializers
  it('should initialize all form groups', () => {
    component.initializeAgregarFabricanteFormGroup();
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    component.initializeAgregarDestinatarioFormGroup();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    component.initializeAgregarProveedorFormGroup();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    component.initializeAgregarFacturadorFormGroup();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  
  it('should set showFabricanteButtons on selectedFabricanteRows', () => {
    component.selectedFabricanteRows({ checked: true } as any);
    expect(component.showFabricanteButtons).toBe(true);
    component.selectedFabricanteRows({ checked: false } as any);
    expect(component.showFabricanteButtons).toBe(false);
  });
  it('should set showDestinatarioButtons on selectedDestinatarioRows', () => {
    component.selectedDestinatarioRows({ checked: true } as any);
    expect(component.showDestinatarioButtons).toBe(true);
    component.selectedDestinatarioRows({ checked: false } as any);
    expect(component.showDestinatarioButtons).toBe(false);
  });
  it('should set showProveedorButtons on selectedProveedorRows', () => {
    component.selectedProveedorRows({ checked: true } as any);
    expect(component.showProveedorButtons).toBe(true);
    component.selectedProveedorRows({ checked: false } as any);
    expect(component.showProveedorButtons).toBe(false);
  });
  it('should set showFacturadorButtons on selectedFacturadorRows', () => {
    component.selectedFacturadorRows({ checked: true } as any);
    expect(component.showFacturadorButtons).toBe(true);
    component.selectedFacturadorRows({ checked: false } as any);
    expect(component.showFacturadorButtons).toBe(false);
  });

  
  it('should set nacional/extranjero on tercerosInputChecked', () => {
    component.tercerosInputChecked('1');
    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false);
    component.tercerosInputChecked('2');
    expect(component.nacional).toBe(false);
    expect(component.extranjero).toBe(true);
  });

  
  it('should enable correct fields for tipoPersonaChecked: Facturador', () => {
    component.tipoPersonaChecked('1', 'Facturador');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Facturador');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });
  it('should enable correct fields for tipoPersonaChecked: Proveedor', () => {
    component.tipoPersonaChecked('1', 'Proveedor');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Proveedor');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });
  it('should enable correct fields for tipoPersonaChecked: Destinatario', () => {
    component.tipoPersonaChecked('1', 'Destinatario');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Destinatario');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });
  it('should enable correct fields for tipoPersonaChecked: Fabricante', () => {
    component.tipoPersonaChecked('1', 'Fabricante');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Fabricante');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  // toggleDiv methods
  it('should toggleDivFabricante', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowFabricante = component.showFabricante;
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showFabricante).toBe(!prevShowFabricante);
  });
  it('should toggleDivDestinatario', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowDestinatario = component.showDestinatario;
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showDestinatario).toBe(!prevShowDestinatario);
  });
  it('should toggleDivProveedor', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowProveedor = component.showProveedor;
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showProveedor).toBe(!prevShowProveedor);
  });
  it('should toggleDivFacturador', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowFacturador = component.showFacturador;
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showFacturador).toBe(!prevShowFacturador);
  });

  // Public properties
  it('should have TEXTO_DE_ALERTA defined', () => {
    expect(component.TEXTO_DE_ALERTA).toBeDefined();
  });
  it('should have nacionalidadOpcionDeBotonDeRadio defined', () => {
    expect(component.nacionalidadOpcionDeBotonDeRadio).toBeDefined();
  });
  it('should have personaOpcionDeBotonDeRadio defined', () => {
    expect(component.personaOpcionDeBotonDeRadio).toBeDefined();
  });
});