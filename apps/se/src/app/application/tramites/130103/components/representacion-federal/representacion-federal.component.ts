import {
  Catalogo,
  ModeloDeFormaDinamica,
} from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ImportacionDefinitiva130103State,
  Tramite130103Store,
} from '../../../../estados/tramites/tramite130103.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { REPRESENTACION_FEDERAL } from '../../constantes/importacion-definitiva.enum';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import dropDown from '@libs/shared/theme/assets/json/104/selector-104.json';
import representacion from '@libs/shared/theme/assets/json/130119/representacion-federal.json';

/**
 * compo doc
 * @component
 * @selector app-representacion-federal
 * @description
 * Este componente es responsable de gestionar y renderizar los datos relacionados con
 * la representación federal en el trámite de importación definitiva. Utiliza un formulario dinámico
 * para capturar y validar la información de la entidad federativa y la representación federal.
 *
 * Funcionalidades principales:
 * - Renderiza dinámicamente los campos del formulario utilizando la configuración definida en `REPRESENTACION_FEDERAL`.
 * - Configura las opciones dinámicas para los campos "entidad" y "representación federal" utilizando datos externos.
 * - Maneja los cambios en los valores de los campos del formulario y actualiza el estado dinámico del trámite.
 *
 * Componentes importados:
 * - `FormasDinamicasComponent`: Componente para renderizar formularios dinámicos.
 *
 * @templateUrl ./representacion-federal.component.html
 * @styleUrl ./representacion-federal.component.scss
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, ReactiveFormsModule],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {
  
  /**
    * @property consultaState
    * @description
    * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
    */
    @Input() consultaState!: ConsultaioState;

  /**
   * compo doc
   * @property representacionFormdata
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `REPRESENTACION_FEDERAL`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   *
   * @example
   * const campo = this.representacionFormdata.find((datos) => datos.campo === 'regimen');
   * console.log(campo.label_nombre); // Muestra: "Régimen al que se destinará la mercancía"
   */
  public representacionFormdata = REPRESENTACION_FEDERAL;
  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentacionFederalComponent
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
   * Lista de bloques obtenidos del archivo JSON.
   */
  public entidad: Catalogo[] = dropDown?.entidadFederativa ?? [];

  /**
   * Lista de bloques obtenidos del archivo JSON.
   */
  public representacion: Catalogo[] = representacion;

  /**
   * Estado de la solicitud de la sección 301.
   * @type {ImportacionDefinitiva130103State}
   * @memberof DatosDelTramiteRealizerComponent
   */
  public importacionstate!: ImportacionDefinitiva130103State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * compo doc
   * @constructor
   * @param {tramite130103Store} tramite130103Store
   * @param {tramite130103Query} tramite130103Query
   *
   * @description
   * Este constructor inicializa el componente e inyecta el servicio `ImportacionDefinitivaService`,
   * que es necesario para realizar solicitudes y obtener datos dinámicos que se utilizan en el formulario.
   */
  constructor(
    private tramite130103Store: Tramite130103Store,
    private tramite130103Query: Tramite130103Query
  ) {
    //
  }

  /**
   * compo doc
   * @method ngOnInit
   * @description
   * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente
   * después de que Angular haya inicializado todas las propiedades vinculadas al componente.
   * En este caso, se utiliza para suscribirse al estado de importación y configurar las opciones
   * dinámicas para los campos "entidad" y "representación federal".
   *
   * Funcionalidad:
   * - Escucha los cambios en el estado de importación a través de `selectImportacion$`.
   * - Actualiza la propiedad `importacionstate` con el estado actual de la importación.
   * - Configura las opciones dinámicas para los campos "entidad" y "representación federal"
   *   utilizando los datos proporcionados por las propiedades `entidad` y `representacion`.
   *
   * @example
   * ngOnInit(): void {
   *   this.tramite130103Query.selectImportacion$
   *     .pipe(
   *       takeUntil(this.destroyNotifier$),
   *       map((seccionState) => {
   *         this.importacionstate = seccionState;
   *       })
   *     )
   *     .subscribe();
   *
   *   const ENTIDAD_FIELD = this.representacionFormdata.find((datos) => datos.campo === 'entidad');
   *   if (ENTIDAD_FIELD && !ENTIDAD_FIELD.opciones) {
   *     ENTIDAD_FIELD.opciones = this.entidad.map((item) => ({
   *       descripcion: item.descripcion,
   *       id: item.id,
   *     }));
   *   }
   *
   *   const REPRESENTACION_FIELD = this.representacionFormdata.find((datos) => datos.campo === 'reprsentation_federal');
   *   if (REPRESENTACION_FIELD && !REPRESENTACION_FIELD.opciones) {
   *     REPRESENTACION_FIELD.opciones = this.representacion.map((item) => ({
   *       descripcion: item.descripcion,
   *       id: item.id,
   *     }));
   *   }
   * }
   */
  ngOnInit(): void {
    this.tramite130103Query.selectImportacion$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.importacionstate = seccionState;
        })
      )
      .subscribe();

    this.obtenerEntidad();
    this.obtenerRepresentacion();
  }

  /**
   * @method obtenerEntidad
   * @description
   * Este método configura dinámicamente las opciones para el campo "entidad" en el formulario.
   * Busca el campo correspondiente en la configuración del formulario (`representacionFormdata`)
   * y asigna las opciones obtenidas de la propiedad `entidad` si estas no han sido configuradas previamente.
   *
   * Funcionalidad:
   * - Busca el campo "entidad" en la configuración del formulario.
   * - Verifica si el campo no tiene opciones configuradas y si la propiedad `entidad` contiene datos.
   * - Asigna las opciones al campo "entidad" utilizando los datos de la propiedad `entidad`.
   *
   * @example
   * this.obtenerEntidad();
   * // Configura las opciones dinámicas para el campo "entidad" en el formulario.
   */
  public obtenerEntidad(): void {
    const ENTIDAD_FIELD = this.representacionFormdata.find(
      (datos: ModeloDeFormaDinamica) => datos.campo === 'entidad'
    ) as ModeloDeFormaDinamica;
    if (ENTIDAD_FIELD) {
      if (!ENTIDAD_FIELD.opciones && this.entidad) {
        ENTIDAD_FIELD.opciones = this.entidad.map(
          (item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          })
        );
      }
    }
  }

  /**
   * @method obtenerRepresentacion
   * @description
   * Este método configura dinámicamente las opciones para el campo "representación federal" en el formulario.
   * Busca el campo correspondiente en la configuración del formulario (`representacionFormdata`)
   * y asigna las opciones obtenidas de la propiedad `representacion` si estas no han sido configuradas previamente.
   *
   * Funcionalidad:
   * - Busca el campo "representación federal" en la configuración del formulario.
   * - Verifica si el campo no tiene opciones configuradas y si la propiedad `representacion` contiene datos.
   * - Asigna las opciones al campo "representación federal" utilizando los datos de la propiedad `representacion`.
   *
   * @example
   * this.obtenerRepresentacion();
   * // Configura las opciones dinámicas para el campo "representación federal" en el formulario.
   */
  public obtenerRepresentacion(): void {
    const REPRESENTACION_FIELD = this.representacionFormdata.find(
      (datos: ModeloDeFormaDinamica) => datos.campo === 'reprsentation_federal'
    ) as ModeloDeFormaDinamica;
    if (REPRESENTACION_FIELD) {
      if (!REPRESENTACION_FIELD.opciones && this.representacion) {
        REPRESENTACION_FIELD.opciones = this.representacion.map(
          (item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          })
        );
      }
    }
  }

  /**
   * compo doc
   * @method establecerCambioDeValor
   * @description
   * Este método se utiliza para manejar los cambios en los valores de los campos del formulario dinámico.
   * Si el valor del evento es un objeto que contiene un identificador (`id`), actualiza el estado dinámico
   * del campo correspondiente en el store con dicho identificador. Si el valor no es un objeto, actualiza
   * el estado dinámico del campo con el valor proporcionado.
   *
   * Funcionalidad:
   * - Verifica si el valor del evento contiene un identificador (`id`) y actualiza el estado dinámico.
   * - Si el valor no es un objeto, actualiza el estado dinámico con el valor directamente.
   *
   * @param {Object} event - Objeto que contiene el campo modificado y su nuevo valor.
   * @param {string} event.campo - Nombre del campo modificado.
   * @param {string} event.valor - Nuevo valor del campo, que puede ser un objeto con un identificador o un valor directo.
   *
   * @example
   * this.establecerCambioDeValor({ campo: 'entidad', valor: { id: 1, descripcion: 'Ciudad de México' } });
   * // Actualiza el estado dinámico del campo "entidad" con el identificador 1.
   *
   * this.establecerCambioDeValor({ campo: 'observaciones', valor: 'Sin observaciones' });
   * // Actualiza el estado dinámico del campo "observaciones" con el valor "Sin observaciones".
   */
  establecerCambioDeValor(event: { campo: string; valor: string }): void {
    if (event) {
      this.tramite130103Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /**
   * compo doc
   * @method ngOnDestroy
   * @description
   * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente
   * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones
   * activas y evitar fugas de memoria en la aplicación.
   *
   * Funcionalidad:
   * - Notifica a través del `Subject` `destroyNotifier$` que el componente será destruido.
   * - Completa el `Subject` para liberar los recursos asociados.
   *
   * @example
   * ngOnDestroy(): void {
   *   this.destroyNotifier$.next();
   *   this.destroyNotifier$.complete();
   * }
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
