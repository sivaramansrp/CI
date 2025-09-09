import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DatosEmpresaComponent } from '../../component/datos-empresa/datos-empresa.component';
import { ViewChild } from '@angular/core';

import { DomicilioDelEstablecimientoComponent } from '../../component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosVistaComponent } from '../../component/terceros-relacionados/terceros-relacionados-vista.component.ts';

import { TramitesAsociadoComponent } from '../../component/tramites-asociado/tramites-asociado.component';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';

import { Solocitud260912Service } from '../../services/service260912.service';


// Define the interface for the return type of getAllPasoUnoData
export interface PasoUnoData {
  datosDeLaSolicitud: ReturnType<DatosEmpresaComponent['getData']> | undefined;
  domicilioDelEstablecimiento: ReturnType<DomicilioDelEstablecimientoComponent['getData']> | undefined;
  tercerosRelacionados: ReturnType<TercerosRelacionadosVistaComponent['getData']> | undefined;
  pagoDeDerechos: ReturnType<PagoDeDerechosComponent['getData']> | undefined;
  tramitesAsociado: ReturnType<TramitesAsociadoComponent['getData']> | undefined;
}
/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {

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
   * Evento que se emite cuando se cambia de pestaña.
   */
  @Output() tabChanged = new EventEmitter<number>();
  /**
   * Referencia al componente de datos de la solicitud.
   */
  @ViewChild(DatosEmpresaComponent) datosDeLaSolicitudComponent!: DatosEmpresaComponent;
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
   * Constructor del componente.
   * @param consultaQuery Consulta de estado de solo lectura.
   * @param solocitud260912Service Servicio para obtener y actualizar datos del formulario.
   */

  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud260912Service: Solocitud260912Service,
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
   * Solicita los datos del[] formulario al servicio y actualiza el store si la respuesta es válida.
   * Marca la bandera de datos recibidos si la respuesta es exitosa.
   */
  guardarDatosFormulario(): void {
    this.solocitud260912Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260912Service.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Selecciona una pestaña estableciendo su índice.
   * @param i El índice de la pestaña a seleccionar.
  /**
     * 
     * 
     */
    public getAllPasoUnoData(): PasoUnoData {
    return {
      datosDeLaSolicitud: this.datosDeLaSolicitudComponent?.getData?.(),
      domicilioDelEstablecimiento: this.domicilioDelEstablecimientoComponent?.getData?.(),
      tercerosRelacionados: this.tercerosRelacionadosVistaComponent?.getData?.(),
      pagoDeDerechos: this.pagoDeDerechosComponent?.getData?.(),
      tramitesAsociado: this.tramitesAsociadoComponent?.getData?.()
    };
  }

   public isAllValid(): boolean {
    return (
      (!this.datosDeLaSolicitudComponent || this.datosDeLaSolicitudComponent.isValid?.()) &&
      (!this.domicilioDelEstablecimientoComponent || this.domicilioDelEstablecimientoComponent.isValid?.()) &&
      (!this.tercerosRelacionadosVistaComponent || this.tercerosRelacionadosVistaComponent.isValid?.()) &&
      (!this.pagoDeDerechosComponent || this.pagoDeDerechosComponent.isValid?.()) &&
      (!this.tramitesAsociadoComponent || this.tramitesAsociadoComponent.isValid?.())
    );
  }



  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

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
