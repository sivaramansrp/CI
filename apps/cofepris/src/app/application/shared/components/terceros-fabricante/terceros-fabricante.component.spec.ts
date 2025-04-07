import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TercerosRelacionadosComponent } from './terceros-fabricante.component';
import { TercerosFabricanteService } from '../../services/terceros-fabricante.service';
import { TercerosFabricanteStore } from '../../estados/stores/terceros-fabricante.store';
import { of } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let serviceMock: any;
  let storeMock: any;

  beforeEach(() => {
    serviceMock = {
      getData: jest.fn().mockReturnValue(of([])),
    };

    storeMock = {
      setFabricante: jest.fn(),
      setFormulador: jest.fn(),
      setProveedor: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TercerosRelacionadosComponent],
      providers: [
        { provide: TercerosFabricanteService, useValue: serviceMock },
        { provide: TercerosFabricanteStore, useValue: storeMock },
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
    expect(serviceMock.getData).toHaveBeenCalled();
  });

  it('should toggle visibility for Fabricante form', () => {
    expect(component.showFabricante).toBe(false);
    component.toggleDivFabricante();
    expect(component.showFabricante).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should toggle visibility for Formulador form', () => {
    expect(component.showFormulador).toBe(false);
    component.toggleDivFormulador();
    expect(component.showFormulador).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should toggle visibility for Proveedor form', () => {
    expect(component.showProveedor).toBe(false);
    component.toggleDivProveedor();
    expect(component.showProveedor).toBe(true);
    expect(component.showTableDiv).toBe(false);
  });

  it('should validate required fields in Fabricante form', () => {
    component.initializeAgregarFabricanteFormGroup();
    const form = component.agregarFabricanteFormGroup;
    form.get('tercerosNacionalidad')?.setValue('');
    form.get('tipoPersona')?.setValue('');
    form.get('rfc')?.setValue('');
    expect(form.valid).toBe(false);
  });

  it('should submit Fabricante form and update store', () => {
    component.initializeAgregarFabricanteFormGroup();
    const form = component.agregarFabricanteFormGroup;
    form.patchValue({
      tercerosNacionalidad: 'MX',
      tipoPersona: 'fisica',
      rfc: 'ABCD123456XXX',
      curp: 'ABCD123456HDFXXX09',
      denominacionRazonSocial: 'Empresa SA',
      pais: 'MX',
      estadoLocalidad: 'Estado',
      municipioAlcaldia: 'Municipio',
      codigoPostaloEquivalente: '12345',
      calle: 'Calle 1',
      numeroExterior: '123',
    });

    component.submitFabricanteForm();
    expect(storeMock.setFabricante).toHaveBeenCalledWith(component.fabricanteRowData);
    expect(component.showFabricante).toBe(false);
    expect(component.showTableDiv).toBe(true);
  });

  it('should validate RFC using rfcValidator', () => {
    const validRFCFisica = 'ABCD123456XXX';
    const validRFCMoral = 'ABC123456XXX';
    const invalidRFC = 'INVALIDRFC';

    expect(TercerosRelacionadosComponent.rfcValidator({ value: validRFCFisica })).toBeNull();
    expect(TercerosRelacionadosComponent.rfcValidator({ value: validRFCMoral })).toBeNull();
    expect(TercerosRelacionadosComponent.rfcValidator({ value: invalidRFC })).toEqual({ invalidRFC: true });
  });

  it('should validate CURP using curpValidator', () => {
    const validCURP = 'ABCD123456HDFXXX09';
    const invalidCURP = 'INVALIDCURP';

    expect(TercerosRelacionadosComponent.curpValidator({ value: validCURP })).toBeNull();
    expect(TercerosRelacionadosComponent.curpValidator({ value: invalidCURP })).toEqual({ invalidCURP: true });
  });

  it('should validate phone number using telefonoValidator', () => {
    const validPhone = '123-456-7890';
    const invalidPhone = 'INVALIDPHONE';

    expect(TercerosRelacionadosComponent.telefonoValidator({ value: validPhone })).toBeNull();
    expect(TercerosRelacionadosComponent.telefonoValidator({ value: invalidPhone })).toEqual({ invalidTelefono: true });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});