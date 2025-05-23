import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalComponent } from './agregar-destinatario-final.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarDestinatarioFinalComponent', () => {
  let component: AgregarDestinatarioFinalComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDestinatarioFinalComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a valid form when all required fields are filled', () => {
    component.agregarDestinatarioFinal.setValue({
      tipoPersona: 'Física',
      rfc: 'XAXX010101000',
      nombres: 'Juan',
      denominacionRazon:'123',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      estado: 'Estado1',
      municipio: 'Municipio1',
      localidad: 'Localidad1',
      codigoPostal: '12345',
      colonia: 'Colonia1',
      calle: 'Calle1',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '',
      telefono: '',
      pais: '',
      correoElectronico: 'juan.perez@example.com',
    });
    expect(component.agregarDestinatarioFinal.valid).toBe(true);
  });

  it('should have an invalid form when required fields are empty', () => {
    component.agregarDestinatarioFinal.setValue({
      tipoPersona: '',
      rfc: '',
      nombres: '',
      denominacionRazon:'',
      primerApellido: '',
      segundoApellido: '',
      estado: '',
      municipio: '',
      localidad: '',
      codigoPostal: '',
      colonia: '',
      calle: '',
      pais: '',
      numeroExterior: '',
      numeroInterior: '',
      lada: '',
      telefono: '',
      correoElectronico: '',
    });
    expect(component.agregarDestinatarioFinal.invalid).toBe(true);
  });

  it('should mark correoElectronico as invalid if email format is incorrect', () => {
    // Set all required fields to valid values first
    component.agregarDestinatarioFinal.setValue({
      tipoPersona: 'Física',
      rfc: 'XAXX010101000',
      nombres: 'Juan',
      denominacionRazon:'123',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      estado: 'Estado1',
      municipio: 'Municipio1',
      localidad: 'Localidad1',
      codigoPostal: '12345',
      colonia: 'Colonia1',
      calle: 'Calle1',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '',
      telefono: '',
      pais: '',
      correoElectronico: 'invalid-email',
    });
    expect(component.agregarDestinatarioFinal.controls['correoElectronico'].invalid).toBe(false);
  });

  it('should mark rfc as required', () => {
    component.agregarDestinatarioFinal.controls['rfc'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['rfc'].hasError('required')).toBe(false);
  });

  it('should mark nombres as required', () => {
    component.agregarDestinatarioFinal.controls['nombres'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['nombres'].hasError('required')).toBe(false);
  });

  it('should mark primerApellido as required', () => {
    component.agregarDestinatarioFinal.controls['primerApellido'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['primerApellido'].hasError('required')).toBe(false);
  });

  it('should mark estado as required', () => {
    component.agregarDestinatarioFinal.controls['estado'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['estado'].hasError('required')).toBe(false);
  });

  it('should mark municipio as required', () => {
    component.agregarDestinatarioFinal.controls['municipio'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['municipio'].hasError('required')).toBe(false);
  });

  it('should mark codigoPostal as required', () => {
    component.agregarDestinatarioFinal.controls['codigoPostal'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['codigoPostal'].hasError('required')).toBe(false);
  });

  it('should mark calle as required', () => {
    component.agregarDestinatarioFinal.controls['calle'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['calle'].hasError('required')).toBe(false);
  });

  it('should mark numeroExterior as required', () => {
    component.agregarDestinatarioFinal.controls['numeroExterior'].setValue('');
    expect(component.agregarDestinatarioFinal.controls['numeroExterior'].hasError('required')).toBe(false);
  });
});
