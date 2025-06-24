import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ANEXO_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { AnexoTresComponent } from '../../../../shared/components/anexo-tres/anexo-tres.component';
import { CONFIGURACION_DOS_DATOS } from '../../constantes/nuevo-programa.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FraccionArancelariaDescripcion } from '../../../../shared/models/empresas.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Tramite80101Query } from '../../../80103/estados/tramite80101.query';
import { Tramite80101Store } from '../../../80103/estados/tramite80101.store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-anexo-vista-dos-y-tres',
  standalone: true,
  imports: [CommonModule, AnexoTresComponent],
  templateUrl: './anexo-vista-dos-y-tres.component.html',
  styleUrl: './anexo-vista-dos-y-tres.component.scss',
})
export class AnexoVistaDosYTresComponent implements OnInit, OnDestroy {
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

  /*
  * Almacena la configuración de las pestañas del primer paso.
  */
   configuracionDosDatos: ConfiguracionColumna<FraccionArancelariaDescripcion>[] =CONFIGURACION_DOS_DATOS

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(private query: Tramite80101Query,
    private store: Tramite80101Store
  ) {
    //constructor vacío
  }

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
     * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
     * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
     * @method ngOnDestroy
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}

