import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosFabSeccionComponent } from './terceros-relacionados-fab-seccion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TercerosRelacionadosFebService } from '../../services/tereceros-relacionados-feb.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TramiteRelacionadaseStore } from '../../estados/stores/terceros-relacionados.stores';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

describe('TercerosRelacionadosFabSeccionComponent', () => {
  let component: TercerosRelacionadosFabSeccionComponent;
  let fixture: ComponentFixture<TercerosRelacionadosFabSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosFabSeccionComponent,
        HttpClientTestingModule, // Import HttpClientTestingModule to mock HTTP requests
      ],
      providers: [
        TercerosRelacionadosFebService, // Provide the service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosFabSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('TercerosRelacionadosFabSeccionComponent Additional Tests', () => {
  let component: TercerosRelacionadosFabSeccionComponent;
  let fixture: ComponentFixture<TercerosRelacionadosFabSeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,TercerosRelacionadosFabSeccionComponent],
      declarations: [],
      providers: [TercerosRelacionadosFebService],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosFabSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle showFabricante and showTableDiv when toggleDivFabricante is called', () => {
    component.showFabricante = false;
    component.showTableDiv = true;

    component.toggleDivFabricante();

    expect(component.showFabricante).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should toggle showDestinatario and showTableDiv when toggleDivDestinatario is called', () => {
    component.showDestinatario = false;
    component.showTableDiv = true;

    component.toggleDivDestinatario();

    expect(component.showDestinatario).toBe(true);
    expect(component.showTableDiv).toBe(false)
  });

  it('should toggle showProveedor and showTableDiv when toggleDivProveedor is called', () => {
    component.showProveedor = false;
    component.showTableDiv = true;

    component.toggleDivProveedor();

    expect(component.showProveedor).toBe(true);
    expect(component.showTableDiv).toBe(false)
  });

  it('should toggle showFacturador and showTableDiv when toggleDivFacturador is called', () => {
    component.showFacturador = false;
    component.showTableDiv = true;

    component.toggleDivFacturador();

    expect(component.showFacturador).toBe(true);
    expect(component.showTableDiv).toBe(false)
  });

  it('should enable fields for Fabricante when tipoPersonaChecked is called with Fabricante', () => {
    component.agregarFabricanteFormGroup = new FormGroup({
      rfc: new FormControl({ value: '', disabled: true }),
      curp: new FormControl({ value: '', disabled: true }),
      denominacionRazonSocial: new FormControl({ value: '', disabled: true }),
    });

    component.tipoPersonaChecked('1', 'Fabricante');

    expect(component.agregarFabricanteFormGroup.get('rfc')?.enabled).toBe(true);
    expect(component.agregarFabricanteFormGroup.get('curp')?.enabled).toBe(true);
    expect(component.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.enabled).toBe(true);
  });

  it('should set nacional to true and extranjero to false when tercerosInputChecked is called with 1', () => {
    component.tercerosInputChecked('1');

    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false)
  });

  it('should set extranjero to true and nacional to false when tercerosInputChecked is called with 2', () => {
    component.tercerosInputChecked('2');

    expect(component.extranjero).toBe(true);
    expect(component.nacional).toBe(false)
  });

  it('should validate RFC correctly using rfcValidator', () => {
    const validRFCFisica = TercerosRelacionadosFabSeccionComponent.rfcValidator({ value: 'ABCD123456XYZ' } as AbstractControl);
    const validRFCMoral = TercerosRelacionadosFabSeccionComponent.rfcValidator({ value: 'ABC123456XYZ' } as AbstractControl);
    const invalidRFC = TercerosRelacionadosFabSeccionComponent.rfcValidator({ value: 'INVALID123' } as AbstractControl);

    expect(validRFCFisica).toBeNull();
    expect(validRFCMoral).toBeNull();
    expect(invalidRFC).toEqual({ invalidRFC: true });
  });
  it('should validate requiredPaisValidator correctly', () => {
    const validPais = TercerosRelacionadosFabSeccionComponent.requiredPaisValidator({ value: 'MX' } as AbstractControl);
    const invalidPaisEmpty = TercerosRelacionadosFabSeccionComponent.requiredPaisValidator({ value: '' } as AbstractControl);
    const invalidPaisDefault = TercerosRelacionadosFabSeccionComponent.requiredPaisValidator({ value: '-1' } as AbstractControl);

    expect(validPais).toBeNull();
    expect(invalidPaisEmpty).toEqual({ requiredPais: true });
    expect(invalidPaisDefault).toEqual({ requiredPais: true });
  });
  
});
describe('TercerosRelacionadosFabSeccionComponent Integration & Logic', () => {
  let component: TercerosRelacionadosFabSeccionComponent;
  let fixture: ComponentFixture<TercerosRelacionadosFabSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosFabSeccionComponent,
      
      ],
      providers: [
        TercerosRelacionadosFebService,
        { provide: TramiteRelacionadaseStore, useValue: { setFabricante: jest.fn(), setDestinatario: jest.fn(), setProveedor: jest.fn(), setFacturador: jest.fn() } },
        { provide: ConsultaioQuery, useValue: { selectConsultaioState$: { pipe: () => ({ subscribe: () => {} }) } } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosFabSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize agregarFabricanteFormGroup with disabled fields', () => {
    component.initializeAgregarFabricanteFormGroup();
    expect(component.agregarFabricanteFormGroup.get('rfc')?.disabled).toBe(true);
    expect(component.agregarFabricanteFormGroup.get('curp')?.disabled).toBe(true);
    expect(component.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.disabled).toBe(true);
  });

  it('should initialize agregarDestinatarioFormGroup with disabled fields', () => {
    component.initializeAgregarDestinatarioFormGroup();
    expect(component.agregarDestinatarioFormGroup.get('rfc')?.disabled).toBe(true);
    expect(component.agregarDestinatarioFormGroup.get('curp')?.disabled).toBe(true);
    expect(component.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.disabled).toBe(true);
  });

  it('should initialize agregarProveedorFormGroup with disabled fields', () => {
    component.initializeAgregarProveedorFormGroup();
    expect(component.agregarProveedorFormGroup.get('nombre')?.disabled).toBe(true);
    expect(component.agregarProveedorFormGroup.get('primerApellido')?.disabled).toBe(true);
    expect(component.agregarProveedorFormGroup.get('segundoApellido')?.disabled).toBe(true);
    expect(component.agregarProveedorFormGroup.get('denominacionRazonSocial')?.disabled).toBe(true);
  });

  it('should initialize agregarFacturadorFormGroup with disabled fields', () => {
    component.initializeAgregarFacturadorFormGroup();
    expect(component.agregarFacturadorFormGroup.get('nombre')?.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('primerApellido')?.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('segundoApellido')?.disabled).toBe(true);
    expect(component.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.disabled).toBe(true);
  });

  it('should add a new fabricante row and reset form on submitFabricanteForm', () => {
    component.agregarFabricanteFormGroup = new FormGroup({
      rfc: new FormControl('RFC123'),
      curp: new FormControl('CURP123'),
      denominacionRazonSocial: new FormControl('Empresa SA'),
      // ... add all required controls
    } as any);
    component.fabricanteRowData = [];
    jest.spyOn(component, 'toggleDivFabricante');
    jest.spyOn(component.agregarFabricanteFormGroup, 'reset');
    component.submitFabricanteForm();
    expect(component.fabricanteRowData.length).toBe(1);
    expect(component.toggleDivFabricante).toHaveBeenCalled();
    expect(component.agregarFabricanteFormGroup.reset).toHaveBeenCalled();
  });

  it('should add a new destinatario row and reset form on submitDestinatarioForm', () => {
    component.agregarDestinatarioFormGroup = new FormGroup({
      rfc: new FormControl('RFC123'),
      curp: new FormControl('CURP123'),
      denominacionRazonSocial: new FormControl('Empresa SA'),
      // ... add all required controls
    } as any);
    component.destinatarioRowData = [];
    jest.spyOn(component, 'toggleDivDestinatario');
    jest.spyOn(component.agregarDestinatarioFormGroup, 'reset');
    component.submitDestinatarioForm();
    expect(component.destinatarioRowData.length).toBe(1);
    expect(component.toggleDivDestinatario).toHaveBeenCalled();
    expect(component.agregarDestinatarioFormGroup.reset).toHaveBeenCalled();
  });

  it('should add a new proveedor row and reset form on submitProveedorForm', () => {
    component.agregarProveedorFormGroup = new FormGroup({
      valid: true,
      value: { rfc: 'RFC123', nombre: 'Proveedor', primerApellido: 'Apellido', denominacionRazonSocial: 'Empresa SA' }
    } as any);
    component.proveedorRowData = [];
    jest.spyOn(component, 'toggleDivProveedor');
    jest.spyOn(component.agregarProveedorFormGroup, 'reset');
    component.submitProveedorForm();
    expect(component.proveedorRowData.length).toBe(1);
    expect(component.toggleDivProveedor).toHaveBeenCalled();
    expect(component.agregarProveedorFormGroup.reset).toHaveBeenCalled();
  });

  it('should add a new facturador row and reset form on submitFacturadorForm', () => {
    component.agregarFacturadorFormGroup = new FormGroup({
      rfc: new FormControl('RFC123'),
      nombre: new FormControl('Facturador'),
      primerApellido: new FormControl('Apellido'),
      denominacionRazonSocial: new FormControl('Empresa SA')
    } as any);
    component.facturadorRowData = [];
    jest.spyOn(component, 'toggleDivFacturador');
    jest.spyOn(component.agregarFacturadorFormGroup, 'reset');
    component.submitFacturadorForm();
    expect(component.facturadorRowData.length).toBe(1);
    expect(component.toggleDivFacturador).toHaveBeenCalled();
    expect(component.agregarFacturadorFormGroup.reset).toHaveBeenCalled();
  });

  it('should update selectedFabricanteRows on onFabricanteSeleccionados', () => {
    const rows = [{ rfc: 'RFC1' }, { rfc: 'RFC2' }] as any;
    component.onFabricanteSeleccionados(rows);
    expect(component.selectedFabricanteRows).toBe(rows);
  });

  it('should filter fabricanteRowData on eliminarSeleccionadosFabricante', () => {
    const row1 = { rfc: 'RFC1' } as any;
    const row2 = { rfc: 'RFC2' } as any;
    component.fabricanteRowData = [row1, row2];
    component.selectedFabricanteRows = [row1];
    component.eliminarSeleccionadosFabricante();
    expect(component.fabricanteRowData).toEqual([row2]);
    expect(component.selectedFabricanteRows).toEqual([]);
  });

  it('should update selectedDestinatarioRows on onDestinatarioSeleccionados', () => {
    const rows = [{ rfc: 'RFC1' }, { rfc: 'RFC2' }] as any;
    component.onDestinatarioSeleccionados(rows);
    expect(component.selectedDestinatarioRows).toBe(rows);
  });

  it('should filter destinatarioRowData on eliminarSeleccionadosDestinatario', () => {
    const row1 = { rfc: 'RFC1' } as any;
    const row2 = { rfc: 'RFC2' } as any;
    component.destinatarioRowData = [row1, row2];
    component.selectedDestinatarioRows = [row1];
    component.eliminarSeleccionadosDestinatario();
    expect(component.destinatarioRowData).toEqual([row2]);
    expect(component.selectedDestinatarioRows).toEqual([]);
  });

  it('should update selectedProveedorRows on onProveedorSeleccionados', () => {
    const rows = [{ rfc: 'RFC1' }, { rfc: 'RFC2' }] as any;
    component.onProveedorSeleccionados(rows);
    expect(component.selectedProveedorRows).toBe(rows);
  });

  it('should filter proveedorRowData on eliminarSeleccionadosProveedor', () => {
    const row1 = { rfc: 'RFC1' } as any;
    const row2 = { rfc: 'RFC2' } as any;
    component.proveedorRowData = [row1, row2];
    component.selectedProveedorRows = [row1];
    component.eliminarSeleccionadosProveedor();
    expect(component.proveedorRowData).toEqual([row2]);
    expect(component.selectedProveedorRows).toEqual([]);
  });

  it('should update selectedFacturadorRows on onFacturadorSeleccionados', () => {
    const rows = [{ rfc: 'RFC1' }, { rfc: 'RFC2' }] as any;
    component.onFacturadorSeleccionados(rows);
    expect(component.selectedFacturadorRows).toBe(rows);
  });

  it('should filter facturadorRowData on eliminarSeleccionadosFacturador', () => {
    const row1 = { rfc: 'RFC1' } as any;
    const row2 = { rfc: 'RFC2' } as any;
    component.facturadorRowData = [row1, row2];
    component.selectedFacturadorRows = [row1];
    component.eliminarSeleccionadosFacturador();
    expect(component.facturadorRowData).toEqual([row2]);
    expect(component.selectedFacturadorRows).toEqual([]);
  });

  it('should clean up destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should validate requiredPaisValidator', () => {
    expect(TercerosRelacionadosFabSeccionComponent.requiredPaisValidator({ value: 'MX' } as AbstractControl)).toBeNull();
    expect(TercerosRelacionadosFabSeccionComponent.requiredPaisValidator({ value: '' } as AbstractControl)).toEqual({ requiredPais: true });
    expect(TercerosRelacionadosFabSeccionComponent.requiredPaisValidator({ value: '-1' } as AbstractControl)).toEqual({ requiredPais: true });
  });

  it('should validate rfcValidator', () => {
    expect(TercerosRelacionadosFabSeccionComponent.rfcValidator({ value: 'ABCD123456XYZ' } as AbstractControl)).toBeNull();
    expect(TercerosRelacionadosFabSeccionComponent.rfcValidator({ value: 'ABC123456XYZ' } as AbstractControl)).toBeNull();
    expect(TercerosRelacionadosFabSeccionComponent.rfcValidator({ value: 'INVALID' } as AbstractControl)).toEqual({ invalidRFC: true });
  });
});
