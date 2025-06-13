import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { ImportacionArmamentoFisicasMoralesService } from '../../services/importacion-armamento-fisicas-morales.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { Subject } from 'rxjs';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { Tramite240102Query } from '../../estados/tramite240102Query.query';
import { Tramite240102Store } from '../../estados/tramite240102Store.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * @title Paso Uno
 * @description Componente que representa el primer paso del flujo de solicitud. Contiene los datos del solicitante, datos del trámite, terceros relacionados y pago de derechos.
 * @summary Agrupa los subcomponentes necesarios para capturar la información inicial del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, DatosDelTramiteContenedoraComponent, PagoDeDerechosContenedoraComponent, TercerosRelacionadosContenedoraComponent ],
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * @property indice
   * @description Indica el índice de la pestaña seleccionada dentro del paso del formulario.
   * @type {number | undefined}
   */
  public indice: number | undefined = 1;

  /**
   * @property destroyNotifier$
   * @description Notificador observable que permite cancelar las suscripciones activas cuando se destruye el componente.
   * Ayuda a prevenir fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Inicializa el componente con la consulta y el store necesarios para el manejo del estado.
   *
   * @param tramite240102Query Consulta para acceder al estado del trámite.
   * @param tramite240102Store Store que permite actualizar el estado del trámite.
   */
  constructor(
    private tramite240102Query: Tramite240102Query,
    private tramite240102Store: Tramite240102Store, // eslint-disable-next-line no-empty-function
    private consultaQuery: ConsultaioQuery,
    private importacionArmamentoService: ImportacionArmamentoFisicasMoralesService
  ) {
      this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
        this.consultaState = seccionState;
      })).subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al valor del tab seleccionado desde el estado y actualiza `indice`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite240102Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });

      if (this.consultaState.update) {
      this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
  }

    /**
   * Guarda los datos del formulario obtenidos del servicio.
   */
  guardarDatosFormulario(): void {
    this.importacionArmamentoService
      .obtenerRegistroTomarMuestrasDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp) {
          this.esDatosRespuesta = true;
          this.importacionArmamentoService.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Actualiza el índice de la pestaña seleccionada en el store.
   *
   * @param i Índice de la pestaña seleccionada.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.tramite240102Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * Emite y completa el observable `destroyNotifier$` para cancelar las suscripciones.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
