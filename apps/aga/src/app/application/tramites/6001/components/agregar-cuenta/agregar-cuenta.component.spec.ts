import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCuentaComponent } from './agregar-cuenta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';
import { of } from 'rxjs';

describe('AgregarCuentaComponent', () => {
  let component: AgregarCuentaComponent;
  let fixture: ComponentFixture<AgregarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('AgregarCuentaComponent', () => {
    let component: AgregarCuentaComponent;
    let fixture: ComponentFixture<AgregarCuentaComponent>;
    let registroCuentasBancariasServiceStub: Partial<RegistroCuentasBancariasService>;

    beforeEach(async () => {

      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, AgregarCuentaComponent],
        providers: [
          { provide: RegistroCuentasBancariasService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AgregarCuentaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create the form with default values', () => {
      expect(component.agregarCuentaForm).toBeDefined();
      expect(component.agregarCuentaForm.get('titularDeLaCuenta')?.value).toBe('');
      expect(component.agregarCuentaForm.get('rfc')?.value).toBe('');
      expect(component.agregarCuentaForm.get('numeroDeCuenta')?.value).toBe('');
    });

    it('should validate titularDeLaCuenta control', () => {
      const titularDeLaCuenta = component.agregarCuentaForm.get('titularDeLaCuenta');
      titularDeLaCuenta?.setValue('');
      expect(titularDeLaCuenta?.valid).toBeFalsy();
      titularDeLaCuenta?.setValue('Valid Name');
      expect(titularDeLaCuenta?.valid).toBeTruthy();
    });

    it('should validate rfc control with pattern', () => {
      const rfc = component.agregarCuentaForm.get('rfc');
      rfc?.setValue('INVALIDRFC');
      expect(rfc?.valid).toBeFalsy();
      rfc?.setValue('VALIDRFC123');
      expect(rfc?.valid).toBeTruthy();
    });

    it('should validate numeroDeCuenta control', () => {
      const numeroDeCuenta = component.agregarCuentaForm.get('numeroDeCuenta');
      numeroDeCuenta?.setValue('');
      expect(numeroDeCuenta?.valid).toBeFalsy();
      numeroDeCuenta?.setValue('1234567890');
      expect(numeroDeCuenta?.valid).toBeTruthy();
    });

    it('should validate sucursal control with pattern', () => {
      const sucursal = component.agregarCuentaForm.get('sucursal');
      sucursal?.setValue('INVALID');
      expect(sucursal?.valid).toBeFalsy();
      sucursal?.setValue('VALID123');
      expect(sucursal?.valid).toBeTruthy();
    });

    it('should validate numeroDePlaza control with pattern', () => {
      const numeroDePlaza = component.agregarCuentaForm.get('numeroDePlaza');
      numeroDePlaza?.setValue('INVALID');
      expect(numeroDePlaza?.valid).toBeFalsy();
      numeroDePlaza?.setValue('VALID123');
      expect(numeroDePlaza?.valid).toBeTruthy();
    });
  });
});
