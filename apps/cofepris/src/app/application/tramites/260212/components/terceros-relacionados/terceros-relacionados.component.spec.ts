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