/**
 * PasoUnoComponent
 * 
 * Componente Angular que representa el primer paso del trámite 260911 en la aplicación Cofepris.
 * Permite gestionar la selección de pestañas, la obtención y actualización de datos del formulario,
 * así como la integración con el estado de consulta y la suscripción a los datos del store.
 * 
 * @author Equipo Team4
 * @since 2025
 */
import { Component,EventEmitter, OnDestroy, OnInit,Output } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { ViewChild } from '@angular/core';

import { DatosDeLaSolicitud260904Component } from '../../components/datos-de-la-solicitud-260904/datos-de-la-solicitud-260904.component';

import { DomicilioDelEstablecimiento260904Component } from '../../components/domicilio-del-establecimiento-260904/domicilio-del-establecimiento-260904.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados/terceros-relacionados-vista.component';

import { TramitesAsociadoComponent } from '../../components/tramites-asociado/tramites-asociado.component';


import { ModificacionDelPermisoSanitarioService } from '../../services/modificacion-del-permiso-sanitario.service';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
   /**
     * Evento que se emite cuando se cambia de pestaña.
     */
    @Output() tabChanged = new EventEmitter<number>();

    /**
   * Referencia al componente de datos de la solicitud.
   */
  @ViewChild(DatosDeLaSolicitud260904Component) datosDeLaSolicitudComponent!: DatosDeLaSolicitud260904Component;
  /**
   * Referencia al componente de domicilio del establecimiento.
   */
  @ViewChild(DomicilioDelEstablecimiento260904Component) domicilioDelEstablecimientoComponent!: DomicilioDelEstablecimiento260904Component;
  /**
   * Referencia al componente de terceros relacionados.
   */
  @ViewChild(TercerosRelacionadosVistaComponent) tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;
  /**
   * Referencia al componente de pago de derechos.
   */
  @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;
  /**
   * Referencia al componente de trámites asociado.
   */
  @ViewChild(TramitesAsociadoComponent) tramitesAsociadoComponent!: TramitesAsociadoComponent;
  /**
   * Tipo de trámite seleccionado.
   */
  /**
   * Tipo de trámite seleccionado por el usuario.
   */
  selectedTipoTramite: string = '';

   /**
   * Estado de selección del botón de radio global.
   */
  /**
   * Indica si el botón de radio global está seleccionado.
   */
  isRadioButtonSelectedGlobal: boolean = false;
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Indica si los datos de respuesta están disponibles.
   */
  esDatosRespuesta: boolean = false;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject<void>();

  /**
   * Estado actual de la consulta.
   */
  consultaioState!: ConsultaioState;

  /**
   * Constructor del componente.
   * consultaQuery Servicio para consultar el estado de la consulta.
   * modificacionDelPermisoSanitarioService Servicio para manejar la modificación del permiso sanitario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private modificacionDelPermisoSanitarioService: ModificacionDelPermisoSanitarioService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable del estado de consulta y actualiza la propiedad `consultaioState`.
   * Dependiendo del valor de `consultaioState.update`, guarda los datos del formulario o marca que los datos son de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaioState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaioState.update) {
      
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Maneja el cambio en el tipo de trámite seleccionado.
   * @param tipo El nuevo tipo de trámite seleccionado.
   */
  /**
   * Actualiza el tipo de trámite seleccionado.
   * @param tipo El nuevo tipo de trámite seleccionado.
   */
  onTipoTramiteChange(tipo: string): void {
    this.selectedTipoTramite = tipo;
  }

  /**
   * Maneja el cambio en el estado de selección del botón de radio global.
   * @param selected El nuevo estado de selección del botón de radio.
   */
  /**
   * Actualiza el estado de selección del botón de radio global.
   * @param selected El nuevo estado de selección.
   */
  onRadioButtonSelectedChange(selected: boolean): void {
    this.isRadioButtonSelectedGlobal = selected;
  }

  /**
   * Guarda los datos del formulario en el estado de la consulta.
   * Este método se invoca cuando se detecta que el estado requiere actualización.
   */
  guardarDatosFormulario(): void {
    this.modificacionDelPermisoSanitarioService
      .getData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.modificacionDelPermisoSanitarioService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Libera los recursos y evita fugas de memoria completando el notificador.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
