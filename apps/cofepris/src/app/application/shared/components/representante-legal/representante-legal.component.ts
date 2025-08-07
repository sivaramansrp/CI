import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { DomicilioState } from '../../estados/stores/domicilio.store';

import { DomicilioStore } from '../../estados/stores/domicilio.store';

import { DomicilioQuery } from '../../../shared/estados/queries/domicilio.query';

import { Subject, map, takeUntil } from 'rxjs';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

/**
 * @description
 * Componente que gestiona los datos del representante legal.
 * Permite inicializar un formulario reactivo con los datos de la solicitud
 * y realizar operaciones relacionadas con el estado del trámite.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit {

  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;
  /**
   * @description
   * Formulario reactivo para capturar los datos del representante legal.
   */
  representanteLegalForm!: FormGroup;

   /**
   * Obtiene el valor de un campo en el store de Tramite31601.
   */
  obtenerValor(): void {
    this.representanteLegalForm.patchValue({
      nombreRazonSocial: 47875,
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
    });
  }

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: DomicilioState;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @description
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param domicilioStore Store para gestionar el estado del trámite.
   * @param domicilioquery Query para obtener datos del estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private domicilioStore: DomicilioStore,
    private domicilioquery: DomicilioQuery,
    private consultaioQuery: ConsultaioQuery,
  ) {
    // Constructor
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y sus valores iniciales basados en el estado de la solicitud.
   */
  ngOnInit(): void {
this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }

  }
  /**
  * Inicializa el formulario reactivo para capturar el valor de 'registro'.
  * Suscribe al estado almacenado en el store mediante el query `domicilioquery.selectSolicitud$`
  * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
  * con el valor inicial obtenido del store.
  */

  inicializarFormulario(): void {
    this.domicilioquery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.representanteLegalForm = this.fb.group({
      /**
       * @description
       * Campo para capturar el RFC del representante legal.
       * Es un campo obligatorio con un máximo de 13 caracteres.
       */
      rfc: [this.solicitudState?.rfc, [Validators.required, Validators.maxLength(13)]],

      /**
       * @description
       * Campo para capturar el nombre o razón social del representante legal.
       * Este campo está deshabilitado por defecto y es obligatorio.
       */
      nombreRazonSocial: [{ value: this.solicitudState?.nombreRazonSocial, disabled: true }, Validators.required],

      /**
       * @description
       * Campo para capturar el apellido paterno del representante legal.
       * Este campo está deshabilitado por defecto y es obligatorio.
       */
      apellidoPaterno: [{ value: this.solicitudState?.apellidoPaterno, disabled: true }, Validators.required],

      /**
       * @description
       * Campo para capturar el apellido materno del representante legal.
       * Este campo está deshabilitado por defecto y es opcional.
       */
      apellidoMaterno: [{ value: this.solicitudState?.apellidoMaterno, disabled: true }],
    });
  }


  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.representanteLegalForm.disable();
    } else {
      this.representanteLegalForm.enable();
    } 
  }

  /**
     * @description
     * Método que actualiza el estado del store con los valores del formulario.
     * @param form Formulario reactivo.
     * @param campo Campo del formulario que se desea actualizar.
     * @param metodoNombre Nombre del método del store que se invocará.
     */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DomicilioStore): void {
    const VALOR = form.get(campo)?.value;
    (this.domicilioStore[metodoNombre] as (value: string | number) => void)(VALOR);
  }
}
