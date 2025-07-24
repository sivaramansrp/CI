/**
 * Componente principal para gestionar el formulario de representante legal.
 * 
 * Este componente permite la gestión del formulario de representante legal, incluyendo:
 * - Inicialización y validación de campos reactivos.
 * - Consulta de datos del representante legal a partir del RFC.
 * - Manejo de modo solo lectura.
 * - Sincronización con el store de estado de la solicitud.
 * - Utilización de servicios para obtener datos y validaciones.
 * 
 * Ciclo de vida:
 * - Al inicializar, configura el formulario y suscriptores.
 * - Al destruir, libera recursos y cancela suscripciones.
 * 
 * Métodos principales:
 * - esValido: Valida campos individuales.
 * - buscar: Consulta datos del representante legal.
 * - guardarDatosFormulario: Sincroniza datos y estado del formulario.
 * - inicializarFormulario: Configura el formulario reactivo.
 * - setValoresStore: Actualiza valores en el store.
 * - obtenerValor: Ejemplo de actualización de valores.
 * 
 * Propiedades:
 * - solicitudState: Estado actual de la solicitud.
 * - representante: FormGroup principal del formulario.
 * - esFormularioSoloLectura: Indica si el formulario es solo lectura.
 * 
 * Servicios y dependencias:
 * - FormBuilder, Tramite260215Store, Tramite260215Query, ConsultaioQuery,
 *   ValidacionesFormularioService, ServiciosPermisoSanitarioService
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud260215State,
  Tramite260215Store,
} from '../../estados/tramites/tramite260215.store';
import { Subject, map, takeUntil } from 'rxjs';
import { TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

/**
 * Componente principal para gestionar el formulario de representante legal.
 * 
 * Este componente permite la gestión del formulario de representante legal, incluyendo:
 * - Inicialización y validación de campos reactivos.
 * - Consulta de datos del representante legal a partir del RFC.
 * - Manejo de modo solo lectura.
 * - Sincronización con el store de estado de la solicitud.
 * - Utilización de servicios para obtener datos y validaciones.
 * 
 * Ciclo de vida:
 * - Al inicializar, configura el formulario y suscriptores.
 * - Al destruir, libera recursos y cancela suscripciones.
 * 
 * Métodos principales:
 * - esValido: Valida campos individuales.
 * - buscar: Consulta datos del representante legal.
 * - guardarDatosFormulario: Sincroniza datos y estado del formulario.
 * - inicializarFormulario: Configura el formulario reactivo.
 * - setValoresStore: Actualiza valores en el store.
 * - obtenerValor: Ejemplo de actualización de valores.
 * 
 * Propiedades:
 * - solicitudState: Estado actual de la solicitud.
 * - representante: FormGroup principal del formulario.
 * - esFormularioSoloLectura: Indica si el formulario es solo lectura.
 * 
 * Servicios y dependencias:
 * - FormBuilder, Tramite260215Store, Tramite260215Query, ConsultaioQuery,
 *   ValidacionesFormularioService, ServiciosPermisoSanitarioService
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.css',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud.
   * Contiene la información actual de la solicitud gestionada por el formulario.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables y evitar fugas de memoria.
   * Se utiliza en combinación con takeUntil en las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

    /**
   * Verifica si un campo específico del formulario es válido.
   * @param field Nombre del campo del formulario a validar.
   * @returns `true` si el campo es válido; de lo contrario, `false`.
   */
  
  esValido(field: string): boolean {
    return Boolean(this.validacionesService.isValid(this.representante, field));
  }

/**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
 public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa servicios, suscriptores y determina el modo de solo lectura.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param tramite260215Store Store para manipular el estado de la solicitud.
   * @param tramite260215Query Query para consultar el estado de la solicitud.
   * @param consultaioQuery Query para consultar el estado de consulta IO.
   * @param validacionesService Servicio para validaciones de formulario.
   * @param service Servicio para obtener datos del representante legal.
   */
  constructor(
    private readonly fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query,
    private consultaioQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService,
    private service: ServiciosPermisoSanitarioService,
    
  ) {
   this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }


  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     * Si el formulario está en modo solo lectura, lo deshabilita; de lo contrario, lo habilita.
     */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.representante.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.representante.enable();
    }
  }

   /**
   * Busca los datos del representante legal a partir del RFC proporcionado.
   * Si el campo RFC está vacío, marca todos los campos como tocados para mostrar errores de validación.
   * Si el RFC está presente, consulta el servicio para obtener los datos del representante y los asigna al formulario.
   */
  buscar(): void {
    if (!this.representante.get('rfc')?.value) {
      this.representante.get('rfc')?.markAllAsTouched();
    } else {
      this.service.ObtenerReprestantanteData()
      .pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe((response) => {
        this.representante.patchValue({
          nombre: response.nombre,
          primerApellido: response.apellidoPaterno,
          segundoApellido: response.apellidoMaterno
        });
      });
    }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Si está en modo solo lectura, carga los datos y deshabilita el formulario.
   * Si no, inicializa el formulario para edición.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario del representante legal.
   *
   * - Suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   *   y lo asigna a la propiedad `solicitudState`.
   * - Crea el formulario reactivo `representante` con los campos requeridos y sus validaciones.
   * - Los campos `nombre`, `apellidoPaterno` y `apellidoMaterno` se inicializan deshabilitados.
   *
   * @remarks
   * Este método debe llamarse durante la inicialización del componente para asegurar que el formulario
   * esté correctamente configurado con los datos actuales de la solicitud.
   */
  inicializarFormulario(): void {
      this.tramite260215Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.representante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [{ value: this.solicitudState?.nombre, disabled: true }, Validators.required],
      apellidoPaterno: [{ value: this.solicitudState?.apellidoPaterno, disabled: true }, Validators.required],
      apellidoMaterno: [{ value: this.solicitudState?.apellidoMaterno, disabled: true }],
    });
  }

  /**
   * Grupo de formularios principal.
   * Contiene los controles reactivos del formulario de representante legal.
   */
 public representante!: FormGroup;

  /**
   * Inicializa el componente y el estado del formulario.
   * Llama a la función para inicializar o cargar datos según el modo de solo lectura.
   */
  ngOnInit(): void {
 this.inicializarEstadoFormulario()
  }

  /**
   * Ejemplo de método para actualizar valores del formulario.
   * Asigna valores de ejemplo a los campos del representante legal.
   */
  obtenerValor(): void {
    this.representante.patchValue({
      nombre: 47875,
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260215Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260215Store[metodoNombre] as (value: string | number) => void)(
      VALOR
    );
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
