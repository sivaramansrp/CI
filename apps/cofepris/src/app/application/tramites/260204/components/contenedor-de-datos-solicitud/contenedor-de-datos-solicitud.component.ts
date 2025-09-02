import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeTablaSeleccionados, DatosSolicitudFormState, TablaMercanciasDatos, TablaOpcionConfig, TablaScianConfig, TablaSeleccion } from '../../../../shared/models/datos-solicitud.model';
import { OPCION_TABLA, PRODUCTO_TABLA, SCIAN_TABLA } from '../../../../shared/constantes/datos-solicitud.enum';
import { Tramite260204State,Tramite260204Store } from '../../estados/stores/tramite260204Store.store';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { Subject } from 'rxjs';
import { Tramite260204Query } from '../../estados/queries/tramite260204Query.query';

/**
 * Decorador de componente de Angular que define las propiedades y configuraciones del componente `ContenedorDeDatosSolicitudComponent`.
 * 
 * Este componente es independiente (`standalone`) y utiliza los módulos `CommonModule` y `DatosDeLaSolicitudComponent` como dependencias.
 * 
 * @selector `app-contenedor-de-datos-solicitud` - Selector utilizado para instanciar este componente en una plantilla HTML.
 * @standalone `true` - Indica que este componente es independiente y no requiere un módulo específico para ser utilizado.
 * @imports `[CommonModule, DatosDeLaSolicitudComponent]` - Lista de módulos y componentes importados que se utilizan dentro de este componente.
 * @templateUrl `./contenedor-de-datos-solicitud.component.html` - Ruta del archivo HTML que define la estructura visual del componente.
 * @styleUrl `./contenedor-de-datos-solicitud.component.scss` - Ruta del archivo SCSS que contiene los estilos específicos del componente.
 */
@Component({
  selector: 'app-contenedor-de-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaSolicitudComponent],
  templateUrl: './contenedor-de-datos-solicitud.component.html',
  styleUrl: './contenedor-de-datos-solicitud.component.scss',
})
export class ContenedorDeDatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Sujeto utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
   * Este observable se completa cuando el componente se destruye.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Representa el estado actual del trámite 260204.
   * 
   * @type {Tramite260204State}
   * @public
   */
  public tramiteState!: Tramite260204State;

  /**
   * Configuración de opciones para la tabla.
   * 
   * @property {undefined} tipoSeleccionTabla - Define el tipo de selección en la tabla. Actualmente no está definido.
   * @property {typeof OPCION_TABLA} configuracionTabla - Configuración predeterminada de la tabla basada en la constante `OPCION_TABLA`.
   * @property {TablaOpcionConfig[]} datos - Arreglo que contiene los datos de configuración de la tabla.
   */
  public opcionConfig = {
    tipoSeleccionTabla: undefined,
    configuracionTabla: OPCION_TABLA,
    datos: [] as TablaOpcionConfig[],
  }
  /**
   * Configuración para la tabla SCIAN en el componente.
   * 
   * - `tipoSeleccionTabla`: Define el tipo de selección que se puede realizar en la tabla. 
   *   En este caso, se utiliza una selección de tipo CHECKBOX.
   * - `configuracionTabla`: Especifica la configuración de la tabla SCIAN, 
   *   que se define en la constante `SCIAN_TABLA`.
   * - `datos`: Contiene un arreglo de configuraciones de tipo `TablaScianConfig`. 
   *   Inicialmente, este arreglo está vacío.
   */
  public scianConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: SCIAN_TABLA,
    datos: [] as TablaScianConfig[],
  }
  /**
   * Configuración para la tabla de mercancías.
   * 
   * @property {TablaSeleccion} tipoSeleccionTabla - Define el tipo de selección que se puede realizar en la tabla (en este caso, CHECKBOX).
   * @property {any} configuracionTabla - Configuración específica de la tabla, basada en la constante PRODUCTO_TABLA.
   * @property {TablaMercanciasDatos[]} datos - Arreglo que contiene los datos de la tabla, inicialmente vacío.
   */
  public tablaMercanciasConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: PRODUCTO_TABLA,
    datos: [] as TablaMercanciasDatos[],
  }
  /**
   * Configuración de la tabla SCIAN.
   * 
   * Esta propiedad almacena un arreglo de configuraciones para la tabla SCIAN,
   * que se utiliza para gestionar y mostrar datos relacionados con el catálogo
   * del Sistema de Clasificación Industrial de América del Norte (SCIAN).
   */
  public scianConfigDatos: TablaScianConfig[] = [];
  /**
   * Configuración de datos para la tabla de mercancías.
   * 
   * Esta propiedad almacena un arreglo de objetos del tipo `TablaMercanciasDatos`,
   * que representan los datos necesarios para configurar y mostrar la tabla
   * de mercancías en el componente.
   */
  public tablaMercanciasConfigDatos: TablaMercanciasDatos[] = [];
  /**
   * Arreglo que almacena la configuración de opciones de la tabla.
   * 
   * Este arreglo se utiliza para gestionar las opciones seleccionadas
   * en la tabla dentro del componente. Cada elemento del arreglo es 
   * de tipo `TablaOpcionConfig`, que define la estructura de las opciones.
   */
  public seleccionadoopcionDatos: TablaOpcionConfig[] = [];
  /**
   * Arreglo que almacena la configuración de datos seleccionados de la tabla SCIAN.
   * 
   * Este arreglo se utiliza para gestionar y almacenar los datos seleccionados
   * relacionados con la tabla SCIAN en el componente.
   */
  public seleccionadoScianDatos: TablaScianConfig[] = [];

