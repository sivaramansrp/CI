import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { DatosDomicilioLegalService } from '../../../../shared/services/datos-domicilio-legal.service';
import { DatosSolicitudComponent } from '../../components/datos-solicitud/datos-solicitud.component';
import { PagoBancoService } from '../../../../shared/services/pago-banco.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { TercerosRelacionadosFabricanteComponent } from '../../components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { Tramite260502Query } from '../../../../estados/queries/260502/tramite260502.query';
import { Tramite260502Store } from '../../../../estados/tramites/260502/tramite260502.store';
/**
 * Componente que representa el primer paso del proceso de solicitud.
 * Contiene un componente de solicitante y permite la navegación entre tabs.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: false,
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  /**
   * Emite el estado de validez del formulario.
   * Se envía un valor booleano cada vez que cambia la validez del formulario.
   * Permite comunicar al componente padre si el formulario es válido o no.
   */
  @Output() formValidityChange = new EventEmitter<boolean>();
 /**
   * Actualiza el estado local de validez del formulario.
   * Este método recibe el valor emitido por el componente hijo.
   * Se utiliza para saber si el formulario es válido o no desde el componente principal.
   */
  onFormValidityChange(isValid: boolean):void {
    this.formValidityChange.emit(isValid);
  }
  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }
    private isDatosDeLaSolicitudComponentValid: boolean = false;
     /** Referencia al componente 'TercerosRelacionadosFabricanteComponent' en la plantilla.
       * Proporciona acceso a sus métodos y propiedades.
       */
      @ViewChild('TercerosRelacionadosFabricanteComponent', { static: false }) tercerosRelacionadosFabricanteComponent!: TercerosRelacionadosFabricanteComponent;
    
      private isTercerosComponentValid: boolean = false;
       /** Referencia al componente 'CertificadoOrigenComponent' en la plantilla.
         * Proporciona acceso a sus métodos y propiedades.
         */
        @ViewChild('DatosSolicitudComponent', { static: false }) datosSolicitudComponent!: DatosSolicitudComponent;
 /**
   * Valida todos los formularios del paso uno.
   * Retorna true si todos los formularios son válidos, false en caso contrario.
   */
  public validarFormularios(): boolean {
    this.isDatosDeLaSolicitudComponentValid = (
      this.query.getValue().formValidity?.datosEstablecimiento && 
      this.query.getValue().formValidity?.domicilioEstablecimiento &&
      this.query.getValue().formValidity?.manifiestos &&
      this.query.getValue().formValidity?.representanteLegal ) ?? false;
    this.isTercerosComponentValid = this.query.getValue().formValidity?.terceros ?? false;

    if (!this.isDatosDeLaSolicitudComponentValid) {
      this.datosSolicitudComponent?.validarFormulario(); 
    }

    if (!this.isTercerosComponentValid) {
      this.tercerosRelacionadosFabricanteComponent?.validarFormulario();
    }

    return this.isDatosDeLaSolicitudComponentValid && this.isTercerosComponentValid

  }
  /**
   * Índice del tab seleccionado.
   */
  indice: number = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de consulta que contiene la información del formulario y su estado.
   * Se obtiene a través de la consulta ConsultaioQuery.
   */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente Datos260502Component.
   *
   * @param solicitud260502Service - Servicio para manejar la lógica de negocio relacionada con el trámite 260502.
   * @param consultaQuery - Consulta para obtener el estado actual del formulario y su configuración.
   */
  constructor(
    private solicitud260502Service: DatosDomicilioLegalService,
    private consultaQuery: ConsultaioQuery,
    private pagoBancoService: PagoBancoService,
    public store: Tramite260502Store,
        public query: Tramite260502Query,
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se suscribe al estado de consulta para obtener la información del formulario.
   * Si el estado indica que se está actualizando, se llama a `guardarDatosFormulario`.
   * De lo contrario, se establece `esDatosRespuesta` como verdadero.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          if (this.consultaState?.update) {
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();
  }

  /**
   * Método para guardar los datos del formulario.
   * Se suscribe al servicio `getRegistroTomaMuestrasMercanciasData` para obtener los datos del formulario.
   * Si la respuesta es válida, se actualiza el estado del formulario con los datos obtenidos.
   */
  guardarDatosFormulario(): void {
    this.solicitud260502Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitud260502Service.actualizarEstadoFormulario(resp);
        }
      });

    // También se puede llamar al servicio pagoBancoService si es necesario
    this.pagoBancoService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.pagoBancoService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método para seleccionar un tab.
   * @param i Índice del tab.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   * Cancela las suscripciones activas y libera recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
