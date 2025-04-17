/**
 * Importaciones necesarias para el componente de terceros relacionados.
 * Incluye módulos y servicios para gestionar la tabla dinámica de destinatarios relacionados.
 */
import { AlertComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DESTINATARIO_ENCABEZADO_DE_TABLA } from '../../enums/destinatario.enum';
import { Destinatario } from '../../enums/destinatario.enum';
import { MENSAJE_TABLA_OBLIGATORIA } from '../../../../shared/models/terceros-relacionados.model';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitudModificacionPermisoSalidaTerritorio.service';
import { Subject } from 'rxjs';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa la sección de terceros relacionados.
 * Este componente es standalone y utiliza CommonModule, AlertComponent, TituloComponent y TablaDinamicaComponent.
 * Gestiona la tabla dinámica de destinatarios relacionados y actualiza el estado del store.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent, TablaDinamicaComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Mensaje de alerta obligatorio para la tabla.
   */
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * Tipo de alerta que se muestra en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Configuración de las columnas de la tabla de destinatarios finales.
   */
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] = DESTINATARIO_ENCABEZADO_DE_TABLA;

  /**
   * Tipo de selección utilizado en la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Lista de destinatarios obtenidos.
   */
  destinatarioDatos: Destinatario[] = [];

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param solicitudDatosService Servicio para obtener los datos de los destinatarios.
   * @param tramite261401Store Store para gestionar el estado del trámite.
   * @param tramite261401Query Query para obtener datos del estado del trámite.
   */
  constructor(
    public solicitudDatosService: SolicitudModificacionPermisoSalidaTerritorioService,
    private tramite261401Store: Tramite261401Store,
    private tramite261401Query: Tramite261401Query,
  ) {
    // Constructor
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene la lista de destinatarios relacionados.
   */
  ngOnInit(): void {
    this.obtenerDestinatarioListo();
  }

  /**
   * Obtiene la lista de destinatarios desde el servicio y actualiza el estado del store.
   */
  obtenerDestinatarioListo(): void {
    this.solicitudDatosService
      .obtenerDestinatarioListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Destinatario[]) => {
          this.destinatarioDatos = respuesta;
          this.tramite261401Store.setDestinatarioDatos(respuesta);
        },
      });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}