/**
   * que indica si el formulario está en modo solo lectura.
   * Cuando es `true`, el formulario no permite modificaciones por parte del usuario.
   *
   * @type {boolean}
   */
  esFormularioSoloLectura!: boolean;
  /**
   * Arreglo que almacena los datos seleccionados de la tabla de mercancías.
   * 
   * Este arreglo contiene objetos de tipo `TablaMercanciasDatos` que representan
   * los elementos seleccionados en la tabla correspondiente. Se utiliza para 
   * gestionar y manipular los datos seleccionados en el contexto de la solicitud.
   */
  public seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[] = [];

  /**
  * Arreglo que almacena los elementos requeridos para la solicitud.
  */
  public elementosRequeridos = ['rfcSanitario', 'denominacionRazon', 'correoElectronico'];
  /**
   * Identificador del procedimiento.
   */
  public procedureId!: number;
  /**
   * Constructor de la clase ContenedorDeDatosSolicitudComponent.
   * 
   * Este constructor inicializa las dependencias necesarias para el componente.
   * 
   * @param tramite260204Query - Servicio para realizar consultas relacionadas con el trámite 260204.
   * @param tramite260204Store - Almacén para gestionar el estado del trámite 260204.
   * @param consultaQuery - Servicio para realizar consultas adicionales relacionadas con la aplicación.
   */
  constructor(public tramite260204Query: Tramite260204Query,
    public tramite260204Store: Tramite260204Store,
    public consultaQuery: ConsultaioQuery
  ) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * 
   * 1. Suscribe al estado del trámite (`tramite260204Query.selectTramiteState$`) y actualiza las configuraciones
   *    de datos del componente (`opcionConfig`, `scianConfig`, `tablaMercanciasConfig`) basándose en el estado
   *    del trámite recibido. La suscripción se completa automáticamente cuando el observable `destroyNotifier$` emite un valor.
   * 
   * 2. Configura la propiedad `esFormularioSoloLectura` como un observable que determina si el formulario debe
   *    estar en modo solo lectura. Esto se basa en el estado de consulta (`consultaQuery.selectConsultaioState$`),
   *    verificando si el trámite no está en modo creación (`create`) y si el `procedureId` corresponde a '260204'.
   *    En caso de cumplir estas condiciones, se asigna el valor de `readonly` del estado de consulta; de lo contrario,
   *    se asigna `false`.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.tramite260204Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          this.opcionConfig.datos = this.tramiteState.opcionConfigDatos;
          this.scianConfig.datos = this.tramiteState.scianConfigDatos;
          this.tablaMercanciasConfig.datos = this.tramiteState.tablaMercanciasConfigDatos;
        })
      ).subscribe();

  }

  /**
   * Maneja el evento cuando se selecciona una opción en la tabla.
   * 
   * @param event - Un arreglo de configuraciones de opciones de la tabla (`TablaOpcionConfig[]`) 
   *                que representa las opciones seleccionadas.
   * 
   * Actualiza la configuración de datos en el store `tramite260204Store` 
   * con las opciones seleccionadas.
   */
  opcionSeleccionado(event: TablaOpcionConfig[]): void {
    this.tramite260204Store.updateOpcionConfigDatos(event);
  }

  /**
   * Maneja el evento cuando se selecciona un elemento en la tabla SCIAN.
   * 
   * @param event - Arreglo de configuraciones seleccionadas de la tabla SCIAN.
   * 
   * Este método actualiza los datos de configuración SCIAN en el estado del trámite 260204
   * utilizando el evento proporcionado.
   */
  scianSeleccionado(event: TablaScianConfig[]): void {
    this.tramite260204Store.updateScianConfigDatos(event);
  }

  /**
   * Maneja el evento de selección de mercancías en la tabla.
   * 
   * @param event - Arreglo de objetos de tipo `TablaMercanciasDatos` que contiene 
   *                los datos seleccionados en la tabla de mercancías.
   */
  mercanciasSeleccionado(event: TablaMercanciasDatos[]): void {
    this.tramite260204Store.updateTablaMercanciasConfigDatos(event);
  }


  /**
   * Actualiza el estado del formulario de datos de la solicitud en el store.
   *
   * @param event - El nuevo estado del formulario de datos de la solicitud de tipo `DatosSolicitudFormState`.
   */
  datasolicituActualizar(event: DatosSolicitudFormState): void {
    this.tramite260204Store.updateDatosSolicitudFormState(event);
  }

  /**
   * Actualiza el estado de la tienda `tramite260204Store` con los datos seleccionados
   * provenientes del evento de la tabla.
   *
   * @param event - Objeto que contiene las opciones seleccionadas, los datos SCIAN seleccionados
   * y las mercancías seleccionadas de la tabla.
   */
  datosDeTablaSeleccionados(event: DatosDeTablaSeleccionados): void {
    this.tramite260204Store.update((state) => ({
      ...state,
      seleccionadoopcionDatos: event.opcionSeleccionados,
      seleccionadoScianDatos: event.scianSeleccionados,
      seleccionadoTablaMercanciasDatos: event.mercanciasSeleccionados,
      opcionesColapsableState: event.opcionesColapsableState
    }))
  }

  /**
 * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
 *
 * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
 * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
 *
 * @returns {void} No retorna ningún valor.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
