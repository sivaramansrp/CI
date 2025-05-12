import { Component, OnDestroy, OnInit } from '@angular/core';
import { ANEXO_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoDosYTresComponent } from '../../../../shared/components/anexo-dos-y-tres.component/anexo-dos-y-tres.component';
import { AnexoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contenedor-annexo-dos-tres',
  standalone: true,
  imports: [CommonModule, AnexoDosYTresComponent],
  templateUrl: './contenedor-annexo-dos-tres.component.html',
  styleUrl: './contenedor-annexo-dos-tres.component.scss',
})
/**
 * @component
 * @name ContenedorAnnexoDosTresComponent
 * @description Componente encargado de gestionar los anexos dos y tres en el trámite 80102.
 * Este componente permite visualizar y manejar los datos de los anexos dos y tres, así como sus encabezados.
 *
 * @usageNotes
 * Este componente utiliza servicios de consulta (`Tramite80102Query`) y estado (`Tramite80102Store`) 
 * para manejar y observar los datos relacionados con los anexos. Además, implementa el ciclo de vida 
 * de Angular para limpiar las suscripciones al destruirse.
 */
export class ContenedorAnnexoDosTresComponent implements OnInit, OnDestroy {
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
   * Constructor de la clase ContenedorAnnexoDosTresComponent.
   * @param {Tramite80102Query} query - Servicio para consultar el estado del trámite.
   * @param {Tramite80102Store} store - Servicio para manejar el estado del trámite.
   */
  constructor(
    private query: Tramite80102Query,
    private store: Tramite80102Store
  ) {
    //El constructor requiere inyección de dependencias, pero se ha mantenido vacío debido a una regla de ESLint.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe a los datos de las tablas de anexos dos y tres y actualiza las listas correspondientes.
   * @returns {void}
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
  }

  /**
   * Método para obtener la devolución de llamada del anexo dos.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo dos.
   * @returns {void}
   */
  public obtenerAnexoDosDevolverLaLlamada(event: AnexoEncabezado[]): void {
    this.anexoDosTablaLista = event ? event : [];
    this.store.setAnnexoDosTableLista(this.anexoDosTablaLista);
  }

  /**
   * Método para obtener la devolución de llamada del anexo tres.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo tres.
   * @returns {void}
   */
  public obtenerAnexoTresDevolverLaLlamada(event: AnexoEncabezado[]): void {
    this.anexoTresTablaLista = event ? event : [];
    this.store.setAnnexoTresTableLista(this.anexoTresTablaLista);
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
