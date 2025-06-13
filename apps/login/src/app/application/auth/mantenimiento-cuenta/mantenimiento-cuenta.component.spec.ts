import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoCuentaComponent } from './mantenimiento-cuenta.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperacionCuentaService } from '../../../estados/RecuperacionCuentaResponse';
import { RecuperacionStore } from '../../../estados/RecuperacionState.store';
import { TipoPersona } from '@libs/shared/data-access-user/src';

describe('MantenimientoCuentaComponent', () => {
  let component: MantenimientoCuentaComponent;
  let fixture: ComponentFixture<MantenimientoCuentaComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const serviceSpy = jasmine.createSpyObj('RecuperacionCuentaService', ['recuperarCuenta']);

    await TestBed.configureTestingModule({
      imports: [MantenimientoCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Escenario 1: Extranjero Persona Moral
    describe('Flujo Extranjero Persona Moral', () => {
        beforeEach(() => {
            component.formularioRecuperar.patchValue({
                nacionalidad: false,
                personaTipo: TipoPersona.MORAL
            });
            fixture.detectChanges();
        });

        it('debe validar persona moral extranjera con datos correctos', () => {
            component.formularioRecuperar.patchValue({
                usuario: 'ABCD123456ABC',
                razonSocial: 'Empresa Test SA',
                codigoPostal: '12345',
                estado: 'Estado Test',
                pais: 'País Test'
            });
            fixture.detectChanges();

            expect(component.esValidaPersonaMoralExtranjera()).toBeTruthy();
        });

        it('debe invalidar persona moral extranjera con datos incorrectos', () => {
            component.formularioRecuperar.patchValue({
                usuario: 'RFC-INVALIDO',
                razonSocial: '',
                codigoPostal: '',
                estado: '',
                pais: ''
            });
            fixture.detectChanges();

            expect(component.esValidaPersonaMoralExtranjera()).toBeFalsy();
        });
    });

    // Escenario 2: Nacional con CURP
    describe('Flujo Nacional CURP', () => {
        beforeEach(() => {
            component.formularioRecuperar.patchValue({
                nacionalidad: true,
                tipoDocumento: 'CURP'
            });
            fixture.detectChanges();
        });

        it('debe validar CURP nacional con datos correctos', () => {
            component.formularioRecuperar.patchValue({
                usuario: 'BADD110313HCMLNS09',
                nombre: 'Test',
                primerApellido: 'Apellido1',
                segundoApellido: 'Apellido2'
            });
            fixture.detectChanges();

            expect(component.esValidoCurpNacional()).toBeTruthy();
        });

        it('debe invalidar CURP nacional con datos incorrectos', () => {
            component.formularioRecuperar.patchValue({
                usuario: 'CURP-INVALIDA',
                nombre: '',
                primerApellido: '',
                segundoApellido: ''
            });
            fixture.detectChanges();

            expect(component.esValidoCurpNacional()).toBeFalsy();
        });
    });

});
