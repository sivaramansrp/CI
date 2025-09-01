import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeLaSolicitudComponent } from '../../component/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ViewChild } from '@angular/core';

import { DomicilioDelEstablecimientoComponent } from '../../component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosVistaComponent } from '../../component/terceros-relacionados/terceros-relacionados-vista.component';

import { TramitesAsociadoComponent } from '../../component/tramites-asociado/tramites-asociado.component';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud260911Service } from '../../services/service260911.service';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 * Gestiona la obtención y actualización de datos del formulario, así como la selección de pestañas.
 * Integra el estado de consulta y controla la suscripción a los datos del store.
 *
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})

export class PasoUnoComponent implements OnInit, OnDestroy {
  // Expose child components for parent validation
  @ViewChild(DatosDeLaSolicitudComponent) datosDeLaSolicitudComponent!: DatosDeLaSolicitudComponent;
  @ViewChild(DomicilioDelEstablecimientoComponent) domicilioDelEstablecimientoComponent!: DomicilioDelEstablecimientoComponent;
  @ViewChild(TercerosRelacionadosVistaComponent) tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;
  @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponent!: PagoDeDerechosComponent;
  @ViewChild(TramitesAsociadoComponent) tramitesAsociadoComponent!: TramitesAsociadoComponent;
  // Expose child components for parent validation
  /**
   * Tipo de trámite seleccionado.
   */
  selectedTipoTramite: string = '';

  /**
   * Maneja el cambio en el tipo de trámite seleccionado.
   * @param tipo El nuevo tipo de trámite seleccionado.
   */
  onTipoTramiteChange(tipo: string): void {
    this.selectedTipoTramite = tipo;
  }

  /**
   * Estado de selección del botón de radio global.
   */
  isRadioButtonSelectedGlobal: boolean = false;

  /**
   * Maneja el cambio en el estado de selección del botón de radio global.
   * @param selected El nuevo estado de selección del botón de radio.
   */
  onRadioButtonSelectedChange(selected: boolean): void {
    this.isRadioButtonSelectedGlobal = selected;
  }

  /**
   * Indica si se han recibido correctamente los datos desde el servidor.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria al destruir el componente.
   * Se emite un valor y se completa cuando el componente se destruye.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Constructor del componente.
   * @param consultaQuery Consulta de estado de solo lectura.
   * @param solocitud260911Service Servicio para obtener y actualizar datos del formulario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud260911Service: Solocitud260911Service,
  ) {}

  /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta al inicializar el componente y se suscribe al estado del store.
   * Si el estado indica actualización, solicita los datos del formulario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Solicita los datos del formulario al servicio y actualiza el store si la respuesta es válida.
   * Marca la bandera de datos recibidos si la respuesta es exitosa.
   */
  guardarDatosFormulario(): void {
    this.solocitud260911Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260911Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Hook del ciclo de vida Angular que se ejecuta al destruir el componente.
   * Libera recursos cancelando todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}