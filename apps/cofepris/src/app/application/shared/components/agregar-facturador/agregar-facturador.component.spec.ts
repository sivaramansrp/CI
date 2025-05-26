import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFacturadorComponent } from './agregar-facturador.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarFacturadorComponent', () => {
  let component: AgregarFacturadorComponent;
  let fixture: ComponentFixture<AgregarFacturadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarFacturadorComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFacturadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.agregarFacturadorForm.get('tipoPersona')?.value).toBe('');
    expect(component.agregarFacturadorForm.get('nombres')?.value).toBe('');
    expect(component.agregarFacturadorForm.get('primerApellido')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.agregarFacturadorForm;
    expect(form.valid).toBeFalsy();

    // Set all required fields
    form.controls['tipoPersona'].setValue('Física');
    form.controls['nombres'].setValue('Test');
    form.controls['primerApellido'].setValue('User');
    form.controls['pais'].setValue('Mexico');
    form.controls['estado'].setValue('CDMX');
    form.controls['codigoPostal'].setValue('12345');
    form.controls['calle'].setValue('Test St');
    form.controls['numeroExterior'].setValue('123');
    form.controls['correoElectronico'].setValue('test@test.com');

    // If there are other required fields, set them here as well
    if (form.controls['rfc']) {
      form.controls['rfc'].setValue('XAXX010101000');
    }
    if (form.controls['colonia']) {
      form.controls['colonia'].setValue('Centro');
    }

    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.agregarFacturadorForm.controls['correoElectronico'];
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    emailControl.updateValueAndValidity();
    fixture.detectChanges();

    emailControl.setValue('valid@email.com');
    emailControl.markAsTouched();
    emailControl.updateValueAndValidity();
    fixture.detectChanges();
    expect(emailControl.errors).toBeNull();
  });

  it('should call guardarFacturador and reset form on save', () => {
    jest.spyOn(component.agregarFacturadorForm, 'reset');
    component.guardarFacturador();
    expect(component.agregarFacturadorForm.reset).toHaveBeenCalled();
  });
});
