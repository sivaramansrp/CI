import { Catalogo, ConsultaioState } from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionDefinitiva130103State, Tramite130103Store } from '../../../../estados/tramites/tramite130103.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA } from '../../constantes/importacion-definitiva.enum';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
/**
  * compo doc
  * @component
  * @selector app-criterio-de-dictamen
  * @description
  * Este componente es responsable de gestionar y renderizar los datos relacionados con 
  * el criterio de dictamen en el trámite de importación definitiva. Utiliza un formulario dinámico 
  * basado en la configuración definida en `CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA`.
  * 
  * Funcionalidades principales:
  * - Obtiene las opciones dinámicas para los campos del formulario, como "Solicitud de mercancía", 
  *   a través de servicios.
  * - Renderiza dinámicamente los campos del formulario según la configuración.
  * - Permite la interacción con los datos obtenidos de los servicios para completar 
  *   la información del criterio de dictamen.
  * 
  * Propiedades:
  * - `criterioDeDictamenFormData`: Contiene la configuración de los campos del formulario.
  * 
  * Servicios utilizados:
  * - `ImportacionDefinitivaService`: Servicio para obtener datos relacionados con la solicitud de mercancía.
  * 
  * Ciclo de vida:
  * - `ngOnInit`: Llama a los métodos para obtener las opciones dinámicas de los campos del formulario.
  * - `ngOnDestroy`: Limpia las suscripciones activas para evitar fugas de memoria.
  * 
  * @templateUrl ./criterio-de-dictamen.component.html
  * @styleUrl ./criterio-de-dictamen.component.scss
  */
@Component({
  selector: 'app-criterio-de-dictamen',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './criterio-de-dictamen.component.html',
  styleUrl: './criterio-de-dictamen.component.scss',
})

export class CriterioDeDictamenComponent implements OnInit, OnDestroy {
  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;
      
  /**
  * compo doc
  * @property criterioDeDictamenFormData
  * @description
  * Esta propiedad contiene la configuración de los campos del formulario dinámico 
  * utilizado en el componente. La configuración está basada en la constante 
  * `CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA`, que define los detalles de cada campo, como su 
  * identificador, etiqueta, tipo de entrada, validadores, y más.
  * 
  * Se utiliza para renderizar dinámicamente los campos del formulario y para 
  * gestionar su comportamiento, como la validación y la interacción con los datos 
  * obtenidos de los servicios.
  */
  public criterioDeDictamenFormData = CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentanteLegalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
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
 * @property solicitudMercancia
 * @description
 * Arreglo privado que almacena las opciones de solicitudes de mercancía obtenidas desde el servicio
 * @type {Catalogo[]}
 */
  private solicitudMercancia: Catalogo[] = [];

  /**
  * compo doc
  * @constructor
  * @param {ImportacionDefinitivaService} importacionDefinitivaService - Servicio inyectado que se utiliza para obtener 
  * datos relacionados con la solicitud de mercancía en el trámite de importación definitiva.
  * @param {Tramite130103Store} tramite130103Store - Store inyectado para gestionar el estado dinámico del trámite.
  * @param {Tramite130103Query} tramite130103Query - Query inyectado para consultar el estado del trámite.
  * 
  * @description
  * Este constructor inicializa el componente e inyecta los servicios necesarios para gestionar 
  * los datos dinámicos del formulario y el estado del trámite. 
  */
  constructor(
    public importacionDefinitivaService: ImportacionDefinitivaService,
    private tramite130103Store: Tramite130103Store,
    private tramite130103Query: Tramite130103Query
  // eslint-disable-next-line no-empty-function
  ) {}

