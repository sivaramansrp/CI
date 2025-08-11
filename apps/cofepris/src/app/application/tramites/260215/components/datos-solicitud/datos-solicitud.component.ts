import {
  AL_DAR,
  AlertComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, TablaDinamicaComponent } from '@ng-mf/data-access-user';
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
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DomicilioComponent } from '../domicilio-establecimiento/domicilio-establecimiento.component';
import { ManifiestosComponent } from '../manifiestos-declaraciones/manifiestos-declaraciones.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { SolicitudModel } from '../../models/permiso-sanitario.model';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

/**
 * Componente responsable de gestionar y mostrar los datos principales del formulario,
 * incluyendo domicilio, manifiestos y representante legal.
 *
 * Este componente centraliza la gestión de los datos principales de la solicitud,
 * integrando subcomponentes para domicilio, manifiestos y representante legal.
 * Permite la visualización, edición y validación de los datos, así como la gestión
 * de notificaciones y pedimentos asociados al trámite.
 *
 * Funcionalidades principales:
 * - Manejo de formularios reactivos para los datos principales de la solicitud.
 * - Integración con servicios y store para la obtención y persistencia de datos.
 * - Soporte para modo solo lectura y actualización automática según el estado del trámite.
 * - Gestión de notificaciones y operaciones sobre pedimentos.
 * - Visualización de tablas dinámicas con la información relevante de la solicitud.
 *
 * Uso:
 * Este componente se utiliza dentro del flujo de captura de información de un trámite sanitario,
 * permitiendo al usuario ingresar, consultar y gestionar los datos principales requeridos.
 */
@Component({
  selector: 'app-datos-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    DomicilioComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent,
    TablaDinamicaComponent,
    NotificacionesComponent,
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosDeLaComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud.
   * Almacena el estado actual de la solicitud para el trámite 260215.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables y evitar fugas de memoria.
   * Se utiliza en combinación con takeUntil en las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  

    /**
   * Arreglo que almacena los datos de la solicitud.
   * Se utiliza para gestionar la información relacionada con las solicitudes en el componente.
   */
    solicitudData: SolicitudModel[] = []


   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 

   /**
     * @description
     * Objeto que representa una nueva notificación.
     * Se utiliza para mostrar mensajes de alerta o información al usuario.
     */
    public nuevaNotificacion!: Notificacion;

    /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

  /**
     * @description
     * Arreglo que almacena los pedimentos asociados al establecimiento.
     * Cada pedimento contiene información relevante para el trámite.
     */
  pedimentos: Array<Pedimento> = [];

  /**
   * Constructor del componente DatosDeLaComponent.
   *
   * @param fb Instancia de FormBuilder utilizada para la creación y gestión de formularios reactivos.
   * @param tramite260215Store Servicio para la gestión del estado relacionado con el trámite 260215.
   * @param tramite260215Query Servicio para consultar el estado del trámite 260215.
   * @param consultaioQuery Servicio para consultar el estado de la sección `Consultaio`.
   * @param serviciosPermisoSanitarioService Servicio para operaciones relacionadas con permisos sanitarios.
   *
   * Al inicializar el componente, se suscribe al estado de `Consultaio` para:
   * - Actualizar la propiedad `esFormularioSoloLectura` según el estado recibido.
   * - Llamar al método `inicializarEstadoFormulario()` para aplicar configuraciones adicionales.
   * - Cancelar automáticamente la suscripción cuando se emite un valor en `destroyNotifier$`, evitando fugas de memoria.
   */
  constructor(
    public readonly fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query,
    private consultaioQuery: ConsultaioQuery,
    private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService,
  ) {
     /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
  }

 /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   * Si el formulario está en modo solo lectura, lo deshabilita; de lo contrario, lo habilita.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.forma.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.forma.enable();
      }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Si está en modo solo lectura, carga los datos y deshabilita el formulario.
   * Si no, inicializa el formulario para edición y actualiza el estado de solicitudes.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();

       this.actualizarEstado();
    }  
  }

  /**
   * Actualiza el estado de las solicitudes obteniendo los datos desde el servicio correspondiente.
   * Asigna el resultado al arreglo `solicitudData`.
   */
  actualizarEstado(): void {
    this.serviciosPermisoSanitarioService.getSolicitudes()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.solicitudData = data
      });
    }

