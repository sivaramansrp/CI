import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosFabSeccionComponent } from './terceros-relacionados-fab-seccion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TercerosRelacionadosFebService } from '../../services/tereceros-relacionados-feb.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

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
    const validRFCFisica = component.rfcValidator({ value: 'ABCD123456XYZ' } as AbstractControl);
    const validRFCMoral = component.rfcValidator({ value: 'ABC123456XYZ' } as AbstractControl);
    const invalidRFC = component.rfcValidator({ value: 'INVALID123' } as AbstractControl);

    expect(validRFCFisica).toBeNull();
    expect(validRFCMoral).toBeNull();
    expect(invalidRFC).toEqual({ invalidRFC: true });
  });

  it('should validate CURP correctly using curpValidator', () => {
    const validCURP = component.curpValidator({ value: 'ABCD123456HDFLRS01' } as AbstractControl);
    const invalidCURP = component.curpValidator({ value: 'INVALIDCURP' } as AbstractControl);

    expect(validCURP).toBeNull();
    expect(invalidCURP).toEqual({ invalidCURP: true });
  });

  it('should validate telefono correctly using telefonoValidator', () => {
    const validTelefono = component.telefonoValidator({ value: '123-456-7890' } as AbstractControl);
    const invalidTelefono = component.telefonoValidator({ value: 'INVALID_PHONE' } as AbstractControl);

    expect(validTelefono).toBeNull();
    expect(invalidTelefono).toEqual({ invalidTelefono: true });
  });
});
