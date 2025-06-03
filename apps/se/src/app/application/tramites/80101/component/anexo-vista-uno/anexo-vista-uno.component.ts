import { ANEXO_IMPORTACION_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { ANEXO_I_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { ActivatedRoute } from '@angular/router';
import { AnexoDosEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';
import { AnexoUnoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutaNombre } from '../../../../shared/models/nuevo-programa-industrial.model';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-anexo-vista-uno',
  standalone: true,
  imports: [CommonModule, AnexoUnoComponent],
  templateUrl: './anexo-vista-uno.component.html',
  styleUrl: './anexo-vista-uno.component.scss',
})
export class AnexoVistaUnoComponent implements OnInit, OnDestroy {
  public anexoUnoConfig = {
    anexoUnoTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoUnoEncabezadoDeTabla: ANEXO_I_SERVICIO,
  };
  public anexoImportacionConfig = {
    anexoDosTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoDosEncabezadoDeTabla: ANEXO_IMPORTACION_SERVICIO,
  };

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.Add commentMore actions
   */
  @Input() formularioDeshabilitado: boolean = false;
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
   * Constructor del componente AnexoVistaUnoComponent.
   * @param {Router} router - Servicio de enrutamiento de Angular para navegar entre rutas.
   * @param {ActivatedRoute} activatedRoute - Servicio que proporciona información sobre la ruta activa.
   * @param {Tramite80101Store} store - Store para manejar el estado del trámite 80101.
   * @param {Tramite80101Query} query - Query para obtener datos del estado del trámite 80101.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Tramite80101Store,
    private query: Tramite80101Query
  ) {}

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
   * Navega a una ruta específica basada en el evento proporcionado.
   *
   * @param event - Objeto de tipo `RutaNombre` que contiene la información necesaria para la navegación.
   *   - `catagoria`: Categoría de la ruta a la que se desea navegar.
   *   - `id`: Identificador único que se utiliza para establecer la sección activa.
   *   - `datos`: Datos adicionales necesarios para la navegación.
   *
   * Este método realiza las siguientes acciones:
   * 1. Establece la sección activa en el store utilizando el `id` del evento.
   * 2. Configura los datos necesarios para la navegación en el store.
   * 3. Navega a la ruta relativa basada en la categoría proporcionada.
   */
  public rutaLaFraccionDeComplemento(event: RutaNombre): void {
    if (event && event.catagoria && event.id && event.datos) {
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
