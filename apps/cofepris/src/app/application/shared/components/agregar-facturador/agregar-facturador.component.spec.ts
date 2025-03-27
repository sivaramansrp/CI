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
    expect(component.agregarFacturadorForm.get('tipoPersona')?.value).toBe('Fisica');
    expect(component.agregarFacturadorForm.get('nombres')?.value).toBe('');
    expect(component.agregarFacturadorForm.get('primerApellido')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.agregarFacturadorForm;
    expect(form.valid).toBeFalsy();
    
    form.controls['nombres'].setValue('Test');
    form.controls['primerApellido'].setValue('User');
    form.controls['pais'].setValue('Mexico');
    form.controls['estado'].setValue('CDMX');
    form.controls['codigoPostal'].setValue('12345');
    form.controls['calle'].setValue('Test St');
    form.controls['numeroExterior'].setValue('123');
    form.controls['correoElectronico'].setValue('test@test.com');

    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.agregarFacturadorForm.controls['correoElectronico'];
    emailControl.setValue('invalid-email');
    expect(emailControl.errors?.['email']).toBeTruthy();

    emailControl.setValue('valid@email.com');
    expect(emailControl.errors).toBeNull();
  });

  it('should call guardarFacturador and reset form on save', () => {
    jest.spyOn(component.agregarFacturadorForm, 'reset');
    component.guardarFacturador();
    expect(component.agregarFacturadorForm.reset).toHaveBeenCalled();
  });
});
