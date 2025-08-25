import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SOLICITUD_HEADER, SOLICITUD_TABLA_CONFIGURACION, TEXTOS_SOLICITUD } from '../../constantes/aviso-enum';
import { Solicitud, SolicitudTable } from '../../models/aviso-model';
import { Subject, takeUntil } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { CommonModule } from '@angular/common';
import { DatosDelEstablecimientoComponent } from '../datos-del-establecimiento/datos-del-establecimiento.component';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';

/**
 * Componente para gestionar el datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, AlertComponent, DatosDelEstablecimientoComponent, TablaDinamicaComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  TEXTOS = TEXTOS_SOLICITUD;
  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (ampliado)
   */
  colapsable: boolean = true;
  /**
   * Recibe datos del encabezado de la tabla como propiedad de entrada
   */
  tablaHeadData = SOLICITUD_HEADER.encabezadoSolicitud;
  /**
   * Recibe la lista de solicitudes como datos de fila de la tabla.
   */
  @Input() tablaFilaDatos: Solicitud[] = [];

  /**
   * @property {ConfiguracionColumna<SolicitudTable>[]} configuracionTabla
   * @description
   * Configuración de las columnas para la tabla de solicitudes.
   * Define la estructura y comportamiento de cada columna en la tabla dinámica.
   */
  configuracionTabla: ConfiguracionColumna<SolicitudTable>[] = SOLICITUD_TABLA_CONFIGURACION;

  /**
   * @property {TablaSeleccion} tipoSeleccionTabla
   * @description
   * Define el tipo de selección que se aplicará en la tabla dinámica.
   * UNDEFINED indica que no hay un comportamiento de selección específico configurado.
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @property {SolicitudTable[]} solicitudDatos
   * @description
   * Arreglo que almacena los datos de las solicitudes que se mostrarán en la tabla dinámica.
   * Se obtienen desde el servicio y se actualizan en el store.
   */
  solicitudDatos: SolicitudTable[] = [];

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Subject utilizado para notificar la destrucción del componente y cancelar todas las suscripciones activas
   * cuando el componente se destruye, evitando fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * Alterna el panel plegable (expandir/contraer)
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }
    /**
   * @constructor
   * @param {AvisoSanitarioService} avisoSanitarioService - Servicio para obtener datos del aviso sanitario.
   * @param {Tramite260601Store} tramite260601Store - Store para gestionar el estado del trámite 260601.
   */
  constructor(
    private avisoSanitarioService: AvisoSanitarioService,
    private tramite260601Store: Tramite260601Store
  ){

  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de que Angular inicializa las propiedades del componente.
   * Inicia la obtención de datos de solicitudes.
   */
  ngOnInit(): void {
    this.obtenerDatos();
  }

  /**
   * @method obtenerDatos
   * @description
   * Obtiene los datos de solicitudes desde el servicio y actualiza tanto el store como la propiedad local.
   * Utiliza el operador takeUntil para cancelar la suscripción cuando el componente se destruye.
   */
  obtenerDatos(): void {
      this.avisoSanitarioService.obtenerSolicitudDatos()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((result: SolicitudTable[]) => {
          this.tramite260601Store.setSolicitudTabla(result);
          this.solicitudDatos = result;
        });
      
    }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta justo antes de que Angular destruya el componente.
   * Completa el subject destroyNotifier$ para evitar fugas de memoria al cancelar todas las suscripciones asociadas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
