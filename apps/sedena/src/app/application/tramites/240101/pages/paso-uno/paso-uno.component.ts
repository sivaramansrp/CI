import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelTramiteContenedoraComponent } from '../../components/datos-del-tramite-contenedora/datos-del-tramite-contenedora.component';
import { ImportacionArmasMunicionesService } from '../../services/importacion-armas-municiones.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { Subject } from 'rxjs';
import { TercerosRelacionadosContenedoraComponent } from '../../components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';
import { Tramite240101Query } from '../../estados/tramite240101Query.query';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';
import { map} from 'rxjs';
import { takeUntil} from 'rxjs';

/**
 * @title Paso Uno
 * @description Componente que representa el primer paso del flujo de solicitud. Contiene los datos del solicitante, datos del trámite, terceros relacionados y pago de derechos.
 * @summary Agrupa los subcomponentes necesarios para capturar la información inicial del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent, DatosDelTramiteContenedoraComponent, TercerosRelacionadosContenedoraComponent, PagoDeDerechosContenedoraComponent ],
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * @property indice
   * @description Indicates the index of the selected tab within the form step.
   * @type {number | undefined}
   */
  public indice: number | undefined = 1;

  /**
   * @property destroyNotifier$
   * @description Observable notifier to unsubscribe active subscriptions when the component is destroyed.
   * Helps prevent memory leaks.
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
   * Constructor de la clase PasoUnoComponent.
   * 
   * @param tramite240101Query Servicio para consultar el estado del trámite 240101.
   * @param tramite240101Store Almacén para gestionar el estado del trámite 240101.
   * @param consultaQuery Servicio para consultar el estado de la sección actual.
   * @param armasMunicionesService Servicio para operaciones relacionadas con la importación de armas y municiones.
   * 
   * Inicializa el componente y sus dependencias. Además, suscribe al observable del estado de consulta
   * para mantener actualizado el estado local `consultaState` hasta que el componente sea destruido.
   */
  constructor(
    private tramite240101Query: Tramite240101Query,
    private tramite240101Store: Tramite240101Store,
    private consultaQuery: ConsultaioQuery,
    private armasMunicionesService: ImportacionArmasMunicionesService
  ) {
     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
  }

  /**
   * Angular lifecycle method that runs on component initialization.
   * Subscribes to the selected tab from state and updates `indice`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite240101Query.getTabSeleccionado$
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
    this.armasMunicionesService
      .obtenerRegistroTomarMuestrasDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp) {
          this.esDatosRespuesta = true;
          this.armasMunicionesService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Updates the selected tab index in the store.
   *
   * @param i Index of the selected tab.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.tramite240101Store.updateTabSeleccionado(i);
  }

  /**
   * Angular lifecycle method that runs just before the component is destroyed.
   * Emits and completes the `destroyNotifier$` to unsubscribe observables.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
