import { Component, OnInit, ViewChild } from '@angular/core';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';

import {CategoriaMensaje, ConsultaioQuery, DatosPasos, ListaPasosWizard, Notificacion, WizardComponent} from '@libs/shared/data-access-user/src'
import { PANTAPASOS } from '../../services/pantallas-svc.enum';
import { PASOS } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';

import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';

import { EmpaqueMercancia, InsumoMercancia, SolicitudCompletaRequest } from '../../models/request/guardado-solicitud-request.model';
import { SolicitudService } from '../../services/solicitud.service';

/**
 * **Interfaz que representa una acción de un botón en la interfaz**  
 * 
 * Define la estructura de datos para gestionar las acciones ejecutadas  
 * al interactuar con botones en la aplicación.  
 */
interface AccionBoton {
  /** 
   * **Tipo de acción que realizará el botón**  
   * Especifica la acción asociada al botón cuando el usuario lo presiona.  
   * Puede ser valores como `'guardar'`, `'cancelar'`, `'eliminar'`, `'continuar'`, etc.  
   */
  accion: string;

  /** 
   * **Valor numérico asociado a la acción del botón**  
   * Representa un identificador que proporciona contexto a la acción.  
   * Puede indicar el índice de un paso en un asistente, un ID de elemento,  
   * o cualquier otro valor numérico relevante para la lógica de la aplicación.  
   */
  valor: number;
}


