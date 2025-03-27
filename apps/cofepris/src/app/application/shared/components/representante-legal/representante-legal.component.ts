import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/tramites260603.store';
import { Tramite260603Query } from '../../../shared/estados/tramites260603.query';
import { Subject, map, takeUntil } from 'rxjs';

/**
 * component RepresentanteLegalComponent
 * description Componente para gestionar los datos del representante legal.
 * Proporciona un formulario reactivo para capturar y validar información del representante legal.
 */
@Component({
  selector: 'app-representante-legal', // Selector del componente para usarlo en plantillas HTML.
  standalone: true, // Indica que el componente es independiente (standalone).
  imports: [CommonModule, ReactiveFormsModule, TituloComponent], // Módulos y componentes importados.
  templateUrl: './representante-legal.component.html', // Ruta del archivo de plantilla HTML.
  styleUrl: './representante-legal.component.scss', // Ruta del archivo de estilos SCSS.
})
export class RepresentanteLegalComponent implements OnInit {
  /**
   * property representanteLegalForm
   * description Formulario reactivo para capturar los datos del representante legal.
   */
  representanteLegalForm!: FormGroup;

  /**
   * property solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260603State;

  /**
   * property destroyNotifier$
   * description Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * constructor
   * param fb FormBuilder para crear formularios reactivos.
   * param tramite260603Store Almacén para gestionar el estado de los trámites.
   * param tramite260603Query Consulta para obtener datos del estado de los trámites.
   */
  constructor(
    private fb: FormBuilder, // Inyección de dependencia para crear formularios reactivos.
    private tramite260603Store: Tramite260603Store, // Inyección del almacén de trámites.
    private tramite260603Query: Tramite260603Query // Inyección de la consulta de trámites.
  ) {
    // Constructor vacío.
  }

  /**
   * method ngOnInit
   * description Método de inicialización del componente.
   * Configura el formulario y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    // Suscribe al estado de la solicitud y actualiza la propiedad solicitudState.
    this.tramite260603Query.selectSolicitud$
      .pipe(
        // Finaliza la suscripción cuando se destruye el componente.
        takeUntil(this.destroyNotifier$),

        // Mapea el estado de la sección al estado de la solicitud.
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    // Configura el formulario reactivo con valores iniciales y validaciones.
    this.representanteLegalForm = this.fb.group({
      // Campo para el RFC del representante legal, requerido y con longitud máxima de 13 caracteres.
      rfc: [this.solicitudState?.rfc, [Validators.required, Validators.maxLength(13)]],

      // Campo para el nombre o razón social, deshabilitado y requerido.
      nombreRazonSocial: [{ value: '', disabled: true }, Validators.required],

      // Campo para el apellido paterno, deshabilitado y requerido.
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],

      // Campo para el apellido materno, deshabilitado y opcional.
      apellidoMaterno: [{ value: '', disabled: true }],
    });
  }

  /**
   * method setValoresStore
   * description Establece valores en el almacén de trámites.
   * param form Formulario reactivo.
   * param campo Nombre del campo del formulario.
   * param metodoNombre Método del almacén a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260603Store): void {
    // Obtiene el valor del campo del formulario.
    const VALOR = form.get(campo)?.value;

    // Invoca el método correspondiente en el almacén con el valor obtenido.
    (this.tramite260603Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }
}
