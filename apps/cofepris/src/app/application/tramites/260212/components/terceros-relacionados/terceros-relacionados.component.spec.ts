// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
// import { TercerosService } from '../../services/terceros.service';
// import { Tramite260212Store } from '../../../../estados/tramites/tramite260212.store';
// import { of } from 'rxjs';

// describe('TercerosRelacionadosComponent', () => {
//   let component: TercerosRelacionadosComponent;
//   let fixture: ComponentFixture<TercerosRelacionadosComponent>;
//   let tercerosMockService: any;

//   beforeEach(async () => {

//     tercerosMockService = {
//       getData: jest.fn().mockReturnValue(
//         of([
//           { id: 'Banco1', descripcion: 'Banco1' },
//           { id: 'Banco2', descripcion: 'Banco2' },
//           { id: 'Banco3', descripcion: 'Banco3' },
//         ])
//       ),
//     };

//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         TercerosRelacionadosComponent,
//       ],
//       providers: [FormBuilder,Tramite260212Store, { provide: TercerosService, useValue: tercerosMockService }],
//     }).compileComponents();


//     fixture = TestBed.createComponent(TercerosRelacionadosComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//     beforeEach(() => {
//       fixture = TestBed.createComponent(TercerosRelacionadosComponent);
//       component = fixture.componentInstance;
//       fixture.detectChanges();
//     });

    
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getData on init', () => {
//     expect(tercerosMockService.getData).toHaveBeenCalled();
//   });

//   it('should initialize all form groups on init', () => {
//     component.ngOnInit();
//     expect(component.agregarFabricanteFormGroup).toBeDefined();
//     expect(component.agregarDestinatarioFormGroup).toBeDefined();
//     expect(component.agregarProveedorFormGroup).toBeDefined();
//     expect(component.agregarFacturadorFormGroup).toBeDefined();
//   });

//   it('should call initializeAgregarFabricanteFormGroup on init', () => {
//     // Spy on the method
//     const initializeSpy = jest.spyOn(component, 'initializeAgregarFabricanteFormGroup');
  
//     // Call ngOnInit
//     component.ngOnInit();
  
//     // Verify that the method was called
//     expect(initializeSpy).toHaveBeenCalled();
//   });

//   it('should call initializeAgregarDestinatarioFormGroup on init', () => {
//     // Spy on the method
//     const initializeSpy = jest.spyOn(component, 'initializeAgregarDestinatarioFormGroup');
  
//     // Call ngOnInit
//     component.ngOnInit();
  
//     // Verify that the method was called
//     expect(initializeSpy).toHaveBeenCalled();
//   });

//   it('should call initializeAgregarProveedorFormGroup on init', () => {
//     // Spy on the method
//     const initializeSpy = jest.spyOn(component, 'initializeAgregarProveedorFormGroup');
  
//     // Call ngOnInit
//     component.ngOnInit();
  
//     // Verify that the method was called
//     expect(initializeSpy).toHaveBeenCalled();
//   });

//   it('should call initializeAgregarFacturadorFormGroup on init', () => {
//     // Spy on the method
//     const initializeSpy = jest.spyOn(component, 'initializeAgregarFacturadorFormGroup');
  
//     // Call ngOnInit
//     component.ngOnInit();
  
//     // Verify that the method was called
//     expect(initializeSpy).toHaveBeenCalled();
//   });

//   // fabricante
//   it('should initialize agregarFabricanteFormGroup correctly', () => {
//     component.initializeAgregarFabricanteFormGroup();

//     const formGroup = component.agregarFabricanteFormGroup;
//     expect(formGroup).toBeTruthy();
//     expect(formGroup.get('rfc')?.disabled).toBeTruthy();
//     expect(formGroup.get('curp')?.disabled).toBeTruthy();
//     expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
//     expect(formGroup.get('tercerosNacionalidad')?.value).toBe('');
//     expect(formGroup.get('pais')?.validator).toBeDefined();
//     expect(formGroup.get('calle')?.validator).toBeDefined();
//     expect(formGroup.get('numeroExterior')?.validator).toBeDefined();
//   });

//   it('should enable specific fields in agregarFabricanteFormGroup when tipoPersona value changes', () => {
//     component.initializeAgregarFabricanteFormGroup();

//     const formGroup = component.agregarFabricanteFormGroup;
//     formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
//     fixture.detectChanges();

