/* eslint-disable dot-notation */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { Solicitud110218State } from '../../estados/tramites/tramite110218.store';

import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';

/**
 * Componente para manejar las pestañas del solicitante.
 *
 * Este componente permite a los usuarios navegar entre diferentes secciones
 * del solicitante utilizando pestañas.
 *
 */
@Component({
  selector: 'app-solicitante-tabs',
  templateUrl: './app-solicitante-tabs.component.html',
})
export class AppSolicitanteTabsComponent implements OnInit {
 
  /**
   * Evento emitido cuando se produce una acción relacionada con el certificado.
   */
  @Output() SolicitanteEventCertificado: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Índice de la pestaña actualmente seleccionada.
   * Se puede recibir como entrada desde un componente padre.
   */
  @Input() indice: number = 1;
  /**
   * Selecciona una pestaña específica y actualiza el índice.
   * AppSolicitanteTabsComponent
   */

  constructor(private consultaQuery:ConsultaioQuery ,private servicio:CertificadoTecnicoJaponService){
 
  }
  /**
   * Indica si los datos de respuesta están disponibles.
   */
  public datosRespuestaDisponibles: boolean = false;

  /**
   * Subject utilizado para notificar la destrucción del componente y cancelar suscripciones.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta.
   */
  public estadoConsulta!: ConsultaioState;
  /**
   * Inicializa el componente y suscribe al estado de consulta.
   * Si el estado indica una actualización, obtiene los datos de la bandeja de solicitudes.
   * De lo contrario, marca los datos de respuesta como disponibles.
   */
  ngOnInit(): void {
    // Suscribirse al observable del estado de consulta
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSeccion) => {
        this.estadoConsulta = estadoSeccion;
        // Verificar si se requiere actualización de datos
        if (this.estadoConsulta.update) {
          this.obtenerDatosBandejaSolicitudes();
        } else {
          this.datosRespuestaDisponibles = true;
        }
      });

   if (this.estadoConsulta.update) {
      this.obtenerDatosBandejaSolicitudes();
    } else {
      this.datosRespuestaDisponibles = true;
    }
  }
  /**
   * Obtiene los datos de la bandeja de solicitudes desde el servicio.
   * Marca los datos de respuesta como disponibles y actualiza el registro si la respuesta es válida.
   */
  obtenerDatosBandejaSolicitudes(): void {
    this.servicio.obtenerRegistro()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((respuesta: Solicitud110218State) => {
        if (respuesta) {
          this.datosRespuestaDisponibles = true;
          this.servicio.actualizarRegistro(respuesta);
        }
      });
  }
  /**
   * Selecciona una pestaña específica y actualiza el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}