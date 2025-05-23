import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CambioContrasena } from '../../core/models/cambio-contrasena.model';
import { CommonModule } from '@angular/common';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { TramiteService } from '../../core/service/tramite.service';


/**
 * Componente para el cambio de contraseña del usuario.
 * Permite ingresar la contraseña anterior, la nueva y su confirmación,
 * validando los campos requeridos y enviando la solicitud al servicio correspondiente.
 */
@Component({
  selector: 'app-cambio-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cambio-contrasena.component.html',
  styleUrl: './cambio-contrasena.component.scss',
})
export class CambioContrasenaComponent implements OnInit {
  /**
   * Formulario reactivo para el cambio de contraseña.
   */
  public FormCambioContrasena!: FormGroup;

    /** 
   * Configuración para la notificación actual.
   */
    public nuevaNotificacion: Notificacion | null = null;
    
  /**
   * Constructor. Inyecta FormBuilder y TramiteService.
   * @param fb FormBuilder para construir el formulario reactivo.
   * @param tramiteService Servicio para realizar el cambio de contraseña.
   */
  constructor(
    private fb: FormBuilder,
    private tramiteService: TramiteService
  ) { }

  /**
   * Inicializa el componente y el formulario de cambio de contraseña.
   */
  ngOnInit(): void {
    this.inicializaFormCambioContrasena();
  }

  /**
   * Inicializa el formulario de cambio de contraseña con validaciones requeridas.
   * @returns {void}
   */
  inicializaFormCambioContrasena(): void {
    this.FormCambioContrasena = this.fb.group({
      contrasenaAnterior: ['', Validators.required],
      contrasenaNueva: ['', Validators.required],
      confirmacionContrasena: ['', Validators.required]
    });
  }

  /**
   * Envía el formulario de cambio de contraseña si es válido.
   * Marca todos los campos como tocados si el formulario es inválido.
   * Llama al servicio para realizar el cambio de contraseña.
   */
  onSubmit(): void {
    if (this.FormCambioContrasena.invalid) {
      this.FormCambioContrasena.markAllAsTouched(); 
      return;
    }
    const MODELO_CAMBIO_CONTRASENA: CambioContrasena = {
      contrasenaAnterior: this.FormCambioContrasena.get('contrasenaAnterior')?.value,
      contrasenaNueva: this.FormCambioContrasena.get('contrasenaNueva')?.value,
      confirmacionContrasena: this.FormCambioContrasena.get('confirmacionContrasena')?.value
    };
    this.tramiteService.cambioContrasena(MODELO_CAMBIO_CONTRASENA).subscribe({
      next: (respuesta) => {
         
        // Aquí podrías mostrar un mensaje al usuario o redirigir
      },
      error: (err) => {
        console.error('Error al cambiar la contraseña', err);
      }
    });
  }
}