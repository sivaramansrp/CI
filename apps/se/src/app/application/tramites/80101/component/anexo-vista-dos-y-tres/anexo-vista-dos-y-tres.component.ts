import { Component, Input } from '@angular/core';
import { ANEXO_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoDosYTresComponent } from '../../../../shared/components/anexo-dos-y-tres.component/anexo-dos-y-tres.component';
import { AnexoEncabezado, DatosAnexotressUno } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 *
 * Este método suscribe a dos observables (`anexoDosTableLista$` y `anexoTresTablaLista$`)
 * para obtener las listas de datos correspondientes a los anexos dos y tres.
 * Los datos se asignan a las propiedades `anexoDosTablaLista` y `anexoTresTablaLista`
 * respectivamente, siempre que las listas no estén vacías.
 *
 * Además, utiliza el operador `takeUntil` para gestionar la suscripción y
 * garantizar que se complete cuando el observable `destroyNotifier$` emita un valor,
 * evitando así posibles fugas de memoria.
 *
 * @method ngOnInit
 * @returns {void} No retorna ningún valor.
 */

/**
 * Método para obtener la devolución de llamada del anexo dos.
 *
 * Este método actualiza la lista de encabezados del anexo dos (`anexoDosTablaLista`)
 * con los datos proporcionados en el evento. Si el evento es nulo o indefinido,
 * se asigna una lista vacía. Además, actualiza el estado global utilizando el método
 * `setAnnexoDosTableLista` del almacén (`store`).
 *
 * @method obtenerAnexoDosDevolverLaLlamada
 * @param {AnexoEncabezado[]} event - Evento que contiene la lista de encabezados del anexo dos.
 * @returns {void} No retorna ningún valor.
 */

/**
 * Método para obtener la devolución de llamada del anexo tres.
 *
 * Este método actualiza la lista de encabezados del anexo tres (`anexoTresTablaLista`)
 * con los datos proporcionados en el evento. Si el evento es nulo o indefinido,
 * se asigna una lista vacía. Además, actualiza el estado global utilizando el método
 * `setAnnexoTresTableLista` del almacén (`store`).
 *
 * @method obtenerAnexoTresDevolverLaLlamada
 * @param {AnexoEncabezado[]} event - Evento que contiene la lista de encabezados del anexo tres.
 * @returns {void} No retorna ningún valor.
 */

/**
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 *
 * Este método emite un valor en el observable `destroyNotifier$` para indicar que
 * las suscripciones deben completarse, evitando posibles fugas de memoria. También
 * llama al método `complete` del observable para finalizarlo. Además, actualiza los
 * `BehaviorSubject` relacionados con las tablas para ocultarlas.
 *
 * @method ngOnDestroy
 * @returns {void} No retorna ningún valor.
 */
