import {
  ANEXO_IMPORTACION_SERVICIO,
  ANEXO_I_SERVICIO,
} from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AnexoDosEncabezado,
  AnexoUnoEncabezado,
  DatosComplimento,
  RutaNombre,

} from '../../../../shared/models/nuevo-programa-industrial.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contenedor-annexo-uno',
  standalone: true,
  imports: [CommonModule, AnexoUnoComponent],
  templateUrl: './contenedor-annexo-uno.component.html',
  styleUrl: './contenedor-annexo-uno.component.scss',
})
/**
 * @component
 * @name ContenedorAnnexoUnoComponent
 * @description Componente encargado de gestionar el anexo uno y el anexo de importación en el trámite 80102.
 * Este componente permite visualizar y manejar los datos de los anexos, así como sus encabezados.
 *
 * @usageNotes
 * Este componente utiliza servicios de consulta (`Tramite80102Query`) y estado (`Tramite80102Store`)
 * para manejar y observar los datos relacionados con los anexos. Además, implementa el ciclo de vida
 * de Angular para limpiar las suscripciones al destruirse.
 */
export class ContenedorAnnexoUnoComponent implements OnInit, OnDestroy {
  /**
   * Configuración del anexo Uno.
   * @type {Object}
   * @property {TablaSeleccion} anexoUnoTablaSeleccionRadio - Selección de tabla del anexo Uno.
   * @property {ANEXO_I_SERVICIO} anexoUnoEncabezadoDeTabla - Encabezado de tabla del anexo Uno.
   */
  public anexoUnoConfig = {
    anexoUnoTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoUnoEncabezadoDeTabla: ANEXO_I_SERVICIO,
  };

  /**
   * Configuración del anexo de importación.
   * @type {Object}
   * @property {TablaSeleccion} anexoDosTablaSeleccionRadio - Selección de tabla del anexo Dos.
   * @property {ANEXO_IMPORTACION_SERVICIO} anexoDosEncabezadoDeTabla - Encabezado de tabla del anexo Dos.
   */
  public anexoImportacionConfig = {
    anexoDosTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoDosEncabezadoDeTabla: ANEXO_IMPORTACION_SERVICIO,
  };


  /**
    * FormGroup para el Anexo Uno.
    * 
    * Representa el formulario reactivo asociado al Anexo Uno. 
    * Contiene los controles y validaciones necesarias para capturar o modificar los datos del Anexo Uno.
    * Se inicializa posteriormente, normalmente en el `ngOnInit` o en el constructor del componente.
    */
  public anexoUnoFormGroup!: FormGroup;

  /**
   * FormGroup para el Anexo Dos.
   * 
   * Representa el formulario reactivo asociado al Anexo Dos. 
   * Contiene los controles y validaciones necesarias para capturar o modificar los datos del Anexo Dos.
   * Se inicializa posteriormente, generalmente en el `ngOnInit` o en el constructor del componente.
   */
  public anexoDosFormGroup!: FormGroup;

  /**
   * Lista de encabezados del anexo Uno.
   * @type {AnexoEncabezado[]}
   */
  public anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

  /**
   * Lista de encabezados del anexo dos.
   * @type {AnexoEncabezado[]}
   */
  public anexoDosTablaLista: AnexoDosEncabezado[] = [];

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no pueden ser editados por el usuario.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor de la clase ContenedorAnnexoUnoComponent.
   * @param {Router} router - Servicio de Angular para la navegación.
   * @param {ActivatedRoute} activatedRoute - Servicio de Angular para obtener información sobre la ruta actual.
   * @param {Tramite80102Store} store - Servicio para manejar el estado del trámite.
   * @param {Tramite80102Query} query - Servicio para consultar el estado del trámite.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Tramite80102Store,
    private query: Tramite80102Query, private consultaQuery: ConsultaioQuery, private fb: FormBuilder,
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe a los datos de las tablas de importación y exportación y actualiza las listas correspondientes.
   * @returns {void}
   */
  ngOnInit(): void {
    this.query.selectImportarTablsDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((importarTablsDatos) => {
        if (importarTablsDatos.length > 0) {
          this.anexoUnoTablaLista = importarTablsDatos;
        }
      });

    this.query.selectExportarTablsDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((exportarTablsDatos) => {
        if (exportarTablsDatos.length > 0) {
          this.anexoDosTablaLista = exportarTablsDatos;
        }
      });
    this.inicializarFormularioDatosSubcontratista();
    this.obtenerDatosDelAlmacen();
    this.inicializarFormularioDatosDosSubcontratista();
    this.obtenerDatosDosDelAlmacen();
  }


