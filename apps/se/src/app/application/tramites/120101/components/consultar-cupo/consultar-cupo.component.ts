import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModeloDeFormaDinamica, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACION_PARA_ENCABEZADO_DE_TABLA } from '../../../120201/constantes/cupos-constantes.enum';
import { CONSULTAR_CUPO } from '../../constantes/solicitud-de-registro-tpl.enum';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';
/**
 * @component ConsultarCupoComponent
 * @description
 * Este componente representa la sección "Consultar Cupo" del trámite 120101. 
 * Permite al usuario consultar información relacionada con los cupos mediante un formulario dinámico y una tabla interactiva.
 * 
 * Funcionalidad:
 * - Renderiza dinámicamente los campos del formulario basados en la configuración definida en `CONSULTAR_CUPO`.
 * - Muestra una tabla dinámica con los datos obtenidos de los servicios relacionados con los cupos.
 * - Maneja la validación y el estado del formulario utilizando formularios reactivos de Angular.
 * - Interactúa con el estado global del trámite a través de `Tramite120101Store` y `Tramite120101Query`.
 * - Permite registrar y actualizar los valores del formulario dinámico en el servicio correspondiente.
 * - Proporciona métodos para buscar datos, manejar eventos de clic en filas de la tabla y gestionar cambios en los valores del formulario.
 * 
 * @selector consultar-cupo
 * @imports CommonModule, ReactiveFormsModule, FormasDinamicasComponent, TablaDinamicaComponent
 * @templateUrl ./consultar-cupo.component.html
 * @styleUrl ./consultar-cupo.component.scss
 */
@Component({
  selector: 'consultar-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './consultar-cupo.component.html',
  styleUrl: './consultar-cupo.component.scss',
})

export class ConsultarCupoComponent implements OnInit, OnDestroy {

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
 * @property emitirFilaClicControlador
 * @description
 * Emisor de eventos que se utiliza para manejar el clic en una fila de la tabla dinámica.
 * 
 * Funcionalidad:
 * - Emite un evento con los datos de la fila seleccionada en la tabla.
 * - Permite que el componente padre reciba y procese los datos de la fila seleccionada.
 * 
 * @type {EventEmitter<InstrumentoCupoTPLForm>}
 * 
 * @example
 * this.emitirFilaClicControlador.emit(filaSeleccionada);
 * // Emite los datos de la fila seleccionada al componente padre.
 */
  @Output() public emitirFilaClicControlador =
    new EventEmitter<InstrumentoCupoTPLForm>();

  /**
   * compo doc
   * @property consultarCupoFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `CONSULTAR_CUPO`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public consultarCupoFormData: ModeloDeFormaDinamica[] = CONSULTAR_CUPO;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof ConsultarCupoComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * Estado de la solicitud de la sección 120101.
   * @type {SolicitudDeRegistroTpl120101State}
   * @memberof BienFinalComponent
   */
  public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;

  /** Subject para destruir el componente */
  public destroy$ = new Subject<void>();

  /**
   * Configuración para el encabezado de la tabla.
   */
  public configuracionParaEncabezadoDeTabla = CONFIGURACION_PARA_ENCABEZADO_DE_TABLA;

  /**
   * Configuración de la tabla dinámica.
   */
  public cuerpoTabla: InstrumentoCupoTPLForm[] = [];

  /**
 * @constructor
 * @description
 * Constructor del componente `ConsultarCupoComponent`. Inicializa las dependencias necesarias para el funcionamiento del componente.
 * 
 * Funcionalidad:
 * - `SolicitudDeRegistroTplService`: Servicio para interactuar con los datos relacionados con la solicitud de registro.
 * - `Tramite120101Store`: Store para gestionar el estado global del trámite 120101.
 * - `Tramite120101Query`: Query para consultar el estado global del trámite 120101.
 * - `ServicioDeFormularioService`: Servicio para registrar y gestionar formularios dinámicos.
 * 
 * @param {SolicitudDeRegistroTplService} solicitudDeRegistroTplService - Servicio para manejar datos de la solicitud de registro.
 * @param {Tramite120101Store} tramite120101Store - Store para gestionar el estado global del trámite.
 * @param {Tramite120101Query} tramite120101Query - Query para consultar el estado global del trámite.
 * @param {ServicioDeFormularioService} servicioDeFormularioService - Servicio para gestionar formularios dinámicos.
 */
  constructor(
    private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
    private tramite120101Store: Tramite120101Store,
    private tramite120101Query: Tramite120101Query,
    private servicioDeFormularioService: ServicioDeFormularioService,
  ) {
    //
  }