//     expect(formGroup.get('rfc')?.enabled).toBeTruthy();
//     expect(formGroup.get('curp')?.enabled).toBeTruthy();
//     expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
//     expect(formGroup.get('calle')?.enabled).toBeTruthy();
//     expect(formGroup.get('numeroExterior')?.enabled).toBeTruthy();
//   });

//   it('should toggle showTableDiv and showFabricante', () => {
//     component.showTableDiv = true;
//     component.showFabricante = true;

//     component.toggleDivFabricante();

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showFabricante).toBe(false);
//   });

//   it('should toggle showTableDiv and showFabricante again', () => {
//     component.showTableDiv = false;
//     component.showFabricante = false;

//     component.toggleDivFabricante();

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showFabricante).toBe(true);
//   });

//   it('should reset fisica and moral to false', () => {
//     component.fisica = true;
//     component.moral = true;

//     component.toggleDivFabricante();

//     expect(component.fisica).toBe(false);
//     expect(component.moral).toBe(false);
//   });

//   it('should toggle showTableDiv and showFabricante from true to false', () => {
//     component.showTableDiv = true;
//     component.showFabricante = true;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showFabricante = !component.showFabricante;

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showFabricante).toBe(false);
//   });

//   it('should toggle showTableDiv and showFabricante from false to true', () => {
//     component.showTableDiv = false;
//     component.showFabricante = false;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showFabricante = !component.showFabricante;

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showFabricante).toBe(true);
//   });

//   // destinatario
//   it('should initialize agregarDestinatarioFormGroup correctly', () => {
//     component.initializeAgregarDestinatarioFormGroup();

//     const formGroup = component.agregarDestinatarioFormGroup;
//     expect(formGroup).toBeTruthy();
//     expect(formGroup.get('rfc')?.disabled).toBeTruthy();
//     expect(formGroup.get('curp')?.disabled).toBeTruthy();
//     expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
//     expect(formGroup.get('tipoPersona')?.value).toBe('');
//     expect(formGroup.get('localidad')?.value).toBe('');
//     expect(formGroup.get('calle')?.enabled).toBeTruthy();
//   });

//   it('should enable specific fields in agregarDestinatarioFormGroup when tipoPersona value changes', () => {
//     component.initializeAgregarDestinatarioFormGroup();

//     const formGroup = component.agregarDestinatarioFormGroup;
//     formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
//     fixture.detectChanges();

//     expect(formGroup.get('rfc')?.enabled).toBeTruthy();
//     expect(formGroup.get('curp')?.enabled).toBeTruthy();
//     expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
//     expect(formGroup.get('calle')?.enabled).toBeTruthy();
//     expect(formGroup.get('numeroExterior')?.enabled).toBeTruthy();
//   });

//   it('should toggle showTableDiv and showDestinatario', () => {
//     component.showTableDiv = true;
//     component.showDestinatario = true;

//     component.toggleDivDestinatario();

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showDestinatario).toBe(false);
//   });

//   it('should toggle showTableDiv and showDestinatario again', () => {
//     component.showTableDiv = false;
//     component.showDestinatario = false;

//     component.toggleDivDestinatario();

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showDestinatario).toBe(true);
//   });

//   it('should reset fisica and moral to false', () => {
//     component.fisica = true;
//     component.moral = true;

//     component.toggleDivDestinatario();

//     expect(component.fisica).toBe(false);
//     expect(component.moral).toBe(false);
//   });

//   it('should toggle showTableDiv and showDestinatario from true to false', () => {
//     component.showTableDiv = true;
//     component.showDestinatario = true;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showDestinatario = !component.showDestinatario;

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showDestinatario).toBe(false);
//   });

//   it('should toggle showTableDiv and showDestinatario from false to true', () => {
//     component.showTableDiv = false;
//     component.showDestinatario = false;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showDestinatario = !component.showDestinatario;

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showDestinatario).toBe(true);
//   });

//   // proveedor
//   it('should initialize agregarProveedorFormGroup correctly', () => {
//     component.initializeAgregarProveedorFormGroup();