/**
 * Inicializa el formulario reactivo para la solicitud del trámite 260215.
 *
 * - Se suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
 *   y lo asigna a la propiedad `solicitudState`.
 * - Crea el formulario (`forma`) utilizando `FormBuilder`, estableciendo los valores iniciales
 *   de los campos a partir de `solicitudState` y deshabilitándolos.
 * - Los campos `denominacion` y `correo` son requeridos.
 *
 * @remarks
 * La suscripción al observable se gestiona con `takeUntil` para evitar fugas de memoria.
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
    this.forma = this.fb.group({
      rfcDel: [{ value: this.solicitudState?.rfcDel, disabled: true }],
      denominacion: [
        { value: this.solicitudState?.denominacion, disabled: true },
        [Validators.required, Validators.maxLength(100)]
      ],
      correo: [
        { value: this.solicitudState?.correo, disabled: true },
        [Validators.required, Validators.maxLength(320)]
      ],
    });
  }
  /**
   * Grupo de formularios principal.
   * Contiene los controles reactivos del formulario de datos de la solicitud.
   */
 public forma!: FormGroup;

  /**
   * Indica si la sección es colapsable.
   * Permite alternar la visualización de la sección principal del formulario.
   */
 public colapsable: boolean = true;

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   * Se utilizan para mostrar mensajes relevantes en el formulario.
   */
  public TEXTOS = AL_DAR;

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * Permite mostrar u ocultar la sección principal.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando se inicializa el componente.
   * Inicializa el estado del formulario y carga los datos necesarios.
   */
  ngOnInit(): void {
   this.inicializarEstadoFormulario()
  }

    /**
   * Método que se llama cuando se envía el formulario.
   * Se utiliza para establecer los valores en el store de DatosDomicilioLegal y mostrar una notificación.
   * @param i Índice del elemento para el cual se abre el modal de notificación.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Método que se llama cuando se elimina un pedimento.
   * @param borrar Indica si se debe eliminar el pedimento.
   * Si es verdadero, se elimina el pedimento en la posición `elementoParaEliminar` del arreglo `pedimentos`.
   */
  eliminarPedimento(borrar: boolean): void {
    this.alternarControlesDeFormulario();
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Método que se llama cuando se envía el formulario.
   * Alterna el estado habilitado/deshabilitado de los controles del formulario principal.
   */
  alternarControlesDeFormulario(): void {
    Object.keys(this.forma.controls).forEach((controlName) => {
      const CONTROL = this.forma.get(controlName);
      if (CONTROL?.disabled) {
        CONTROL.enable();
      }
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
    (
      this.tramite260215Store[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

    /**
   * Configuración de la tabla para mostrar las solicitudes.
   * Define las columnas con encabezados y claves para los datos relevantes de las solicitudes.
   * Incluye detalles como fecha de creación, mercancía, cantidad y proveedor.
   */
    configuracionTablaSolicitud: ConfiguracionColumna<SolicitudModel>[] = [
      { encabezado: 'Fecha Creación', clave: (item: SolicitudModel) => item.fechaCreacion, orden: 1 },
      { encabezado: 'Mercancía', clave: (item: SolicitudModel) => item.mercancía, orden: 2 },
      { encabezado: 'Cantidad', clave: (item: SolicitudModel) => item.cantidad, orden: 3 },
      { encabezado: 'Proveedor', clave: (item: SolicitudModel) => item.proveedor, orden: 4 }
    ];

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Libera recursos y cancela suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