  /**
     * Obtiene los datos del almacén y los asigna al formulario de información de registro.
     * Se suscribe al observable `infoRegisterEstado$` para obtener los datos, y cuando se reciben,
     * se actualiza la propiedad `infoRegistro` y se establece el valor del formulario `formularioInfoRegistro`.
     *
     * @method obtenerDatosDelAlmacen
     */
  obtenerDatosDelAlmacen(): void {
    this.query.selectDatosComplimentos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosComplimentos) => {
        this.anexoUnoFormGroup.setValue(datosComplimentos);
      });
  }


  obtenerDatosDosDelAlmacen(): void {
    this.query.selectDatosComplimentosDos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosComplimentos) => {
        this.anexoDosFormGroup.setValue(datosComplimentos);
      });
  }


  /**
     * Inicializa el formulario de datos del subcontratista con los datos obtenidos o con valores vacíos si no hay datos disponibles.
     * @method inicializarFormularioDatosSubcontratista
     */
  inicializarFormularioDatosSubcontratista(): void {
    this.anexoUnoFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /**
   * Inicializa el formulario de datos del subcontratista con los datos obtenidos o con valores vacíos si no hay datos disponibles.
   * @method inicializarFormularioDatosSubcontratista
   */
  inicializarFormularioDatosDosSubcontratista(): void {
    this.anexoDosFormGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  /**
     * Modifica los datos de los cumplimientos y los almacena en el estado.
     *
     * @param complimentos - Objeto de tipo `DatosComplimentos` que contiene los datos de los cumplimientos a actualizar.
     * @returns void
     */
  modifierComplimentos(complimentos: DatosComplimento): void {
    this.store.setDatosComplimento(complimentos);
  }

  /**
   * Modifica los datos de los cumplimientos y los almacena en el estado.
   *
   * @param complimentos - Objeto de tipo `DatosComplimentos` que contiene los datos de los cumplimientos a actualizar.
   * @returns void
   */
  modifierDosComplimentos(complimentos: DatosComplimento): void {
    this.store.setDatosComplimentoDos(complimentos);
  }








  /**
   * Método para obtener la devolución de llamada del anexo Uno.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo Uno.
   * @returns {void}
   */
  public obtenerAnexoUnoDevolverLaLlamada(event: AnexoUnoEncabezado[]): void {
    this.anexoUnoTablaLista = event ? event : [];
    this.store.setImportarDatosTabla(this.anexoUnoTablaLista);
  }
  /**
   * Método para obtener la devolución de llamada del anexo Dos.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo Dos.
   * @returns {void}
   */
  public obtenerAnexoDosDevolverLaLlamada(event: AnexoDosEncabezado[]): void {
    this.anexoDosTablaLista = event ? event : [];
    this.store.setExportarDatosTabla(this.anexoDosTablaLista);
  }

  /**
   * Método para manejar la navegación a la fracción de complemento.
   * @param {RutaNombre} event - Evento que contiene la información de la ruta.
   * @returns {void}
   */
  public rutaLaFraccionDeComplemento(event: RutaNombre): void {
    if (
      event &&
      event.catagoria &&
      event.id &&
      (event.datos || event.catagoria === 'proveedor-por-archivo')
    ) {
      this.store.setAnnexoUnoSeccionActiva(event.id);
      this.store.setDatosParaNavegar(event.datos);
      this.router.navigate([`../${event.catagoria}`], {
        relativeTo: this.activatedRoute,
      });
    }
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
