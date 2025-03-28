import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-fabricante.component';
import { TercerosFabricanteStore } from '../../estados/stores/terceros-fabricante.store';
import { DatosDomicilioLegalService } from '../../services/datos-domicilio-legal.service';
import { of, Subject } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let mockStore: jest.Mocked<TercerosFabricanteStore>;
  let mockService: jest.Mocked<DatosDomicilioLegalService>;

  beforeEach(async () => {
    mockStore = {
      setFabricante: jest.fn(),
      setDestinatario: jest.fn(),
      setProveedor: jest.fn(),
      setFacturador: jest.fn(),
    } as unknown as jest.Mocked<TercerosFabricanteStore>;

    mockService = {
      getData: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Test Data' }])),
    } as unknown as jest.Mocked<DatosDomicilioLegalService>;

    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TercerosFabricanteStore, useValue: mockStore },
        { provide: DatosDomicilioLegalService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dropdown data on ngOnInit', () => {
    component.ngOnInit();
    expect(mockService.getData).toHaveBeenCalled();
    expect(component.dropdownData).toEqual([{ id: 1, descripcion: 'Test Data' }]);
  });

  it('should initialize all form groups on ngOnInit', () => {
    component.ngOnInit();
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarDestinatarioFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
    expect(component.agregarFacturadorFormGroup).toBeDefined();
  });

  it('should toggle visibility of fabricante form', () => {
    component.toggleDivFabricante();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFabricante).toBe(true);
  });

  it('should toggle visibility of destinatario form', () => {
    component.toggleDivDestinatario();
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatario).toBe(true);
  });

  it('should toggle visibility of proveedor form', () => {
    component.toggleDivProveedor();
    expect(component.showTableDiv).toBe(false);
    expect(component.showProveedor).toBe(true);
  });

  it('should toggle visibility of facturador form', () => {
    component.toggleDivFacturador();
    expect(component.showTableDiv).toBe(false);
    expect(component.showFacturador).toBe(true);
  });

  it('should handle inputChecked for fisica', () => {
    component.inputChecked('fisica');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
    expect(component.noContribuyente).toBe(false);
  });

  it('should handle inputChecked for moral', () => {
    component.inputChecked('moral');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
    expect(component.noContribuyente).toBe(false);
  });

  it('should handle inputChecked for noContribuyente', () => {
    component.inputChecked('noContribuyente');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(false);
    expect(component.noContribuyente).toBe(true);
  });

  it('should handle tercerosInputChecked for nacional', () => {
    component.tercerosInputChecked('nacional');
    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false);
  });

  it('should handle tercerosInputChecked for extranjero', () => {
    component.tercerosInputChecked('extranjero');
    expect(component.nacional).toBe(false);
    expect(component.extranjero).toBe(true);
  });

  it('should submit fabricante form and update store', () => {
    component.ngOnInit();
    component.agregarFabricanteFormGroup.patchValue({
      denominacionRazonSocial: 'Test Fabricante',
      rfc: 'RFC123456',
      curp: 'CURP123456',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'test@example.com',
      calle: 'Test Calle',
      numeroExterior: '123',
      numeroInterior: '456',
      pais: 'México',
      colonia: 'Test Colonia',
      municipioAlcaldia: 'Test Municipio',
      localidad: 'Test Localidad',
      entidadFederativa: 'Test Entidad',
      estadoLocalidad: 'Test Estado',
      codigoPostaloEquivalente: '12345',
      coloniaoEquivalente: 'Test Colonia Equivalente',
    });

    component.submitFabricanteForm();

    expect(component.fabricanteRowData.length).toBe(1);
    expect(mockStore.setFabricante).toHaveBeenCalledWith(component.fabricanteRowData);
    expect(component.showTableDiv).toBe(true);
    expect(component.showFabricante).toBe(false);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
