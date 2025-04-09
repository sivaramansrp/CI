import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-fabricante.component';
import { TercerosFabricanteStore } from '../../estados/stores/terceros-fabricante.store';
import { TercerosFabricanteService } from '../../services/terceros-fabricante.service';
import { of } from 'rxjs';

// Mock SELECT_OPTIONS_DATA
jest.mock(
  'libs/shared/theme/assets/json/260501/fabricante-select-options-data.json',
  () => ({
    paisSelectData: [
      { id: '1', descripcion: 'Mexico' },
      { id: '2', descripcion: 'USA' },
    ],
    localidadSelectData: [
      { id: '1', descripcion: 'Localidad 1' },
      { id: '2', descripcion: 'Localidad 2' },
    ],
    municipioSelectData: [
      { id: '1', descripcion: 'Municipio 1' },
      { id: '2', descripcion: 'Municipio 2' },
    ],
    codigoPostalSelectData: [
      { id: '1', descripcion: '12345' },
      { id: '2', descripcion: '67890' },
    ],
    coloniaSelectData: [
      { id: '1', descripcion: 'Colonia 1' },
      { id: '2', descripcion: 'Colonia 2' },
    ],
  })
);

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let storeMock: any;
  let serviceMock: any;

  beforeEach(() => {
    storeMock = {
      setFabricante: jest.fn(),
      setFormulador: jest.fn(),
      setProveedor: jest.fn(),
    };

    serviceMock = {
      getData: jest.fn().mockReturnValue(of([])),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TercerosRelacionadosComponent], // Add the standalone component here
      providers: [
        FormBuilder,
        { provide: TercerosFabricanteStore, useValue: storeMock },
        { provide: TercerosFabricanteService, useValue: serviceMock },
      ],
    });

    const fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.agregarFabricanteFormGroup).toBeDefined();
    expect(component.agregarFormuladorFormGroup).toBeDefined();
    expect(component.agregarProveedorFormGroup).toBeDefined();
  });

  it('should toggle visibility for Fabricante form', () => {
    component.toggleDivFabricante();
    expect(component.showFabricante).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should toggle visibility for Formulador form', () => {
    component.toggleDivFormulador();
    expect(component.showFormulador).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should toggle visibility for Proveedor form', () => {
    component.toggleDivProveedor();
    expect(component.showProveedor).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should validate requiredPaisValidator', () => {
    const control = { value: '' };
    const result = TercerosRelacionadosComponent.requiredPaisValidator(
      control as any
    );
    expect(result).toEqual({ requiredPais: true });
  });

  it('should validate rfcValidator', () => {
    const control = { value: 'ABC123456T89' };
    const result = TercerosRelacionadosComponent.rfcValidator(control as any);
    expect(result).toBeNull();
  });

  it('should validate curpValidator', () => {
    const control = { value: 'ABCD890123HDFRRL01' };
    const result = TercerosRelacionadosComponent.curpValidator(control as any);
    expect(result).toBeNull();
  });

  it('should validate telefonoValidator', () => {
    const control = { value: '1234567890' };
    const result = TercerosRelacionadosComponent.telefonoValidator(
      control as any
    );
    expect(result).toBeNull();
  });

  it('should submit Fabricante form and update store', () => {
    component.agregarFabricanteFormGroup.setValue({
      tercerosNacionalidad: 'nacional',
      tipoPersona: 'fisica',
      rfc: 'ABC123456T89',
      curp: 'ABCD890123HDFRRL01',
      nombre: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      denominacionRazonSocial: 'Company XYZ',
      pais: 'Mexico',
      estadoLocalidad: 'Estado',
      municipioAlcaldia: 'Municipio',
      localidad: 'Localidad',
      entidadFederativa: 'Entidad',
      codigoPostaloEquivalente: '12345',
      colonia: 'Colonia',
      coloniaoEquivalente: '',
      calle: 'Calle 123',
      numeroExterior: '10',
      numeroInterior: '2',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'test@example.com',
      extranjeroCodigo: '',
      extranjeroEstado: '',
      extranjeroColonia: '',
    });

    component.submitFabricanteForm();
    expect(storeMock.setFabricante).toHaveBeenCalledWith(
      component.fabricanteRowData
    );
  });

  it('should handle cambiarRadio', () => {
    component.cambiarRadio('nacional');
    expect(component.nacional).toBe(true);
    expect(component.extranjero).toBe(false);
  });

  it('should handle cambiarRadioFisica', () => {
    component.cambiarRadioFisica('fisica');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
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
});
