import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CambioContrasena } from '../../core/models/cambio-contrasena.model';
import { CommonModule } from '@angular/common';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { PasswordService } from '../../core/service/password.service';

/**
 * Componente para el cambio de contraseña de usuario.
 * Permite validar la contraseña anterior, establecer una nueva contraseña cumpliendo requisitos de seguridad,
 * y confirmar la nueva contraseña. Utiliza validadores síncronos y asíncronos para asegurar la integridad de los datos.
 */
@Component({
  selector: 'app-cambio-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambio-contrasena.component.html',
  styleUrl: './cambio-contrasena.component.scss',
})
export class CambioContrasenaComponent implements OnInit {
  /** Formulario reactivo para el cambio de contraseña */
  public FormCambioContrasena!: FormGroup;
  /** Notificación para mostrar mensajes al usuario */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Constructor que inyecta dependencias necesarias.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param passwordService Servicio para operaciones relacionadas con contraseñas.
   */
  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService
  ) { }

  /**
   * Inicializa el formulario al cargar el componente.
   */
  ngOnInit(): void {
    this.inicializaFormCambioContrasena();
  }

  /**
   * Configura el formulario de cambio de contraseña con validadores personalizados.
   */
  inicializaFormCambioContrasena(): void {
    this.FormCambioContrasena = this.fb.group({
      contrasenaAnterior: ['', [Validators.required]],
      contrasenaNueva: ['', [Validators.required, CambioContrasenaComponent.validadorContrasenaSegura]],
      confirmacionContrasena: ['', [Validators.required]],
    }, {
      validators: CambioContrasenaComponent.validadorCoincidenciaContrasenas
    });
  }

  /**
   * Envía el formulario si es válido y realiza el cambio de contraseña.
   */
  onSubmit(): void {
    if (this.FormCambioContrasena.invalid) {
      this.FormCambioContrasena.markAllAsTouched();
      return;
    }

    const MODELO_CAMBIO: CambioContrasena = {
      contrasenaAnterior: this.FormCambioContrasena.get('contrasenaAnterior')?.value,
      contrasenaNueva: this.FormCambioContrasena.get('contrasenaNueva')?.value,
      confirmacionContrasena: this.FormCambioContrasena.get('confirmacionContrasena')?.value
    };

    this.passwordService.cambioContrasena(MODELO_CAMBIO).subscribe({
      next: (success: boolean) => {
        if (success) {
          // console.log('Contraseña modificada exitosamente');
        } else {
          console.error('No se pudo cambiar la contraseña');
        }
      },
      error: (err: unknown) => {
        console.error('Error al cambiar la contraseña', err);
      }
    });
  }

  /**
 * Validador para verificar que la contraseña cumple con los requisitos de seguridad.
 */
  static validadorContrasenaSegura(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }
    const LONGITUDVALIDA = VALUE.length >= 8 && VALUE.length <= 64;
    const CONTIENEMAYUSCULA = /[A-Z]/.test(VALUE);
    const CONTIENEMINUSCULA = /[a-z]/.test(VALUE);
    const CONTIENENUMEROOOSIMBOLO = /[@#$%|°!&/()=?¿+*"']/.test(VALUE);
    const SINESPACIOS = !/\s/.test(VALUE);
    const ESVALIDA = LONGITUDVALIDA && CONTIENEMAYUSCULA && CONTIENEMINUSCULA && CONTIENENUMEROOOSIMBOLO && SINESPACIOS;
    return ESVALIDA ? null : { contrasenaInvalida: true };
  }

  /**
 * Validador para verificar que la confirmación coincida con la nueva contraseña.
 */
  static validadorCoincidenciaContrasenas(group: AbstractControl): ValidationErrors | null {
    const NUEVA = group.get('contrasenaNueva')?.value;
    const CONFIRMACION = group.get('confirmacionContrasena')?.value;
    return NUEVA === CONFIRMACION ? null : { noCoinciden: true };
  }
}