@Component({
  selector: 'app-anexo-vista-dos-y-tres',
  standalone: true,
  imports: [CommonModule, AnexoDosYTresComponent],
  templateUrl: './anexo-vista-dos-y-tres.component.html',
  styleUrl: './anexo-vista-dos-y-tres.component.scss',
})
export class AnexoVistaDosYTresComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.Add commentMore actions
   */
  @Input() formularioDeshabilitado: boolean = false;
  /**
   * Lista de encabezados del anexo dos.
   * @type {AnexoEncabezado[]}
   */
  public anexoDosTablaLista: AnexoEncabezado[] = [];

  /**
   * Lista de encabezados del anexo tres.
   * @type {AnexoEncabezado[]}>}
   */
  public anexoTresTablaLista: AnexoEncabezado[] = [];

  /**
   * Configuración del anexo.
   * @type {Object}
   * @property {TablaSeleccion} anexoDosTablaSeleccionCheckbox - Selección de tabla del anexo dos.
   * @property {ANEXO_SERVICIO} anexoDosEncabezadoDeTabla - Encabezado de tabla del anexo dos.
   * @property {TablaSeleccion} anexoTresTablaSeleccionCheckbox - Selección de tabla del anexo tres.
   * @property {ANEXO_SERVICIO} anexoTresEncabezadoDeTabla - Encabezado de tabla del anexo tres.
   */
  public anexoConfig = {
    anexoDosTablaSeleccionCheckbox: TablaSeleccion.CHECKBOX,
    anexoDosEncabezadoDeTabla: ANEXO_SERVICIO,
    anexoTresTablaSeleccionCheckbox: TablaSeleccion.CHECKBOX,
    anexoTresEncabezadoDeTabla: ANEXO_SERVICIO,
  };

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Holds the data for the first annex section of the "Anexo Tres" form.
   * 
   * @type {DatosAnexotressUno}
   */
  datosAnexoUno!: DatosAnexotressUno;

  /**
   * Form group instance for managing the controls and validation of the "Anexo Uno" section.
   * This FormGroup is used to encapsulate form fields and their validation logic within the component.
   */
  public anexoTressFormGroup!: FormGroup;

  /**
   * Constructor de la clase AnexoVistaDosYTresComponent.
   *
   * @param query - Servicio de consulta para Tramite80101.
   * @param store - Almacén de estado para Tramite80101.
   */
  constructor(
    private query: Tramite80101Query,
    private store: Tramite80101Store,
    private fb: FormBuilder,
  ) {
    //constructor vacío
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * Este método suscribe a dos observables (`anexoDosTableLista$` y `anexoTresTablaLista$`)
   * para obtener las listas de datos correspondientes a los anexos dos y tres.
   * Los datos se asignan a las propiedades `anexoDosTablaLista` y `anexoTresTablaLista`
   * respectivamente, siempre que las listas no estén vacías.
   *
   * Además, utiliza el operador `takeUntil` para gestionar la suscripción y
   * garantizar que se complete cuando el observable `destroyNotifier$` emita un valor,
   * evitando así posibles fugas de memoria.
   */
  ngOnInit(): void {
    this.query.anexoDosTableLista$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((anexoDosTablaLista) => {
        if (anexoDosTablaLista.length > 0) {
          this.anexoDosTablaLista = anexoDosTablaLista;
        }
      });

    this.query.anexoTresTablaLista$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((anexoTresTablaLista) => {
        if (anexoTresTablaLista.length > 0) {
          this.anexoTresTablaLista = anexoTresTablaLista;
        }
      });
    this.inicializarFormularioDatosSubcontratista();
    this.obtenerDatosDelAlmacen()
  }


  obtenerDatosDelAlmacen(): void {
    this.query.selectDatosAnexoTres$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosAnexoTres) => {
        console.log('datosAnexoTres', datosAnexoTres);
        this.anexoTressFormGroup.setValue(datosAnexoTres);
      });
  }


  /**
     * Inicializa el formulario de datos del subcontratista con los datos obtenidos o con valores vacíos si no hay datos disponibles.
     * @method inicializarFormularioDatosSubcontratista
     */
  inicializarFormularioDatosSubcontratista(): void {
    this.anexoTressFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /**
   * Método para obtener la devolución de llamada del anexo dos.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo dos.
   * @returns {void}
   */
  obtenerAnexoDosDevolverLaLlamada(event: AnexoEncabezado[]): void {
    this.anexoDosTablaLista = event ? event : [];
    this.store.setAnnexoDosTableLista(this.anexoDosTablaLista);
  }

  /**
   * Método para obtener la devolución de llamada del anexo tres.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo tres.
   * @returns {void}
   */
  obtenerAnexoTresDevolverLaLlamada(event: AnexoEncabezado[]): void {
    this.anexoTresTablaLista = event ? event : [];
    this.store.setAnnexoTresTableLista(this.anexoTresTablaLista);
  }

  /**
     * Modifica los datos de los cumplimientos y los almacena en el estado.
     *
     * @param complimentos - Objeto de tipo `DatosComplimentos` que contiene los datos de los cumplimientos a actualizar.
     * @returns void
     */
  modifierComplimentos(complimentos: DatosAnexotressUno): void {
    console.log('sddsss', complimentos);
    this.store.setDatosAnexoTres(complimentos);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
