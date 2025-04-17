import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosFabSeccionComponent } from './terceros-relacionados-fab-seccion.component';

describe('TercerosRelacionadosFabSeccionComponent', () => {
  let component: TercerosRelacionadosFabSeccionComponent;
  let fixture: ComponentFixture<TercerosRelacionadosFabSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosFabSeccionComponent],
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
  let fixture: ComponentFixture<TercerosRelacionadosFabSeccionComponent>;
  let component: TercerosRelacionadosFabSeccionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TercerosRelacionadosFabSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosFabSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize agregarFabricanteFormGroup with disabled fields', () => {
    component.initializeAgregarFabricanteFormGroup();

    expect(component.agregarFabricanteFormGroup.get('rfc')?.disabled).toBeTrue();
    expect(component.agregarFabricanteFormGroup.get('curp')?.disabled).toBeTrue();
    expect(component.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.disabled).toBeTrue();
  });

  it('should initialize agregarDestinatarioFormGroup with disabled fields', () => {
    component.initializeAgregarDestinatarioFormGroup();

    expect(component.agregarDestinatarioFormGroup.get('rfc')?.disabled).toBeTrue();
    expect(component.agregarDestinatarioFormGroup.get('curp')?.disabled).toBeTrue();
    expect(component.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.disabled).toBeTrue();
  });

  it('should initialize agregarProveedorFormGroup with disabled fields', () => {
    component.initializeAgregarProveedorFormGroup();

    expect(component.agregarProveedorFormGroup.get('nombre')?.disabled).toBeTrue();
    expect(component.agregarProveedorFormGroup.get('primerApellido')?.disabled).toBeTrue();
    expect(component.agregarProveedorFormGroup.get('denominacionRazonSocial')?.disabled).toBeTrue();
  });

  it('should initialize agregarFacturadorFormGroup with disabled fields', () => {
    component.initializeAgregarFacturadorFormGroup();

    expect(component.agregarFacturadorFormGroup.get('nombre')?.disabled).toBeTrue();
    expect(component.agregarFacturadorFormGroup.get('primerApellido')?.disabled).toBeTrue();
    expect(component.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.disabled).toBeTrue();
  });

  it('should add a new row to fabricanteRowData when submitFabricanteForm is called', () => {
    component.agregarFabricanteFormGroup = new FormGroup({
      denominacionRazonSocial: new FormControl('Test Fabricante'),
      rfc: new FormControl('ABCD123456XYZ'),
      curp: new FormControl('ABCD123456HDFLRS01'),
      lada: new FormControl('123'),
      telefono: new FormControl('4567890'),
      correoElectronico: new FormControl('test@example.com'),
      calle: new FormControl('Test Street'),
      numeroExterior: new FormControl('123'),
      numeroInterior: new FormControl('A'),
      pais: new FormControl('1'),
      colonia: new FormControl('1'),
      municipioAlcaldia: new FormControl('1'),
      localidad: new FormControl('1'),
      entidadFederativa: new FormControl('Test State'),
      estadoLocalidad: new FormControl('Test City'),
      codigoPostaloEquivalente: new FormControl('12345'),
      coloniaoEquivalente: new FormControl('Test Colonia'),
    });

    component.paisDropdownData = [{ id: 1, descripcion: 'Test Country' }];
    component.coloniaDropdownData = [{ id: 1, descripcion: 'Test Colonia' }];
    component.municipioDropdownData = [{ id: 1, descripcion: 'Test Municipio' }];
    component.localidadDropdownData = [{ id: 1, descripcion: 'Test Localidad' }];
    component.codigoPostalDropdownData = [{ id: 1, descripcion: '12345' }];

    component.submitFabricanteForm();

    expect(component.fabricanteRowData.length).toBe(1);
    expect(component.fabricanteRowData[0].tbodyData).toContain('Test Fabricante');
    expect(component.fabricanteRowData[0].tbodyData).toContain('Test Country');
  });

  it('should update showFabricanteButtons when selectedFabricanteRows is called', () => {
    component.selectedFabricanteRows({ checked: true } as DatosSeleccionados);

    expect(component.showFabricanteButtons).toBeTrue();
  });

  it('should update showDestinatarioButtons when selectedDestinatarioRows is called', () => {
    component.selectedDestinatarioRows({ checked: true } as DatosSeleccionados);

    expect(component.showDestinatarioButtons).toBeTrue();
  });

  it('should update showProveedorButtons when selectedProveedorRows is called', () => {
    component.selectedProveedorRows({ checked: true } as DatosSeleccionados);

    expect(component.showProveedorButtons).toBeTrue();
  });

  it('should update showFacturadorButtons when selectedFacturadorRows is called', () => {
    component.selectedFacturadorRows({ checked: true } as DatosSeleccionados);

    expect(component.showFacturadorButtons).toBeTrue();
  });
});
