import {
  AvisoSanitarioState,
  Tramite260601Store,
} from '../../../../estados/tramites/tramite260601.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsultaioQuery,
  Notificacion,
  NotificacionesComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { CommonModule } from '@angular/common';
import { MSG_ERROR_REPRESENTANTE_LEGAL } from '../../constantes/aviso-enum';
import { RepresentanteLegalRespuesta } from '../../models/aviso-model';
import { ToastrService } from 'ngx-toastr';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';

/**
 * Componente para gestionar el representante legal.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TituloComponent, NotificacionesComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.css',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos del representante legal.
   */
  representanteLegalForm!: FormGroup;

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property {boolean} modalAlerta
   * @description Indica si el modal de alerta está visible. Se utiliza para mostrar mensajes de advertencia al usuario.
   */
  modalAlerta: boolean = false;

  /**
   * @property {Notificacion} nuevaNotificacion
   * @description Objeto que contiene la información de la notificación a mostrar en el componente de notificaciones.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Constructor del componente.
   * Inyecta servicios necesarios para gestionar el estado del trámite y las interacciones del formulario.
   *
   * @param fb FormBuilder para construir formularios reactivos.
   * @param tramite260601Store Store para gestionar el estado del trámite.
   * @param tramite260601Query Query para observar cambios en el estado del trámite.
   * @param avisoSanitarioService Servicio para gestionar las interacciones de aviso sanitario.
   * @param toastr Servicio para mostrar notificaciones al usuario.
   * @param consultaioQuery Query para observar el estado de la consulta.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query,
    private avisoSanitarioService: AvisoSanitarioService,
    private toastr: ToastrService,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destruirNotificador$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el componente.
   * Suscribe al estado del trámite y configura el formulario principal.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.nuevaNotificacion = {} as Notificacion;
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
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.representanteLegalForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.representanteLegalForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Crea y configura el formulario principal para el representante legal.
   */
  crearFormulario(): void {
    this.representanteLegalForm = this.fb.group({
      rfc: [this.avisoSanitarioState?.rfc, [Validators.required]],
      nombreOrazonsocial: [
        { value: this.avisoSanitarioState?.nombreOrazonsocial, disabled: true },
        Validators.required,
      ],
      apellidoPaterno: [
        { value: this.avisoSanitarioState?.apellidoPaterno, disabled: true },
      ],
      apellidoMaterno: [
        { value: this.avisoSanitarioState?.apellidoMaterno, disabled: true },
      ],
    });
  }

  /**
   * Obtiene la información del representante legal según el RFC ingresado.
   * Actualiza el formulario con los datos obtenidos o muestra un error en caso de valor no válido.
   */
  obtenerRespuestaIDCPorRFC(): void {
    const RFC_REPRESENTANTE_LEGAL_COFEPRIS =
      this.representanteLegalForm.get('rfc')?.value;

    if (
      RFC_REPRESENTANTE_LEGAL_COFEPRIS === null ||
      RFC_REPRESENTANTE_LEGAL_COFEPRIS === undefined ||
      RFC_REPRESENTANTE_LEGAL_COFEPRIS === ''
    ) {
      this.toastr.error(MSG_ERROR_REPRESENTANTE_LEGAL);
      this.representanteLegalForm.reset();
      this.modalAlerta = true;
          this.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: '',
            modo: 'action',
            titulo: '',
            mensaje: MSG_ERROR_REPRESENTANTE_LEGAL,
            cerrar: false,
            tiempoDeEspera: 2000,
            txtBtnAceptar: 'Aceptar',
            txtBtnCancelar: '',
          };
    } else {
      this.avisoSanitarioService
        .buscarRfc()
        .pipe(takeUntil(this.destruirNotificador$))
        .subscribe({
          next: (result: RepresentanteLegalRespuesta) => {
            const REPRESENTANTE_LEGAL = result.data[0];
            this.representanteLegalForm.patchValue({
              nombreOrazonsocial: REPRESENTANTE_LEGAL.nombreOrazonsocial,
              apellidoPaterno: REPRESENTANTE_LEGAL.apellidoPaterno,
              apellidoMaterno: REPRESENTANTE_LEGAL.apellidoMaterno,
            });
            this.tiendaCampoRepresentanteLegal();
          },
        });
    }
  }

  /**
   * Maneja la acción de aceptar en el modal de alerta.
   * Cierra el modal y reinicia el formulario del representante legal.
   */
  aceptar(): void {
    this.modalAlerta = false;
    this.representanteLegalForm.reset();
  }

  /**
   * Almacena los valores del formulario del representante legal en el store.
   */
  tiendaCampoRepresentanteLegal(): void {
    this.setValoresStore(
      this.representanteLegalForm,
      'nombreOrazonsocial',
      'setNombreOrazonsocial'
    );
    this.setValoresStore(
      this.representanteLegalForm,
      'apellidoPaterno',
      'setApellidoPaterno'
    );
    this.setValoresStore(
      this.representanteLegalForm,
      'apellidoMaterno',
      'setApellidoMaterno'
    );
    this.setValoresStore(this.representanteLegalForm, 'rfc', 'setRfc');
  }

  /**
   * Establece los valores en el store de tramite260601.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260601Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
