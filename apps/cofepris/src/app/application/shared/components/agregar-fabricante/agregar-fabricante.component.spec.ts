import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFabricanteComponent } from './agregar-fabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarFabricanteComponent', () => {
  let component: AgregarFabricanteComponent;
  let fixture: ComponentFixture<AgregarFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarFabricanteComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.agregarFabricanteForm.get('nacionalidad')?.value).toBe('Nacional');
    expect(component.agregarFabricanteForm.get('tipoPersona')?.value).toBe('');
    expect(component.agregarFabricanteForm.get('rfc')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.agregarFabricanteForm;
    expect(form.valid).toBeFalsy();
    
    form.controls['nacionalidad'].setValue('MX');
    form.controls['tipoPersona'].setValue('FISICA');
    form.controls['rfc'].setValue('TEST123456ABC');
    form.controls['curp'].setValue('CURP123456ABCDEF');
    form.controls['nombres'].setValue('Test');
    form.controls['primerApellido'].setValue('User');
    form.controls['razonSocial'].setValue('Test Company');
    form.controls['pais'].setValue('MX');
    form.controls['estado'].setValue('JAL');
    form.controls['municipio'].setValue('GDL');
    form.controls['localidad'].setValue('Centro');
    form.controls['codigoPostal'].setValue('12345');
    form.controls['colonia'].setValue('Test Col');
    form.controls['calle'].setValue('Test St');
    form.controls['numeroExterior'].setValue('123');
    form.controls['correoElectronico'].setValue('test@test.com');
    form.controls['adunasDeEntradas'].setValue('Test');

    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.agregarFabricanteForm.controls['correoElectronico'];
    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue('valid@email.com');
    expect(emailControl.valid).toBeTruthy();
  });

  it('should load catalogs on init', () => {
    component.ngOnInit();
    expect(component.paisesDatos).toBeDefined();
    expect(component.estadosDatos).toBeDefined();
    expect(component.municipiosDatos).toBeDefined();
  });
});
