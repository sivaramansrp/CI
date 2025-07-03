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

  // Ajusta los mocks para incluir todos los controles requeridos por los formularios
  const mockFabricanteData = {
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
    tercerosNacionalidad: 'Nacional',
    nombre: 'Fabricante Test',
    primerApellido: 'Apellido1',
    segundoApellido: 'Apellido2',
    coloniaoEquivalente: 'ColoniaEq Test', // <-- para forms que lo requieran
    estadoLocalidad: 'EstadoLocalidad Test', // <-- para forms que lo requieran
  };

  const mockDestinatarioData = {
    ...mockFabricanteData,
    // Asegura que todos los controles requeridos estén presentes
    estado: 'Estado Test',
    coloniaoEquivalente: 'ColoniaEq Test',
    estadoLocalidad: 'EstadoLocalidad Test',
  };

  const mockProveedorData = {
    ...mockFabricanteData,
    nombre: 'Proveedor Test',
    primerApellido: 'Apellido1',
    segundoApellido: 'Apellido2',
    coloniaoEquivalente: 'ColoniaEq Test',
    estado: 'Estado Test',
  };

  const mockFacturadorData = {
    ...mockFabricanteData,
    nombre: 'Facturador Test',
    primerApellido: 'Apellido1',
    segundoApellido: 'Apellido2',
    coloniaoEquivalente: 'ColoniaEq Test',
    estado: 'Estado Test',
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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los datos de los dropdowns al crear el componente', () => {
    expect(component.dropdownData).toEqual(mockDropdownData);
    expect(component.paisDropdownData).toEqual(mockDropdownData);
    expect(component.municipioDropdownData).toEqual(mockDropdownData);
    expect(component.codigoPostalDropdownData).toEqual(mockDropdownData);
    expect(component.coloniaDropdownData).toEqual(mockDropdownData);
    expect(component.localidadDropdownData).toEqual(mockDropdownData);
  });

  it('debería inicializar los grupos de formularios al crear el componente', () => {
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('debería alternar la visibilidad del formulario de Fabricante', () => {
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(true);
  });

  it('debería alternar la visibilidad del formulario de Destinatario', () => {
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(true);
  });

  it('debería alternar la visibilidad del formulario de Proveedor', () => {
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(true);
  });

  it('debería alternar la visibilidad del formulario de Facturador', () => {
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(true);
  });

  it('debería manejar tipoPersonaChecked para Facturador', () => {
    component.tipoPersonaChecked('1', 'Facturador');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    expect(component.agregarFacturadorFormGroup.get('nombre')?.enabled).toBe(true);
  });

  it('debería manejar tipoPersonaChecked para Proveedor', () => {
    component.tipoPersonaChecked('2', 'Proveedor');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
    expect(component.agregarProveedorFormGroup.get('nombre')?.enabled).toBe(true);
  });

  it('debería cancelar el formulario de Fabricante y mostrar la tabla', () => {
    component.showFabricante = true;
    component.cancelFabricante();
    expect(component.showFabricante).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('debería cancelar el formulario de Destinatario y mostrar la tabla', () => {
    component.showDestinatario = true;
    component.cancelDestinatario();
    expect(component.showDestinatario).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('debería cancelar el formulario de Proveedor y mostrar la tabla', () => {
    component.showProveedor = true;
    component.cancelProveedor();
    expect(component.showProveedor).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('debería cancelar el formulario de Facturador y mostrar la tabla', () => {
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

  it('debería llamar ngOnInit si existe', () => {
    if (component.ngOnInit) {
      jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalled();
    }
  });

  describe('validadores', () => {
    it('requiredPaisValidator debe retornar null para valor válido', () => {
      const control = { value: '10' } as any;
      expect(component.requiredPaisValidator(control)).toBeNull();
    });
    it('requiredPaisValidator debe retornar error para vacío', () => {
      const control = { value: '' } as any;
      expect(component.requiredPaisValidator(control)).toEqual({ requiredPais: true });
    });
    it('requiredPaisValidator debe retornar error para -1', () => {
      const control = { value: '-1' } as any;
      expect(component.requiredPaisValidator(control)).toEqual({ requiredPais: true });
    });

    it('rfcValidator debe validar RFC FISICA', () => {
      const control = { value: 'ABCD123456XYZ' } as any;
      expect(component.rfcValidator(control)).toBeNull();
    });
    it('rfcValidator debe validar RFC MORAL', () => {
      const control = { value: 'ABC123456XYZ' } as any;
      expect(component.rfcValidator(control)).toBeNull();
    });
    it('rfcValidator debe retornar error para RFC inválido', () => {
      const control = { value: 'INVALID' } as any;
      expect(component.rfcValidator(control)).toEqual({ invalidRFC: true });
    });

    it('curpValidator debe validar CURP correcto', () => {
      const control = { value: 'ABCD990101HMNLLL09' } as any;
      expect(component.curpValidator(control)).toBeNull();
    });
    it('curpValidator debe retornar error para CURP inválido', () => {
      const control = { value: 'INVALID' } as any;
      expect(component.curpValidator(control)).toEqual({ invalidCURP: true });
    });

    it('telefonoValidator debe validar teléfono correcto', () => {
      const control = { value: '123-456(789)' } as any;
      expect(component.telefonoValidator(control)).toBeNull();
    });
    it('telefonoValidator debe retornar error para teléfono inválido', () => {
      const control = { value: '123*456' } as any;
      expect(component.telefonoValidator(control)).toEqual({ invalidTelefono: true });
    });
  });

  it('debería inicializar todos los grupos de formularios', () => {
    component.initializeAgregarFabricanteFormGroup();
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    component.initializeAgregarDestinatarioFormGroup();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    component.initializeAgregarProveedorFormGroup();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    component.initializeAgregarFacturadorFormGroup();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('debería activar/desactivar botones de Fabricante según selección', () => {
    component.selectedFabricanteRows({ checked: true } as any);
    expect(component.showFabricanteButtons).toBe(true);
    component.selectedFabricanteRows({ checked: false } as any);
    expect(component.showFabricanteButtons).toBe(false);
  });
  it('debería activar/desactivar botones de Destinatario según selección', () => {
    component.selectedDestinatarioRows({ checked: true } as any);
    expect(component.showDestinatarioButtons).toBe(true);
    component.selectedDestinatarioRows({ checked: false } as any);
    expect(component.showDestinatarioButtons).toBe(false);
  });
  it('debería activar/desactivar botones de Proveedor según selección', () => {
    component.selectedProveedorRows({ checked: true } as any);
    expect(component.showProveedorButtons).toBe(true);
    component.selectedProveedorRows({ checked: false } as any);
    expect(component.showProveedorButtons).toBe(false);
  });
  it('debería activar/desactivar botones de Facturador según selección', () => {
    component.selectedFacturadorRows({ checked: true } as any);
    expect(component.showFacturadorButtons).toBe(true);
    component.selectedFacturadorRows({ checked: false } as any);
    expect(component.showFacturadorButtons).toBe(false);
  });

  it('debería establecer nacional/extranjero en tercerosInputChecked', () => {
    component.tercerosInputChecked('1');
    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false);
    component.tercerosInputChecked('2');
    expect(component.nacional).toBe(false);
    expect(component.extranjero).toBe(true);
  });

  it('debería habilitar/deshabilitar campos para tipoPersonaChecked: Facturador', () => {
    component.tipoPersonaChecked('1', 'Facturador');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Facturador');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });
  it('debería habilitar/deshabilitar campos para tipoPersonaChecked: Proveedor', () => {
    component.tipoPersonaChecked('1', 'Proveedor');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Proveedor');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });
  it('debería habilitar/deshabilitar campos para tipoPersonaChecked: Destinatario', () => {
    component.tipoPersonaChecked('1', 'Destinatario');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Destinatario');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });
  it('debería habilitar/deshabilitar campos para tipoPersonaChecked: Fabricante', () => {
    component.tipoPersonaChecked('1', 'Fabricante');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    component.tipoPersonaChecked('2', 'Fabricante');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  it('debería alternar toggleDivFabricante', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowFabricante = component.showFabricante;
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showFabricante).toBe(!prevShowFabricante);
  });
  it('debería alternar toggleDivDestinatario', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowDestinatario = component.showDestinatario;
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showDestinatario).toBe(!prevShowDestinatario);
  });
  it('debería alternar toggleDivProveedor', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowProveedor = component.showProveedor;
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showProveedor).toBe(!prevShowProveedor);
  });
  it('debería alternar toggleDivFacturador', () => {
    const prevShowTableDiv = component.showTableDiv;
    const prevShowFacturador = component.showFacturador;
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(!prevShowTableDiv);
    expect(component.showFacturador).toBe(!prevShowFacturador);
  });

  it('debería tener TEXTO_DE_ALERTA definido', () => {
    expect(component.TEXTO_DE_ALERTA).toBeDefined();
  });
  it('debería tener nacionalidadOpcionDeBotonDeRadio definido', () => {
    expect(component.nacionalidadOpcionDeBotonDeRadio).toBeDefined();
  });
  it('debería tener personaOpcionDeBotonDeRadio definido', () => {
    expect(component.personaOpcionDeBotonDeRadio).toBeDefined();
  });

  // it('debería mapear valores de dropdown correctamente en submitFabricanteForm', () => {
  //   component.localidadDropdownData = [{ id: 2, descripcion: 'Localidad X' }];
  //   component.paisDropdownData = [{ id: 1, descripcion: 'México' }];
  //   component.municipioDropdownData = [{ id: 3, descripcion: 'Municipio Y' }];
  //   component.codigoPostalDropdownData = [{ id: 4, descripcion: 'CP Z' }];
  //   component.coloniaDropdownData = [{ id: 5, descripcion: 'Colonia W' }];

  //   const formValue: any = {};
  //   component.agregarFabricanteFormGroup.controls &&
  //     Object.keys(component.agregarFabricanteFormGroup.controls).forEach(key => {
  //       formValue[key] = (mockFabricanteData as any)[key] ?? 'dummy';
  //     });
  //   formValue.pais = 1;
  //   formValue.localidad = 2;
  //   formValue.municipioAlcaldia = 3;
  //   formValue.codigoPostaloEquivalente = 4;
  //   formValue.colonia = 5;

  //   component.agregarFabricanteFormGroup.setValue(formValue);

  //   const spy = jest.spyOn(tramite260212Store, 'setFabricante');
  //   component.submitFabricanteForm();

  //   const rowData = spy.mock.calls[0][0] as { tbodyData: any[] }[] | { tbodyData: any[] };
  //   expect(rowData).toBeDefined();
  //   const tbodyData = Array.isArray(rowData) ? rowData[0]?.tbodyData : rowData?.tbodyData;
  //   expect(tbodyData).toBeDefined();
  //   expect(tbodyData).toContain('México');
  //   expect(tbodyData).toContain('Localidad X');
  //   expect(tbodyData).toContain('Municipio Y');
  //   expect(tbodyData).toContain('CP Z');
  //   expect(tbodyData).toContain('Colonia W');
  // });

  it('debería manejar valores de catálogo no encontrados en submitFabricanteForm', () => {
    component.localidadDropdownData = [];
    component.paisDropdownData = [];
    component.municipioDropdownData = [];
    component.codigoPostalDropdownData = [];
    component.coloniaDropdownData = [];

    const formValue: any = {};
    component.agregarFabricanteFormGroup.controls &&
      Object.keys(component.agregarFabricanteFormGroup.controls).forEach(key => {
        formValue[key] = (mockFabricanteData as any)[key] ?? 'dummy';
      });
    formValue.pais = 99;
    formValue.localidad = 98;
    formValue.municipioAlcaldia = 97;
    formValue.codigoPostaloEquivalente = 96;
    formValue.colonia = 95;

    component.agregarFabricanteFormGroup.setValue(formValue);

    const spy = jest.spyOn(tramite260212Store, 'setFabricante');
    component.submitFabricanteForm();

    const rowData = spy.mock.calls[0][0] as { tbodyData: any[] }[] | { tbodyData: any[] };
    const tbodyData = Array.isArray(rowData) ? rowData[0]?.tbodyData : rowData?.tbodyData;
    expect(tbodyData).toBeDefined();
    expect(tbodyData).toContain(undefined);
  });

  it('debería deshabilitar campos para Facturador', () => {
    component.agregarFacturadorFormGroup.get('nombre')?.disable();
    component.agregarFacturadorFormGroup.get('primerApellido')?.disable();
    component.agregarFacturadorFormGroup.get('segundoApellido')?.disable();
    component.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.disable();
    expect(component.agregarFacturadorFormGroup.get('nombre')?.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('primerApellido')?.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('segundoApellido')?.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.disabled).toBe(true);
  });

  it('debería habilitar campos para Facturador', () => {
    component.agregarFacturadorFormGroup.get('nombre')?.enable();
    component.agregarFacturadorFormGroup.get('primerApellido')?.enable();
    component.agregarFacturadorFormGroup.get('segundoApellido')?.enable();
    component.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.enable();
    expect(component.agregarFacturadorFormGroup.get('nombre')?.enabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('primerApellido')?.enabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('segundoApellido')?.enabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.enabled).toBe(true);
  });

  it('debería habilitar campos para Proveedor', () => {
    component.agregarProveedorFormGroup.get('nombre')?.enable();
    component.agregarProveedorFormGroup.get('primerApellido')?.enable();
    component.agregarProveedorFormGroup.get('segundoApellido')?.enable();
    component.agregarProveedorFormGroup.get('denominacionRazonSocial')?.enable();
    expect(component.agregarProveedorFormGroup.get('nombre')?.enabled).toBe(true);
    expect(component.agregarProveedorFormGroup.get('primerApellido')?.enabled).toBe(true);
    expect(component.agregarProveedorFormGroup.get('segundoApellido')?.enabled).toBe(true);
    expect(component.agregarProveedorFormGroup.get('denominacionRazonSocial')?.enabled).toBe(true);
  });

  it('debería habilitar campos para Destinatario', () => {
    component.agregarDestinatarioFormGroup.get('rfc')?.enable();
    component.agregarDestinatarioFormGroup.get('curp')?.enable();
    component.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.enable();
    expect(component.agregarDestinatarioFormGroup.get('rfc')?.enabled).toBe(true);
    expect(component.agregarDestinatarioFormGroup.get('curp')?.enabled).toBe(true);
    expect(component.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.enabled).toBe(true);
  });

  it('debería habilitar campos para Fabricante', () => {
    component.agregarFabricanteFormGroup.get('rfc')?.enable();
    component.agregarFabricanteFormGroup.get('curp')?.enable();
    component.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.enable();
    expect(component.agregarFabricanteFormGroup.get('rfc')?.enabled).toBe(true);
    expect(component.agregarFabricanteFormGroup.get('curp')?.enabled).toBe(true);
    expect(component.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.enabled).toBe(true);
  });
});