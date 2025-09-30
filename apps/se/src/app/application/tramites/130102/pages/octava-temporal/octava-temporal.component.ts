/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @fileoverview Este archivo contiene la clase OctavaTemporalComponent, que es responsable de manejar la lógica del componente Octava Temporal.
 * 
 * @module OctavaTemporalComponent
 */
import { AVISO_CONTRNIDO, ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { DatosPasos, WizardComponent } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard, WizardService } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import {ERROR_DE_REGISTRO_ALERT} from '../../constantes/octava-temporal.enum';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { OCTA_TEMPO } from 'libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { CatOctavaTemporalService } from '../../services/cat-octava-temporal.service';
import { SaveReglaOctavaRequest } from '../../models/request/regla-octava-request.model';
import { dataRequestROctavaTemporal } from '../../models/request/data-test';
import { Solicitud130102State, Tramite130102Store } from '../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../estados/queries/tramite130102.query';
/**
 * @class OctavaTemporalComponent
 * @classdesc Esta clase representa el componente Octava Temporal.
 */

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-octava-temporal',
  templateUrl: './octava-temporal.component.html',
})
export class OctavaTemporalComponent implements OnInit, OnDestroy{
     /**
   * Clase CSS para la alerta de información.
   */
  infoAlert = 'alert-danger';
    /**
   * Controla si se debe mostrar la alerta en pantalla.
   * Se activa cuando el subíndice del child componente es 3.
   */
  mostrarAlerta: boolean = false;
 /**
 * Contiene el texto del aviso de privacidad simplificado.
 * 
 * @constant {string} avisoContrnido
 * Se inicializa con la propiedad `aviso` del objeto `AVISO_CONTRNIDO`.
 * 
 * Uso:
 * - Mostrar el aviso de privacidad en la interfaz de usuario.
 * - Reutilizar el contenido del aviso en distintos componentes.
 */
avisoContrnido = AVISO_CONTRNIDO.aviso;
  /**
   * Referencia al componente del asistente (wizard) para controlar su navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Objeto con la información para el botón de continuar.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud130102State;

  
  /**
   * Bandera que indica si se deben mostrar los errores del formulario.
   */
  mostrarErrorFormularios: boolean = false;

  /**
   * Alerta que se muestra en caso de error en el registro.
   */
  registroAlert = ERROR_DE_REGISTRO_ALERT;

  /*
  * @description Notificador para destruir el componente y cancelar suscripciones.
  */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Subject para destruir notificador y cancelar suscripciones.
   */
  destruirNotificador$: Subject<void> = new Subject();
  /*
  * @description Estado actual de la consulta, obtenido desde el store.
  */
  public consultaState!: ConsultaioState;

  /**
   * @property wizardService
   * @description
   * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
   * @type {WizardService}
   */
  private wizardService = inject(WizardService);


  /**
   * Constructor del componente/servicio.
   * Inyecta los servicios necesarios para la consulta del estado y la gestión del formulario de registro.
   *
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado actual desde el store.
   * @param {FormularioRegistroService} formularioRegistroService - Servicio para gestionar el formulario de registro.
   */
  constructor(
    private consultaQuery: ConsultaioQuery, 
    private formularioRegistroService: FormularioRegistroService,
    private catOctavaTemporalService: CatOctavaTemporalService,
    private tramite130102Query: Tramite130102Query,
  ) {}

