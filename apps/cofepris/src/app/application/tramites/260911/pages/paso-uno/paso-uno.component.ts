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
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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

/**
 * Clase PasoUnoComponent
 * 
 * Controla la lógica y el estado del primer paso del trámite, incluyendo la interacción con los componentes hijos,
 * la gestión de pestañas y la obtención de datos desde el servicio y el store.
 */
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Evento que se emite cuando se cambia de pestaña.
   */
  @Output() tabChanged = new EventEmitter<number>();
  /**
   * Referencia al componente de datos de la solicitud.
   */
  @ViewChild(DatosDeLaSolicitudComponent) datosDeLaSolicitudComponent!: DatosDeLaSolicitudComponent;
  /**
   * Referencia al componente de domicilio del establecimiento.
   */
  @ViewChild(DomicilioDelEstablecimientoComponent) domicilioDelEstablecimientoComponent!: DomicilioDelEstablecimientoComponent;
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
   * Estado de selección del botón de radio global.
   */
  /**
   * Indica si el botón de radio global está seleccionado.
   */
  isRadioButtonSelectedGlobal: boolean = false;

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
   * Indica si se han recibido correctamente los datos desde el servidor.
   */
  /**
   * Indica si se han recibido correctamente los datos desde el servidor.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria al destruir el componente.
   * Se emite un valor y se completa cuando el componente se destruye.
   * @private
   */
  /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  /**
   * Índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Constructor del componente.
   * @param consultaQuery Consulta de estado de solo lectura.
   * @param solocitud260911Service Servicio para obtener y actualizar datos del formulario.
   */
  /**
   * Constructor del componente PasoUnoComponent.
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
  /**
   * Inicializa el componente y suscribe al estado del store.
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
  /**
   * Selecciona una pestaña estableciendo su índice y emite el evento correspondiente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
  this.indice = i;
  this.tabChanged.emit(i);
  }

  /**
   * Hook del ciclo de vida Angular que se ejecuta al destruir el componente.
   * Libera recursos cancelando todas las suscripciones activas.
   */
  /**
   * Libera recursos cancelando todas las suscripciones activas al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}