/**
 * Este componente se utiliza para mostrar los pasos del asistente - 110101
 * Lista de pasos
 * Índice del paso
 */

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent implements OnInit {

  /**
   * **Lista de pasos del asistente (wizard)**  
   *
   * - Almacena la lista de pasos que conforman el flujo del asistente.  
   * - `ListaPasosWizard[]`: Define el tipo de datos como una lista de pasos del wizard.  
   * - Se inicializa con el valor de `PANTAPASOS`, que contiene la configuración de los pasos.  
   */
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;

  /**
   * **Índice del paso actual en el asistente (wizard)**  
   *
   * - Almacena el número del paso en el que se encuentra el usuario dentro del flujo.  
   * - Se inicializa en `1`, lo que indica que el asistente comienza en el primer paso.  
   */
  indice: number = 1;

  /**
   * **Subject para manejar la destrucción del componente**
   * 
   * Este `Subject` se utiliza para cancelar suscripciones y evitar 
   * fugas de memoria cuando el componente es destruido.
   * Se usa comúnmente en el operador `takeUntil` dentro de los observables.
  */
  private destroy$ = new Subject<void>();

 /**
  * Notificación actual que se muestra en el componente.
   *
   * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
   * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
  */
  public nuevaNotificacion!: Notificacion ;
  /**
  * **Lista de pasos del asistente (wizard)**  
  *
  * - Contiene la secuencia de pasos que conforman el flujo del asistente.  
  * - `ListaPasosWizard[]`: Define el tipo de datos como una lista de pasos del wizard.  
  * - Se inicializa con `PASOS`, que almacena la configuración de los pasos.  
  */
  pasos: ListaPasosWizard[] = PASOS;



  /**
  * **Referencia al componente del asistente (wizard)**  
  *
  * - `@ViewChild` permite acceder a la instancia del `WizardComponent` en el template.  
  * - Se usa para controlar y manipular el asistente de manera programática.  
  * - `!:` indica que la variable se inicializará después de que la vista se haya renderizado.  
  */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


  /**
   * **Datos de configuración para el asistente (wizard)**  
   *
   * - `nroPasos`: Número total de pasos en el asistente, obtenido de la longitud de `pasos`.  
   * - `indice`: Paso actual en el que se encuentra el usuario.  
   * - `txtBtnAnt`: Texto para el botón de navegación hacia atrás ('Anterior').  
   * - `txtBtnSig`: Texto para el botón de navegación hacia adelante ('Continuar').  
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length, // Total de pasos en el asistente.
    indice: this.indice, // Paso actual del asistente.
    txtBtnAnt: 'Anterior', // Texto del botón de retroceso.
    txtBtnSig: 'Continuar', // Texto del botón de avance.
  };

  /**
   * Representa el estado actual del solicitante para el trámite 110101.
   * Esta propiedad contiene toda la información relevante y el estado del solicitante.
  */
  public solicitudeState!: Solicitante110101State;

  constructor(
    private solicitudService: SolicitudService,
    private consultaioQuery: ConsultaioQuery,
    private solicitanteQuery: Solicitante110101Query,
    private tramite110101Store: Tramite110101Store,
  ){
  
  }
  
  ngOnInit(): void {
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$), map((seccionState) => {
     this.solicitudeState = seccionState;
    })).subscribe();
  }


  /**
   * **Actualiza el índice del paso y navega en el asistente**  
   *
   * - Verifica que el valor recibido esté dentro del rango permitido (entre 1 y 4).  
   * - Si es válido, actualiza el índice (`this.indice`) con el nuevo valor.  
   * - Si la acción (`e.accion`) es `'cont'`, avanza al siguiente paso en el asistente.  
   * - Si la acción no es `'cont'`, retrocede al paso anterior.  
   *
   * @param {AccionBoton} e - Objeto con la acción y el valor del nuevo índice.  
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
    this.guardarSolicitudCompleta(() => {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    });
  }
  }
  /**
   * @method guardarSolicitudCompleta
   * @description
   * Construye el payload completo de la solicitud a partir de los datos capturados en los formularios,
   * incluyendo la información general, representante legal, cuestionario, mercancía asociada,
   * criterios de tratados, declaraciones y procesos. 
   * 
   * Envía la solicitud al servicio correspondiente para su registro o actualización.
   * Maneja la respuesta del backend mostrando notificaciones al usuario en caso de éxito o error,
   * y actualiza el estado interno de la aplicación según corresponda.
   * 
   * @returns {void}
   */
  guardarSolicitudCompleta(callback: () => void): void {
    const PAYLOAD: SolicitudCompletaRequest = {
      id_solicitud: null,
      id_tipo_tramite: null,
      rfc: "AAL0409235E6",
      cve_unidad_administrativa: this.solicitudeState.representacion,
      //Se tiene duda pienso que es el segundo tab
      costo_total: null,
      certificado_serial_number: null,
      numero_folio_tramite_original: null,
      representante_legal: {
        nombre: "Juan",
        ap_paterno: "Pérez",
        ap_materno: "García",
        telefono: "5551234567",
      },
      registro_cuestionario_sol: {
        id_solicitud: null,
        cve_numero_registro: null,
        ide_tipo_exportador: null,
        solicita_exportador_aut: this.solicitudeState.exportadorAutorizado,
        separacion_contable: this.solicitudeState.metodoSeparacion,
        ide_condicion_exportador_aut: this.solicitudeState.informacionRadios,
        mercancia_asociada_sol: {
          id_solicitud: null,
          id_descripcion_alterna_ue: null,
          id_descripcion_alterna_aelc: null,
          id_descripcion_alterna_sgp: null,
          id_descripcion_alterna_ace: null,
          nombre_comercial: this.solicitudeState.nombreComercial,
          nombre_ingles: this.solicitudeState.nombreIngles,
          fraccion_arancelaria: this.solicitudeState.fraccionArancelaria,
          precio_franco_fabrica: this.solicitudeState.francofabrica,
          valor_transaccional: this.solicitudeState.valorTransaccion,
          costo_neto: null,
          valor_transaccional_fob: null,
          costo_neto_ap: null,
          unidad_medida_comercial: null,
          unidad_medida_tarifaria: null,
          peso_acumulado_textil: null,
          peso_insumos_no_originarios: null,
          peso_es_requerido: false,
          volumen_es_requerido: false,
          acumulacion_uruguay: false,
          materiales_fungibles_uruguay: false,
          materiales_intermedios_uruguay: false,
          criterio_origen_uruguay: null,
          acumulacion_peru: false,
          materiales_fungibles_peru: false,
          materiales_intermedios_peru: false,
          criterio_origen_peru: null,
          acumulacion: "N",
          materiales_fungibles: "N",
          materiales_intermedios: "N",
          acumulacion_ap: false,
          requiere_juegos_o_surtidos: "N",
          insumos: this.solicitudeState.insumosTablaDatos.map(item => ({
            id_solicitud: null,
            nombre: item.nombreTecnico,
            desc_fabricante_productor: item.fabricanteOProductor,
            desc_proveedor: item.proveedor,
            cve_fraccion: item.fraccionArancelaria,
            importe_valor: item.valorEnDolares,
            ide_tipo_insumo: "TIPIN.02",
            peso: item.peso,
            volumen: item.volumen,
            cve_pais: item.paisDeOrigen,
            cve_unidad_medida: null,
            rfc_fabricante_productor: item.rfc,
            descripcion: null,
            criterios_tratados: this.solicitudeState.insumoCriteriosDatos.map(criterio =>({
              id_criterio_tratado: criterio.id_criterio_tratado,
              id_solicitud: null,
              cve_grupo_criterio: criterio.cve_grupo_criterio,
              id_bloque: criterio.id_bloque,
              id_tratado_acuerdo: criterio.id_tratado_acuerdo,
              cve_pais: criterio.cve_pais,
              cve_tratado_acuerdo: criterio.cve_tratado_acuerdo,
              cve_tratado_acuerdo_bloque: criterio.cve_tratado_acuerdo_bloque,
              id_desc_alterna_fraccion: null
            })

            ),
          } as InsumoMercancia)
          ),
          empaques: this.solicitudeState.envasesTablaDatos.map(item =>({
            id_solicitud: null,
            nombre: item.nombreTecnico,
            desc_fabricante_productor: item.fabricanteOProductor,
            desc_proveedor: item.proveedor,
            cve_fraccion: item.fraccionArancelaria,
            importe_valor: item.valorEnDolares,
            ide_tipo_insumo: "TIPIN.02",
            peso: item.peso,
            volumen: item.volumen,
            cve_pais: item.paisDeOrigen,
            cve_unidad_medida: null,
            rfc_fabricante_productor: item.rfc,
            descripcion: null,
            criterios_tratados: this.solicitudeState.envasesCriteriosDatos.map(criterio =>({
              id_criterio_tratado: criterio.id_criterio_tratado,
              id_solicitud: null,
              cve_grupo_criterio: criterio.cve_grupo_criterio,
              id_bloque: criterio.id_bloque,
              id_tratado_acuerdo: criterio.id_tratado_acuerdo,
              cve_pais: criterio.cve_pais,
              cve_tratado_acuerdo: criterio.cve_tratado_acuerdo,
              cve_tratado_acuerdo_bloque: criterio.cve_tratado_acuerdo_bloque,
              id_desc_alterna_fraccion: null
            })
            ),
          } as EmpaqueMercancia)
          ),
          id_fraccion_naladi: null,
          cve_fraccion_naladi: null,
          id_fraccion_naladisa93: null,
          cve_fraccion_naladisa93: null,
          id_fraccion_naladisa96: null,
          cve_fraccion_naladisa96: null,
          id_fraccion_naladisa02: null,
          cve_fraccion_naladisa02: null,
        },
      },
      //Primer tab
      criterios_tratados: this.solicitudeState.respuestaServicioDatosTabla.map(item => ({
        id_criterio_tratado: item.id_criterio_tratado,
        id_solicitud: null, 
        cve_grupo_criterio: item.cve_grupo_criterio,
        id_bloque: item.id_bloque,
        id_tratado_acuerdo: item.id_tratado_acuerdo,
        cve_pais: item.cve_pais,
        cve_tratado_acuerdo: item.cve_tratado_acuerdo,
        cve_tratado_acuerdo_bloque: item.cve_tratado_acuerdo_bloque,
        id_desc_alterna_fraccion: null    
      })
      ),
      entidad_federativa: {
        id_solicitud: null,
        cve_entidad: this.solicitudeState.entidad,
      },
      declaraciones_solicitud: this.solicitudeState.declaracion_solicitud.map(item=>({
        id_solicitud: null,
        cve_declaracion: item.clave,
        aceptado:  this.solicitudeState.protesto_verdad ? 1 : 0 
      })),
      procesos: [],
    };

    this.solicitudService.postSolicitudGuardar(PAYLOAD)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.tramite110101Store.setId_solicitud(response.datos ?? 0);
            callback();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response?.error || 'Error.',
              mensaje: response?.causa || response?.mensaje || 'Error',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (err) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const MENSAJE = err?.error?.error || 'Error.';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: 'error',
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          }
        }
      });

  }


}