//     const formGroup = component.agregarProveedorFormGroup;
//     expect(formGroup).toBeTruthy();
//     expect(formGroup.get('nombre')?.disabled).toBeTruthy();
//     expect(formGroup.get('segundoApellido')?.disabled).toBeTruthy();
//     expect(formGroup.get('primerApellido')?.value).toBe('');
//     expect(formGroup.get('denominacionRazonSocial')?.disabled).toBeTruthy();
//     expect(formGroup.get('pais')?.validator).toBeDefined();
//     expect(formGroup.get('telefono')?.value).toBe('');
//   });

//   it('should enable specific fields in agregarProveedorFormGroup when tipoPersona value changes', () => {
//     component.initializeAgregarProveedorFormGroup();

//     const formGroup = component.agregarProveedorFormGroup;
//     formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
//     fixture.detectChanges();

//     expect(formGroup.get('nombre')?.enabled).toBeTruthy();
//     expect(formGroup.get('segundoApellido')?.enabled).toBeTruthy();
//     expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
//     expect(formGroup.get('calle')?.enabled).toBeTruthy();
//   });

//   it('should toggle showTableDiv and showProveedor', () => {
//     component.showTableDiv = true;
//     component.showProveedor = true;

//     component.toggleDivProveedor();

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showProveedor).toBe(false);
//   });

//   it('should toggle showTableDiv and showProveedor again', () => {
//     component.showTableDiv = false;
//     component.showProveedor = false;

//     component.toggleDivProveedor();

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showProveedor).toBe(true);
//   });

//   it('should reset fisica and moral to false', () => {
//     component.fisica = true;
//     component.moral = true;

//     component.toggleDivProveedor();

//     expect(component.fisica).toBe(false);
//     expect(component.moral).toBe(false);
//   });

//   it('should toggle showTableDiv and showProveedor from true to false', () => {
//     component.showTableDiv = true;
//     component.showProveedor = true;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showProveedor = !component.showProveedor;

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showProveedor).toBe(false);
//   });

//   it('should toggle showTableDiv and showProveedor from false to true', () => {
//     component.showTableDiv = false;
//     component.showProveedor = false;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showProveedor = !component.showProveedor;

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showProveedor).toBe(true);
//   });

//   // Facturador
//   it('should initialize agregarFacturadorFormGroup correctly', () => {
//     component.initializeAgregarFacturadorFormGroup();

//     const formGroup = component.agregarFacturadorFormGroup;
//     expect(formGroup).toBeDefined();
//     expect(formGroup.get('tipoPersona')!.value).toBe('');
//     expect(formGroup.get('nombre')!.value).toBe('');
//     expect(formGroup.get('primerApellido')!.value).toBe('');
//     expect(formGroup.get('segundoApellido')!.value).toBe('');
//     expect(formGroup.get('denominacionRazonSocial')!.value).toBe('');
//     expect(formGroup.get('pais')!.value).toBe('');
//     expect(formGroup.get('estado')!.value).toBe('');
//     expect(formGroup.get('codigoPostaloEquivalente')!.value).toBe('');
//     expect(formGroup.get('coloniaoEquivalente')!.value).toBe('');
//     expect(formGroup.get('calle')!.value).toBe('');
//     expect(formGroup.get('numeroExterior')!.value).toBe('');
//     expect(formGroup.get('numeroInterior')!.value).toBe('');
//     expect(formGroup.get('lada')!.value).toBe('');
//     expect(formGroup.get('telefono')!.value).toBe('');
//     expect(formGroup.get('correoElectronico')!.value).toBe('');
//   });

//   it('should enable specific fields in agregarFacturadorFormGroup when tipoPersona value changes', () => {
//     component.initializeAgregarFacturadorFormGroup();

//     const formGroup = component.agregarFacturadorFormGroup;
//     formGroup.get('tipoPersona')?.setValue('someValue'); // Simulate a value change
//     fixture.detectChanges();

//     expect(formGroup.get('nombre')?.enabled).toBeTruthy();
//     expect(formGroup.get('segundoApellido')?.enabled).toBeTruthy();
//     expect(formGroup.get('denominacionRazonSocial')?.enabled).toBeTruthy();
//     expect(formGroup.get('telefono')?.enabled).toBeTruthy();
//     expect(formGroup.get('correoElectronico')?.enabled).toBeTruthy();
    
//   });

//   it('should toggle showTableDiv and showFacturador', () => {
//     component.showTableDiv = true;
//     component.showFacturador = true;

//     component.toggleDivFacturador();

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showFacturador).toBe(false);
//   });