  /**
  * compo doc
  * @method ngOnInit
  * @description
  * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
  * después de que Angular haya inicializado todas las propiedades vinculadas al componente. 
  * En este caso, se utiliza para suscribirse al estado de importación y obtener las opciones 
  * dinámicas para el campo "Solicitud de mercancía" del formulario.
  * 
  * Funcionalidad:
  * - Escucha los cambios en el estado de importación a través de `selectImportacion$`.
  * - Actualiza la propiedad `importacionstate` con el estado actual de la importación.
  * - Llama al método `obtenerSolictudMercancia` para cargar las opciones dinámicas del formulario.
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
  *   this.obtenerSolictudMercancia();
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
    this.obtenerSolictudMercancia();
  }

    /**
  * compo doc
  * @method obtenerSolictudMercancia
  * @description
  * Este método se encarga de obtener las opciones disponibles para el campo "Solicitud de mercancía" 
  * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
  * para obtener los datos relacionados con las solicitudes de mercancía.
  * 
  * Funcionalidad:
  * - Realiza una solicitud al servicio para obtener las solicitudes de mercancía.
  * - Busca el campo "Solicitud de mercancía" en la configuración del formulario.
  * - Asigna las opciones obtenidas al campo "Solicitud de mercancía" si aún no están definidas.
  * 
  * @example
  * this.obtenerSolictudMercancia();
  * // Actualiza las opciones del campo "Solicitud de mercancía" en el formulario dinámico.
  */
  public obtenerSolictudMercancia(): void {
    this.importacionDefinitivaService.getSolicitudMercancia()
    .pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((resp) => {
      this.solicitudMercancia=resp;
      const SOLICITUD_MERCANCIA_FIELD = this.criterioDeDictamenFormData.find((datos: ModeloDeFormaDinamica) => datos.campo === 'solicitud_mercancia') as ModeloDeFormaDinamica;
      if (SOLICITUD_MERCANCIA_FIELD) {
        if (!SOLICITUD_MERCANCIA_FIELD.opciones) {
          SOLICITUD_MERCANCIA_FIELD.opciones = resp.map((item: { id: number; descripcion: string }) => ({
            descripcion: item.descripcion,
            id: item.id,
          }));
        }
      }
    });
  }

    /**
  * compo doc
  * @method establecerCambioDeValor
  * @description
  * Este método se utiliza para manejar los cambios en los valores de los campos del formulario dinámico. 
  * Si el campo modificado es "solicitud_mercancia" y su descripción no está vacía, actualiza el valor 
  * del campo "criterio_de_dictamen" en el formulario y en el store dinámico. Además, si el valor del 
  * evento contiene un identificador, actualiza el estado dinámico del campo correspondiente en el store.
  * 
  * Funcionalidad:
  * - Actualiza el campo "criterio_de_dictamen" con la descripción de la solicitud de mercancía.
  * - Actualiza el estado dinámico del campo modificado en el store con el identificador del valor.
  * 
  * @param {Object} event - Objeto que contiene el campo modificado y su nuevo valor.
  * @param {string} event.campo - Nombre del campo modificado.
  * @param {Object} event.valor - Nuevo valor del campo, que incluye un identificador y una descripción.
  * @param {number} event.valor.id - Identificador del nuevo valor.
  * @param {string} event.valor.descripcion - Descripción del nuevo valor.
  * 
  * @example
  * this.establecerCambioDeValor({ campo: 'solicitud_mercancia', valor: { id: 1, descripcion: 'Nueva solicitud' } });
  * // Actualiza el campo "criterio_de_dictamen" y el estado dinámico del campo "solicitud_mercancia".
  */
  public establecerCambioDeValor(event: { campo: string; valor: string }): void {
    if (event.campo === 'solicitud_mercancia' && event.valor !== '') {
      const DESCRIPCION = this.solicitudMercancia.find((ele: Catalogo) => ele.id === Number(event.valor))?.descripcion;
      this.ninoFormGroup.get('criterio_de_dictamen')?.setValue(DESCRIPCION);
      this.tramite130103Store.setDynamicFieldValue('criterio_de_dictamen', DESCRIPCION);
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