  /**
 * @method ngOnInit
 * @description
 * Este método se ejecuta al inicializar el componente `ConsultarCupoComponent`. 
 * Realiza las siguientes acciones:
 * 
 * Funcionalidad:
 * - Se suscribe al observable `selectSolicitudDeRegistroTpl$` del servicio `Tramite120101Query` 
 *   para obtener el estado de la sección "Solicitud de Registro".
 * - Verifica si el estado contiene la propiedad `cuerpoTabla` y agrega los elementos únicos a la tabla dinámica.
 * - Registra el formulario dinámico `consultarCupoForm` en el servicio `ServicioDeFormularioService`.
 * - Llama a los métodos `obtenerClasificacionRegimenDatos` y `obtenerPaisDatos` para cargar datos adicionales.
 * 
 * @example
 * // Al inicializar el componente:
 * this.ngOnInit();
 * // El estado de la solicitud se actualiza, el formulario se registra y los datos adicionales se cargan.
 */
  ngOnInit(): void {
    this.tramite120101Query.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;

          if (
            this.solicitudDeRegistroState &&
            typeof this.solicitudDeRegistroState === 'object' &&
            this.solicitudDeRegistroState !== null &&
            'cuerpoTabla' in this.solicitudDeRegistroState
          ) {
            const DATOS = this.solicitudDeRegistroState['cuerpoTabla'] as InstrumentoCupoTPLForm[] || [];
            DATOS.forEach((item: InstrumentoCupoTPLForm) => {
              const IS_ALREADY_ADDED = this.cuerpoTabla.some((i: InstrumentoCupoTPLForm) => i.id === (item.id ?? -1));
              if (!IS_ALREADY_ADDED) {
                this.cuerpoTabla.push(item);
              }
            });
          }
        })
      )
      .subscribe();
    this.servicioDeFormularioService.registerForm('consultarCupoForm', this.ninoFormGroup);
    this.obtenerClasificacionRegimenDatos();
    this.obtenerPaisDatos();
    if (this.consultaState.readonly) {
      this.mostrarCampoDeDescripcion();
      this.obtenerTablaDatos();
    }
  }

  /**
 * @method obtenerClasificacionRegimenDatos
 * @description
 * Este método obtiene los datos de clasificación de régimen desde el servicio `SolicitudDeRegistroTplService` 
 * y los asigna al campo correspondiente en el formulario dinámico.
 * 
 * Funcionalidad:
 * - Llama al método `getClasificacionRegimenData` del servicio para obtener los datos.
 * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye.
 * - Busca el campo `clasificacion` en la configuración del formulario dinámico (`consultarCupoFormData`).
 * - Si el campo existe y no tiene opciones asignadas, asigna las opciones obtenidas del servicio.
 * 
 * @example
 * this.obtenerClasificacionRegimenDatos();
 * // El campo `clasificacion` se actualiza con las opciones obtenidas del servicio.
 */
  public obtenerClasificacionRegimenDatos(): void {
    this.solicitudDeRegistroTplService
      .getClasificacionRegimenData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const CLASIFICACION_FIELD = this.consultarCupoFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'clasificacion'
        ) as ModeloDeFormaDinamica;
        if (CLASIFICACION_FIELD && !CLASIFICACION_FIELD.opciones) {
          CLASIFICACION_FIELD.opciones = data.map(
            (item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            })
          );
        }
      });
  }

  /**
 * @method obtenerPaisDatos
 * @description
 * Este método obtiene los datos de los países desde el servicio `SolicitudDeRegistroTplService` 
 * y los asigna al campo correspondiente en el formulario dinámico.
 * 
 * Funcionalidad:
 * - Llama al método `getPaisData` del servicio para obtener los datos.
 * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye.
 * - Busca el campo `pais` en la configuración del formulario dinámico (`consultarCupoFormData`).
 * - Si el campo existe y no tiene opciones asignadas, asigna las opciones obtenidas del servicio.
 * 
 * @example
 * this.obtenerPaisDatos();
 * // El campo `pais` se actualiza con las opciones obtenidas del servicio.
 */
  public obtenerPaisDatos(): void {
    this.solicitudDeRegistroTplService
      .getPaisData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const PAIS_FIELD = this.consultarCupoFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'pais'
        ) as ModeloDeFormaDinamica;
        if (PAIS_FIELD && !PAIS_FIELD.opciones) {
          PAIS_FIELD.opciones = data.map(
            (item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            })
          );
        }
      });
  }

  /**
   * Busca los datos de la tabla.
   * @description Este método se ejecuta cuando se hace clic en el botón de búsqueda.
   * @returns {void}
   */
  buscar(): void {
    if (this.ninoFormGroup.valid) {
      this.mostrarCampoDeDescripcion();
      this.obtenerTablaDatos();
    }
  }

  obtenerTablaDatos(): void {
    this.solicitudDeRegistroTplService
        .obtenerTablaDatos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
          const TABLA_DATOS = resp.data;
          const NUEVO_CUERPO_TABLA = TABLA_DATOS.map(
            (item: InstrumentoCupoTPLForm) => ({
              id: 1,
              cveTratado: item.cveTratado,
              cveRegimenClasificacion: item.cveRegimenClasificacion,
              cvePaisDestino: item.cvePaisDestino,
              fraccionArancelaria: item.fraccionArancelaria,
              categoriaTextilDescripcion: item.categoriaTextilDescripcion,
              productoDescripcion: item.productoDescripcion,
              subProductoClasificacion: item.subProductoClasificacion,
              fechaInicioVigencia: item.fechaInicioVigencia,
              fechaFinVigencia: item.fechaFinVigencia,
              montoDisponible: item.montoDisponible,
              categoriaTextil: item.categoriaTextil,
              asignacionMecanismo: item.asignacionMecanismo,
              unidad: item.unidad,
              conversionFactor: item.conversionFactor,
            })
          );
          this.cuerpoTabla = NUEVO_CUERPO_TABLA;
          this.tramite120101Store.setDynamicFieldValue('cuerpoTabla', this.cuerpoTabla);
          if (this.consultaState.readonly) {
            this.controladorDeClicsArchivo(NUEVO_CUERPO_TABLA?.[0]);
          }
        });
  }

  /**
 * @method mostrarCampoDeDescripcion
 * @description
 * Este método verifica si el campo `fraccionArancelaria` tiene un valor en el formulario dinámico.
 * Si el valor existe, actualiza la configuración del campo `descripcion` para que sea visible en el formulario.
 * 
 * Funcionalidad:
 * - Obtiene el valor del campo `fraccionArancelaria` del grupo de formularios `ninoFormGroup`.
 * - Busca el índice del campo `descripcion` en la configuración del formulario dinámico (`consultarCupoFormData`).
 * - Si el campo `descripcion` existe, actualiza su propiedad `mostrar` a `true` para hacerlo visible.
 * 
 * @example
 * this.mostrarCampoDeDescripcion();
 * // Si `fraccionArancelaria` tiene un valor, el campo `descripcion` se muestra en el formulario.
 */
  public mostrarCampoDeDescripcion(): void {
    if (this.ninoFormGroup.get('fraccionArancelaria')?.value) {
      const INDEX = this.consultarCupoFormData.findIndex(item => item.campo === 'descripcion');
      if (INDEX !== -1) {
        this.consultarCupoFormData[INDEX] = { ...this.consultarCupoFormData[INDEX], mostrar: true };
      }
    }
  }

  /**
 * @method controladorDeClicsArchivo
 * @description
 * Este método maneja el evento de clic en una fila de la tabla dinámica.
 * Cuando se selecciona una fila, emite el evento con los datos de la fila seleccionada.
 * 
 * Funcionalidad:
 * - Verifica si el evento contiene datos válidos.
 * - Emite el evento utilizando el `EventEmitter` `emitirFilaClicControlador`.
 * 
 * @param {InstrumentoCupoTPLForm} event - Objeto que representa los datos de la fila seleccionada.
 * 
 * @example
 * this.controladorDeClicsArchivo(filaSeleccionada);
 * // Emite el evento con los datos de la fila seleccionada.
 */
  public controladorDeClicsArchivo(event: InstrumentoCupoTPLForm): void {
    if (event) {
      this.emitirFilaClicControlador.emit(event);
    }
  }

  /**
  * compo doc
  * @method establecerCambioDeValor
  * @description
  * Este método se utiliza para manejar los cambios en los valores de un formulario dinámico.
  * Recibe un evento que contiene el nombre del campo y su nuevo valor, y actualiza el estado
  * dinámico del formulario en el store correspondiente.
  * 
  * @param event - Un objeto que contiene el campo que ha cambiado y su nuevo valor.
  * El objeto tiene la estructura: `{ campo: string; valor: any }`.
  * 
  * @example
  * establecerCambioDeValor({ campo: 'nombre', valor: 'Juan' });
  * // Actualiza el campo 'nombre' con el valor 'Juan' en el store dinámico.
  */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite120101Store.setDynamicFieldValue(event.campo, event.valor);
      this.servicioDeFormularioService.setFormValue('consultarCupoForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
  * @method ngOnDestroy
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones 
  * activas y evitar fugas de memoria en la aplicación.
  * 
  * Funcionalidad:
  * - Notifica a través del `Subject` `destroy$` que el componente será destruido.
  * - Completa el `Subject` para liberar los recursos asociados.
  * 
  * @example
  * ngOnDestroy(): void {
  *   this.destroy$.next();
  *   this.destroy$.complete();
  * }
  */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