//   it('should toggle showTableDiv and showFacturador again', () => {
//     component.showTableDiv = false;
//     component.showFacturador = false;

//     component.toggleDivFacturador();

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showFacturador).toBe(true);
//   });

//   it('should reset fisica and moral to false', () => {
//     component.fisica = true;
//     component.moral = true;

//     component.toggleDivFacturador();

//     expect(component.fisica).toBe(false);
//     expect(component.moral).toBe(false);
//   });

//   it('should toggle showTableDiv and showFacturador from true to false', () => {
//     component.showTableDiv = true;
//     component.showFacturador = true;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showFacturador = !component.showFacturador;

//     expect(component.showTableDiv).toBe(false);
//     expect(component.showFacturador).toBe(false);
//   });

//   it('should toggle showTableDiv and showFacturador from false to true', () => {
//     component.showTableDiv = false;
//     component.showFacturador = false;

//     // Simulate the toggle logic
//     component.showTableDiv = !component.showTableDiv;
//     component.showFacturador = !component.showFacturador;

//     expect(component.showTableDiv).toBe(true);
//     expect(component.showFacturador).toBe(true);
//   });

//   it('should toggle showTableDiv and showFacturador', () => {
//     component.showTableDiv = true;
//     component.showFacturador = false;
  
//     component.submitFacturadorForm();
  
//     expect(component.showTableDiv).toBe(false);
//     expect(component.showFacturador).toBe(true);
//   });

//   //fisica, moral, nacional and extranjero
//   it('should set fisica to true and moral to false when checkbox is "fisica"', () => {
//     component.tipoPersonaChecked('fisica','1');
//     expect(component.fisica).toBe(true);
//     expect(component.moral).toBe(false);
//   });

//   it('should set fisica to false and moral to true when checkbox is not "fisica"', () => {
//     component.tipoPersonaChecked('moral','0');
//     expect(component.fisica).toBe(false);
//     expect(component.moral).toBe(true);
//   });

//   it('should set fisica to false and moral to true for any other checkbox name', () => {
//     component.tipoPersonaChecked('other');
//     expect(component.fisica).toBe(false);
//     expect(component.moral).toBe(true);
//   });

//   it('should set nacional to true and extranjero to false when checkbox is "nacional"', () => {
//     component.tercerosInputChecked('nacional');
//     expect(component.nacional).toBe(true);
//     expect(component.extranjero).toBe(false);
//   });

//   it('should set nacional to false and extranjero to true when checkbox is not "nacional"', () => {
//     component.tercerosInputChecked('extranjero');
//     expect(component.nacional).toBe(false);
//     expect(component.extranjero).toBe(true);
//   });

//   it('should set nacional to false and extranjero to true for any other checkbox name', () => {
//     component.tercerosInputChecked('other');
//     expect(component.nacional).toBe(false);
//     expect(component.extranjero).toBe(true);
//   });
// });


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

  it('should submit Fabricante form and update store', () => {
    component.agregarFabricanteFormGroup.setValue(mockFormData);
    component.submitFabricanteForm();
    expect(tramite260212Store.setFabricante).toHaveBeenCalledWith(component.fabricanteRowData);
    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(false);
  });

  it('should submit Destinatario form and update store', () => {
    component.agregarDestinatarioFormGroup.setValue(mockFormData);
    component.submitDestinatarioForm();
    expect(tramite260212Store.setDestinatario).toHaveBeenCalledWith(component.destinatarioRowData);
    expect(component.showTableDiv).toBe(true);
    expect(component.showDestinatario).toBe(false);
  });

  it('should submit Proveedor form and update store', () => {
    component.agregarProveedorFormGroup.setValue(mockFormData);
    component.submitProveedorForm();
    expect(tramite260212Store.setProveedor).toHaveBeenCalledWith(component.proveedorRowData);
    expect(component.showTableDiv).toBe(true);
    expect(component.showProveedor).toBe(false);
  });

  it('should submit Facturador form and update store', () => {
    component.agregarFacturadorFormGroup.setValue(mockFormData);
    component.submitFacturadorForm();
    expect(tramite260212Store.setFacturador).toHaveBeenCalledWith(component.facturadorRowData);
    expect(component.showTableDiv).toBe(true);
    expect(component.showFacturador).toBe(false);
  });
});