  /**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Se suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Al recibir un nuevo estado, lo asigna a la propiedad `consultaState`.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
      this.consultaState = seccionState;
      }
    )).subscribe();

    this.tramite130102Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
    
  }

  /**
   * Maneja el cambio de índice en el flujo del wizard.
   * Valida los formularios antes de avanzar o retroceder.
   * 
   * @param e - Objeto que contiene la acción y el nuevo valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (!this.consultaState.readonly) {
      const TODOS_VALIDOS = this.formularioRegistroService.validarTodosFormularios();

      if (!TODOS_VALIDOS) {
        this.mostrarErrorFormularios = true;
        return;
      }
      this.mostrarErrorFormularios = false;
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.datosPasos.indice = e.valor;
        if (e.accion === 'cont' && !this.mostrarErrorFormularios) {
          this.indice = e.valor + 1;
          this.datosPasos.indice = e.valor + 1;
          this.wizardService.cambio_indice(this.datosPasos.indice);
          this.wizardComponent.siguiente();
        } else if (e.accion === 'ant' && !this.mostrarErrorFormularios){
          this.indice = e.valor - 1;
          this.datosPasos.indice = e.valor - 1;
          this.wizardComponent.atras();
        }
      }
    } else {
      if (e.valor > 0 && this.pantallasPasos.length) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
    }
    
  }

  /**
   * Método para ejecutar la notificación del trámite.
   * @param numFolioTramite - Número de folio del trámite.
   */
  ejecutarNotificacion(numFolioTramite : string): void {
      this.catOctavaTemporalService.getIniciarNotificacion(numFolioTramite ).subscribe((data) => {
        console.log(data);
        if(data.codigo === '200'){
          alert(data.mensaje);
        } else {
          alert(`Error: ${data.error} - Causa: ${data.causa}`);
        }
      });

  } 

  generaContratoSolicitud(): SaveReglaOctavaRequest {
    console.log('Generando contrato de solicitud...'+ JSON.stringify(this.solicitudState));
    const data: SaveReglaOctavaRequest = {
        cve_regimen: this.solicitudState.regimen || '',
        cve_clasificacion_regimen: this.solicitudState.clasificacionRegimen || '',
        numero_autorizado_programa_prosec_pex: "string",
        cve_usuario_capturista: "string",
        lista_paises: this.solicitudState.paises || [],
        mercancia: {
            cve_fraccion_arancelaria: this.solicitudState.fraccionArancelaria || '',
            cve_subdivision: "string",
            descripcion: this.solicitudState.descripcion || '',
            cve_unidad_medida_tarifaria: this.solicitudState.unidadMedida || '',
            cantidad_tarifaria: this.solicitudState.cantidad || 0,
            valor_factura_usd: parseFloat(this.solicitudState.valorFacturaUSD) || 0,
            ide_condicion_mercancia: this.solicitudState.productos || 'CONDMER.N',
        },
        solicitante: {
            rfc: "string",
            nombre: "string",
            es_persona_moral: false,
            certificado_serial_number: "string",
        },
        representacion_federal: {
            cve_entidad_federativa: this.solicitudState.entidad || '',
            cve_unidad_administrativa:  this.solicitudState.representacion,
        },
        partidas_mercancia: this.solicitudState.partidas_tabla || [],
        cantidad_total: this.solicitudState.cantidadTotal || 0,
        cantidad_total_usd: parseFloat(this.solicitudState.valorTotalUSD) || 0,
        lista_fracciones_prosec: this.solicitudState.lista_fracciones_prosec || [],
    
    }
    console.log('Datos para guardar la solicitud: ', JSON.stringify(data));
    return data;
  }
  /**
   * Método que invoca al servicio de guardado de la solicitud.
   * @param data - Datos de la solicitud a guardar.
   */
  ejecutarGuardadoSolicitud(): void {
    this.generaContratoSolicitud();
    const dataRequest : SaveReglaOctavaRequest = this.generaContratoSolicitud();//dataRequestROctavaTemporal;
    this.catOctavaTemporalService.saveDataRequest(dataRequest).subscribe({
      next: (data) => {
        if(data.datos.id_solicitud){
          alert(data.datos.id_solicitud);
         // this.ejecutarNotificacion(data.datos.id_solicitud.toString());
        } else {
          alert(`Error: ${data.codigo} - Causa: ${data.mensaje}`);
        } 
      },
      error: (error) => {
        alert(`Error: ${error}`);
      }
    }
    );
  }
  /*
    * Método que se ejecuta al destruir el componente.
  */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
