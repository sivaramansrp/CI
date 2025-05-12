import { TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TercerosRelacionadoesComponent } from './terceros-relacionados.component';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { SanitarioService } from '../../services/sanitario.service';

describe('TercerosRelacionadoesComponent', () => {
  let component: TercerosRelacionadoesComponent;
  let sanitarioServiceMock: any;
  let sanitarioStoreMock: any;

  beforeEach(() => {
    sanitarioServiceMock = {
      getData: jest.fn().mockReturnValue(of([])),
    };

    sanitarioStoreMock = {
      setFabricante: jest.fn(),
      setDestinatario: jest.fn(),
      setProveedor: jest.fn(),
      setFacturador: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TercerosRelacionadoesComponent],
      declarations: [],
      providers: [
        { provide: SanitarioService, useValue: sanitarioServiceMock },
        { provide: Sanitario260906Store, useValue: sanitarioStoreMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TercerosRelacionadoesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and fetch dropdown data on ngOnInit', () => {
    jest.spyOn(component, 'initializeAgregarFabricanteFormGroup');
    jest.spyOn(component, 'initializeAgregarDestinatarioFormGroup');
    jest.spyOn(component, 'initializeAgregarProveedorFormGroup');
    jest.spyOn(component, 'initializeAgregarFacturadorFormGroup');

    component.ngOnInit();

    expect(sanitarioServiceMock.getData).toHaveBeenCalled();
    expect(component.dropdownData).toEqual([]);
    expect(component.initializeAgregarFabricanteFormGroup).toHaveBeenCalled();
    expect(component.initializeAgregarDestinatarioFormGroup).toHaveBeenCalled();
    expect(component.initializeAgregarProveedorFormGroup).toHaveBeenCalled();
    expect(component.initializeAgregarFacturadorFormGroup).toHaveBeenCalled();
  });

  it('should toggle visibility for Fabricante form', () => {
    component.showTableDiv = true;
    component.showFabricante = false;

    component.toggleDivFabricante();

    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(true);
  });

  it('should toggle visibility for Destinatario form', () => {
    component.showTableDiv = true;
    component.showDestinatario = false;

    component.toggleDivDestinatario();

    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(true);
  });

  it('should toggle visibility for Proveedor form', () => {
    component.showTableDiv = true;
    component.showProveedor = false;

    component.toggleDivProveedor();

    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(true);
  });

  it('should toggle visibility for Facturador form', () => {
    component.showTableDiv = true;
    component.showFacturador = false;

    component.toggleDivFacturador();

    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(true);
  });

  it('should validate RFC using rfcValidator', () => {
    const validRFCFisica = TercerosRelacionadoesComponent.rfcValidator({
      value: 'ABCD123456XYZ',
    } as AbstractControl);
    const validRFCMoral = TercerosRelacionadoesComponent.rfcValidator({
      value: 'ABC123456XYZ',
    } as AbstractControl);
    const invalidRFC = TercerosRelacionadoesComponent.rfcValidator({
      value: 'INVALID',
    } as AbstractControl);

    expect(validRFCFisica).toBeNull();
    expect(validRFCMoral).toBeNull();
    expect(invalidRFC).toEqual({ invalidRFC: true });
  });

  it('should validate CURP using curpValidator', () => {
    const validCURP = TercerosRelacionadoesComponent.curpValidator({
      value: 'ABCD123456HDFLRS01',
    } as AbstractControl);
    const invalidCURP = TercerosRelacionadoesComponent.curpValidator({
      value: 'INVALID',
    } as AbstractControl);

    expect(validCURP).toBeNull();
    expect(invalidCURP).toEqual({ invalidCURP: true });
  });

});