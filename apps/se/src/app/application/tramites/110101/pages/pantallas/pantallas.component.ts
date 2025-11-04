import { Component, OnInit, ViewChild } from '@angular/core';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';
import { DatosComponent } from '../datos/datos.component';

import { CategoriaMensaje, ConsultaioQuery, DatosPasos, ListaPasosWizard, Notificacion, WizardComponent } from '@libs/shared/data-access-user/src'
import { PANTAPASOS } from '../../services/pantallas-svc.enum';
import { PASOS } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';

import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';

import { EmpaqueMercancia, InsumoMercancia, SolicitudCompletaRequest } from '../../models/request/guardado-solicitud-request.model';

import { Empaque, Insumo, RegistroCuestionarioRequest } from '../../models/request/validar-solicitud-request.model';
import { MensajePantallaService } from '../../services/validaciones-tabs.service';
import { SolicitudService } from '../../services/solicitud.service';
import { ValidarSolicitudResponse } from '../../models/response/validar-solicitud-response.model';

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
   * Indica si se debe mostrar un mensaje en la interfaz de usuario.
   * 
   * Cuando es `true`, el mensaje se muestra; cuando es `false`, el mensaje permanece oculto.
  */
  mostrarMensaje: boolean = false;

  /**
   * Indica si se debe mostrar un mensaje en la interfaz de usuario de servicio validar.
   * 
   * Cuando es `true`, el mensaje se muestra; cuando es `false`, el mensaje permanece oculto.
  */
  mostrarMensajeServicio: boolean = false;

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
  public nuevaNotificacion!: Notificacion;
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
   * **Referencia al componente de datos (tabs)**  
   *
   * - `@ViewChild` permite acceder a la instancia del `DatosComponent` en el template.  
   * - Se utiliza para gestionar la navegación y validación de tabs internos.  
   * - `!:` asegura que la variable se inicializará después del renderizado de la vista.  
   * - Controla el flujo entre diferentes pestañas dentro del paso de captura de datos.  
   */
  @ViewChild(DatosComponent) datosTabs!: DatosComponent;

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
    txtBtnAnt: '', // Texto del botón de retroceso.
    txtBtnSig: 'Continuar', // Texto del botón de avance.
  };

  /**
   * Datos de la evaluacionde la solicitud
  */
  public evaluarSolicitudResponse!: ValidarSolicitudResponse;

  /**
   * Datos de error en validacion
  */
  mensajeErrores: string[] = [];

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
    private mensajeService: MensajePantallaService
  ) {

  }

  ngOnInit(): void {
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$), map((seccionState) => {
      this.solicitudeState = seccionState;
    })).subscribe();

    this.mensajeService.mensaje$.subscribe(valor => {
      this.mostrarMensaje = valor; 
    });
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
   // Si estamos en el paso de "Capturar solicitud" (app-datos)
  // Paso 1 del wizard: app-datos
    if (this.indice === 1) {
      
      // Validación específica del tab Tratados
      if (this.datosTabs.indice === 2 && this.solicitudeState.respuestaServicioDatosTabla.length === 0) {
        this.mostrarMensaje = true;
        return; // no avanza
      }
      if(this.datosTabs.indice === 2){
        if (this.solicitudeState.validacion_formularios.validacion_tab_tratados_otras_inmstancias === false) {
           this.mostrarMensaje = true;
           return;
        }
      }
      if(this.datosTabs.indice === 3){
        if (this.solicitudeState.validacion_formularios.validacion_tab_mercancia === false) {
           this.mostrarMensaje = true;
            // Detonar markAllAsTouched() en el hijo
            this.mensajeService.marcarFormulario();
           return;
        }
        if (this.solicitudeState.respuestaServiceConfiguracion.mostrar_insumos === true) {
           if(this.solicitudeState.insumosTablaDatos.length === 0){
           this.mostrarMensaje = true;
          return;
        }
        }
       
      }
      //Este puede cambiar cuando salga el tab oculto
      if(this.datosTabs.indice === this.datosTabs.totalTabs){
         if (this.solicitudeState.validacion_formularios.validacion_tab_datos_adicionales === false) {
           this.mostrarMensaje = true;
            // Detonar markAllAsTouched() en el hijo
            this.mensajeService.marcarFormulario();
           return;
        }
      }
      // Intentar avanzar tab interno
      const AVANZAR = this.datosTabs.avanzarTab();
      if (AVANZAR) {
        this.datosPasos.txtBtnAnt = 'Continuar';
        this.datosPasos.txtBtnSig = 'Continuar';
       this.mostrarMensaje = false;
        return;
      }
    }

      //  estamos en el último tab interno
    const ULTIMOTAB = this.datosTabs.indice === this.datosTabs.totalTabs;
    if (ULTIMOTAB) {
      //Ejecuta servicio de validar
      this.validarSolicitudCompleta(() => {
        // Si fue exito tira la de guardado
        this.guardarSolicitudCompleta(() => {
          //avanza a firma
          this.indice++;
          this.datosPasos.indice = this.indice;
          this.mostrarMensaje = false;
          this.actualizarBotones();
        });
      });
      return; 
    }


    // Cambiar al siguiente paso del wizard
    if (this.indice < this.pantallasPasos.length) {
      this.indice++;
      this.datosPasos.indice = this.indice;
    }
      // Si pasó la validación, ocultar mensaje
    this.mostrarMensaje = false;
      this.actualizarBotones();
  }
   /**
   * **Actualiza los textos y estados de los botones de navegación**  
   *
   * - En el paso 1 del asistente, controla la navegación entre tabs internos.  
   * - Si hay tabs internos pendientes, muestra "Continuar" en ambos botones.  
   * - Cuando se llega al último tab interno, habilita el botón "Anterior".  
   * - Para los pasos 2 en adelante del asistente, muestra "Anterior" y "Continuar".  
   * - Asegura la coherencia visual de la navegación durante el flujo del asistente.  
   */
  actualizarBotones() :void {
  if (this.indice === 1) {
    // Paso 1: verificar si todavía quedan tabs internos
    if (this.datosTabs.indice <= this.datosTabs.totalTabs) {
      // Si estamos en el último tab → mostrar "Anterior"
      this.datosPasos.txtBtnAnt = (this.datosTabs.indice > 1) ? 'Anterior' : 'Continuar';
      this.datosPasos.txtBtnSig = 'Continuar';
    }
  } else {
    // Wizard paso 2 o más
    this.datosPasos.txtBtnAnt = this.indice > 1 ? 'Anterior' : 'Continuar';
    this.datosPasos.txtBtnSig = 'Continuar';
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
      rfc: "LEQI8101314S7",
      cve_unidad_administrativa: this.solicitudeState.representacion,
      //No se sabe
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
        //Preguntar si es el de autorizado
        ide_tipo_exportador: this.solicitudeState.informacionRadios,
        solicita_exportador_aut: this.solicitudeState.exportadorAutorizado,
        /** Solicita exportador autorizado Japón preguntar como se manda maso menos tengo la idea */
        solicita_exportador_aut_jpn: this.solicitudeState.exportadorAutorizadoJPN,
        ide_condicion_exportador_aut_jpn: this.solicitudeState.informacionRadiosJPN,
        separacion_contable: this.solicitudeState.metodoSeparacion,
        ide_condicion_exportador_aut: this.solicitudeState.informacionRadios,
        mercancia_asociada_sol: {
          id_solicitud: null,
          //de servicio validar las trae Preguntar por que en unas es striny otra number
          id_descripcion_alterna_ue: null,
          id_descripcion_alterna_aelc: null,
          id_descripcion_alterna_sgp: null,
          id_descripcion_alterna_ace: null,

          nombre_comercial: this.solicitudeState.nombreComercial,
          nombre_ingles: this.solicitudeState.nombreIngles,
          fraccion_arancelaria: this.solicitudeState.fraccionArancelaria,
          precio_franco_fabrica: this.solicitudeState.francofabrica,
          valor_transaccional: this.solicitudeState.valorTransaccion,
          //Valor Costo Neto en dolares 
          costo_neto: this.solicitudeState.costoNetoDolares,
          //Valor Input Valor FOB(en dolares)
          valor_transaccional_fob: this.solicitudeState.valorFobDolares,
          //Cuando venga esta en true mostrar_tipo_metodo_alianza_p mostrar otro input de costo neto
          costo_neto_ap: this.solicitudeState.costoNetoDolares,
          //Preguntar combo nuevo
          unidad_medida_comercial: this.solicitudeState.unidadMedidaPeso,

          unidad_medida_tarifaria: null,
          peso_acumulado_textil: null,
          peso_insumos_no_originarios: null,

          peso_es_requerido: this.solicitudeState.validacionFraccionArancelaria.mercancia.peso_es_requerido,
          volumen_es_requerido: this.solicitudeState.validacionFraccionArancelaria.mercancia.volumen_es_requerido,

          //Tab tratados vistas ocultas --Preguntar si me los regresan en validar
          acumulacion_uruguay: this.solicitudeState.acumulacion_uruguay,
          materiales_fungibles_uruguay: this.solicitudeState.materiales_fungibles_uruguay,
          materiales_intermedios_uruguay: this.solicitudeState.materiales_intermedios_uruguay,
          criterio_origen_uruguay: this.solicitudeState.criterio_origen_uruguay,
          // 
          acumulacion_peru: this.solicitudeState.acumulacion_peru,
          materiales_fungibles_peru: this.solicitudeState.materiales_fungibles_peru,
          materiales_intermedios_peru: this.solicitudeState.materiales_intermedios_peru,
          criterio_origen_peru: this.solicitudeState.criterio_origen_peru,
          // para parte de otras instancias si es true mandar S o N es lo mismo para la parte de alianza P
          acumulacion: this.solicitudeState.acumulacion_instancias ? "S" : "N",
          materiales_fungibles: this.solicitudeState.materiales_fungibles_instancias ? "S" : "N",
          materiales_intermedios: (this.solicitudeState.materiales_intermedios_instancias || this.solicitudeState.materiales_intermedios_ap) ? "S" : "N",
          //parte de alianza p
          acumulacion_ap: this.solicitudeState.acumulacion_ap,
          requiere_juegos_o_surtidos: this.solicitudeState.materiales_fungibles_ap ? "S" : "N",

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
            cve_pais: item.cvePais,
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
            ide_tipo_insumo: "TIPIN.01",
            peso: item.peso,
            volumen: item.volumen,
            cve_pais: item.cvePais,
            cve_unidad_medida: null,
            rfc_fabricante_productor: item.rfc,
            descripcion: null,
            //Preguntar si en validar no trae insumo y empaques
            criterios_tratados: this.solicitudeState.envasesCriteriosDatos.map(criterio =>({
              id_criterio_tratado: criterio.id_criterio_tratado,
              id_solicitud: null,
              cve_grupo_criterio: criterio.cve_grupo_criterio,
              id_bloque: criterio.id_bloque,
              id_tratado_acuerdo: criterio.id_tratado_acuerdo,
              cve_pais: criterio.cve_pais,
              cve_tratado_acuerdo: criterio.cve_tratado_acuerdo,
              cve_tratado_acuerdo_bloque: criterio.cve_tratado_acuerdo_bloque,
            })
            ),
          } as EmpaqueMercancia)
          ),
          //Preguntar que si no mando yo la cve agarrar la de la respuesta de validar
          id_fraccion_naladi: this.evaluarSolicitudResponse.mercancia.fraccion_naladi.id_fraccion,//al inicio va null, pero despues de endpoint de validacion previa a guardado, el dato se llena con el response
          cve_fraccion_naladi: this.solicitudeState.clasificacionNaladi,
          id_fraccion_naladisa93: this.evaluarSolicitudResponse.mercancia.fraccion_naladi_93.id_fraccion,
          cve_fraccion_naladisa93: this.solicitudeState.clasificacionNaladi1993,
          id_fraccion_naladisa96: this.evaluarSolicitudResponse.mercancia.fraccion_naladi_96.id_fraccion,
          cve_fraccion_naladisa96: this.solicitudeState.clasificacionNaladi1996,
          id_fraccion_naladisa02: this.evaluarSolicitudResponse.mercancia.fraccion_naladi_02.id_fraccion,
          cve_fraccion_naladisa02: this.solicitudeState.clasificacionNaladi2002,

          descripcion_juego: this.solicitudeState.juegos_surtidos_tab_procesos,
          //Preguntar si son el los radios de mercancia
          tipo_metodo: this.solicitudeState.valorMetodoRadioUruguayPanama
        },
      },
      //Se cambio por response validar
      criterios_tratados: this.evaluarSolicitudResponse.tratados_agregados.map(item =>({
        id_criterio_tratado: null,
        id_solicitud: null,
        cve_grupo_criterio: item.cve_grupo_criterio,
        id_bloque: item.id_bloque,
        id_tratado_acuerdo: item.id_tratado_acuerdo,
        cve_pais: item.cve_pais,
        cve_tratado_acuerdo: item.cve_tratado_acuerdo,
        cve_tratado_acuerdo_bloque: item.cve_bloque,
        cumple_juego: item.cumple_juego,
        cumple_acumulacion: item.cumple_acumulacion,
        ide_tipo_proceso_mercancia: item.ide_tipo_proceso_mercancia
      })),
      entidad_federativa: {
        id_solicitud: null,
        cve_entidad: this.solicitudeState.entidad,
      },
      declaraciones_solicitud: this.solicitudeState.declaracion_solicitud.map(item=>({
        id_solicitud: null,
        cve_declaracion: item.clave,
        aceptado:  this.solicitudeState.protesto_verdad ? 1 : 0 
      })),
      procesos: this.solicitudeState.validacionFraccionArancelaria?.mercancia?.procesos_solicitados?.map(proceso => ({
        id_proceso_ceror: proceso.id_proceso_ceror ? proceso.id_proceso_ceror.toString() : null,
        aprobado: proceso.cumple_proceso ?? null
      })) || []
    };
    console.log('Payload de solicitud completa:', PAYLOAD);

    this.solicitudService.postSolicitudGuardar(PAYLOAD)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.tramite110101Store.setId_solicitud(response.datos ?? 0);
            this.mostrarMensaje = false;
            this.mostrarMensajeServicio = false;
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

  /**
   * @method validarSolicitudCompleta
   * @description
   * Envía una solicitud al servicio para validar si la solicitud está completa.
   */
  validarSolicitudCompleta(onSuccessCallBack?: () => void): void {
    const PAYLOAD: RegistroCuestionarioRequest = {
      rfc: "LEQI8101314S7",
      clave_entidad: this.solicitudeState.entidad,
      //Cambiar de momento
      clave_entidad_solicitante: "DGO",
      clave_unidad_admin: this.solicitudeState.representacion,
      //Se agregan del primer tab 
      tratados_agregados: this.solicitudeState.respuestaServicioDatosTabla.map(item => ({
        tratado_acuerdo: {
          cve_tratado_acuerdo: item.cve_tratado_acuerdo,
          id_tratado_acuerdo: item.id_tratado_acuerdo
        },
        cve_grupo_criterio: item.cve_grupo_criterio,
        cve_pais: item.cve_pais,
        id_bloque: item.id_bloque,
        cve_bloque:item.cve_tratado_acuerdo_bloque,
        nombre_pais_o_bloque: item.nombre_pais_bloque
      })),
      registro_cuestionario: {
        // //Se guarda de tab datos adicionales--  ¿Desea usar la opción del método de separación contable?
        separacion_contable: this.solicitudeState.metodoSeparacion,
        //Se guarda de tab datos adicionales-- radio ¿Desea usar la opción de exportador autorizado?:
        solicita_exportador_autorizado: this.solicitudeState.exportadorAutorizado,
        //Se guarda de tab datos adicionales-- que muestra ¿Desea usar la opción de exportador autorizado?
        ide_condicion_exportador_autorizado: this.solicitudeState.informacionRadios,
        //TOdavia no se sabe esta en datos adicionales si trae la bandera de mostrar_exportador_autorizado_jpn
        solicita_exportador_autorizado_jpn: this.solicitudeState.exportadorAutorizadoJPN,
        ide_condicion_exportador_autorizado_jpn: this.solicitudeState.informacionRadiosJPN,
        mercancia: {
          //Tab tratados-- parte oculta de alianza p
          requiere_juegos_o_surtidos: this.solicitudeState.materiales_fungibles_ap,
          acumulacion_ap: this.solicitudeState.acumulacion_ap,
          //Tab datos mercancia radios -- falta probar
          ide_tipo_metodo: this.solicitudeState.valorMetodoRadioUruguayPanama,

          //Tab tratados-- parte oculta de uruguay
          materiales_intermedios_uruguay: this.solicitudeState.materiales_intermedios_uruguay,
          materiales_fungibles_uruguay: this.solicitudeState.materiales_fungibles_uruguay,
          acumulacion_uruguay: this.solicitudeState.acumulacion_uruguay,
           //Flujo captura conde tab mercancia 
          ide_tipo_metodo_mercancia_uruguay: this.solicitudeState.valorMetodoRadioUruguayPanama,
          ide_tipo_metodo_mercancia_alianza_p: this.solicitudeState.valorMetodoRadioP,
          //cuando es con uruguay y panama  tab mercancia 
          ide_tipo_metodo_mercancia_panama: this.solicitudeState.valorMetodoRadioPanama,
          //cuando sea panama solo tab mercancia
          ide_tipo_metodo_mercancia: this.solicitudeState.valorMetodoRadioPanama,

          //Tab tratados-- parte oculta de peru
          //este no existe  y falta el de criterio como uruguay
          materiales_intermedios_peru: this.solicitudeState.materiales_intermedios_peru,
          materiales_fungibles_peru: this.solicitudeState.materiales_fungibles_peru,
          acumulacion_peru: this.solicitudeState.acumulacion_peru,

          //mostrar_juegos_y_surtidos radios de si o no  tab adicionales
          cumple_juegos_surtidos_peru: this.solicitudeState.juegosSurtidosBooleanMexicoPeru,
          cumple_juegos_surtidos_alianza_p: this.solicitudeState.juegosSurtidosBooleanAlianzaPacifico,
          cumple_juegos_surtidos: this.solicitudeState.juegosSurtidosBooleanMexicoPanama,
          
          //Tab tratados-- otras instancias
          materiales_intermedios: this.solicitudeState.materiales_intermedios_instancias || this.solicitudeState.materiales_intermedios_ap,
          materiales_fungibles: this.solicitudeState.materiales_fungibles_instancias,
          acumulacion: this.solicitudeState.acumulacion_instancias,

          //seria de radios de Proceso de Transformación (ACE-53/PAR-4)
          ide_tipo_proceso_mercancia: this.solicitudeState.transformacion53 ,
          tipo_proceso_mercancia: this.solicitudeState.transformacion53,
          //tab mmercancia campo nombre mercancia 
          nombre_comercial: this.solicitudeState.nombreComercial,
          
          insumos: this.solicitudeState.insumosTablaDatos.map(insumo => ({
            ide_tipo_insumo: "TIPIN.02",
            importe_valor: insumo.valorEnDolares,
            peso: insumo.peso,
            volumen: insumo.volumen,
            nombre: insumo.nombreTecnico,
            desc_proveedor: insumo.proveedor,
            desc_fabricante_productor: insumo.fabricanteOProductor,
            cve_fraccion: insumo.fraccionArancelaria,
            fraccion_arancelaria_prevalidada: false,
            cve_pais: insumo.cvePais,
            rfc_fabricante_productor: insumo.rfc,
            tratados_originarios: this.solicitudeState.insumoCriteriosDatos.map(criterio => ({
              cve_pais: criterio.cve_pais,
              id_bloque: criterio.id_bloque,
              cve_bloque: criterio.cve_tratado_acuerdo_bloque,
              cve_tratado_acuerdo: criterio.cve_tratado_acuerdo,
            }))
          } as Insumo)),
          empaques: this.solicitudeState.envasesTablaDatos.map(empaque => ({
            ide_tipo_insumo: "TIPIN.01",
            importe_valor: empaque.valorEnDolares,
            peso: empaque.peso,
            volumen: empaque.volumen,
            nombre: empaque.nombreTecnico,
            desc_proveedor: empaque.proveedor,
            desc_fabricante_productor: empaque.fabricanteOProductor,
            cve_fraccion: empaque.fraccionArancelaria,
            fraccion_arancelaria_prevalidada: false,
            cve_pais: empaque.cvePais,
            rfc_fabricante_productor: empaque.rfc,
            tratados_originarios: this.solicitudeState.envasesCriteriosDatos.map(criterio => ({
              cve_pais: criterio.cve_pais,
              id_bloque: criterio.id_bloque,
              cve_bloque: criterio.cve_tratado_acuerdo_bloque,
              cve_tratado_acuerdo: criterio.cve_tratado_acuerdo
            }))
          } as Empaque)
          ),
          //Se puso datos del guardado de procesos
          procesos_solicitados:this.solicitudeState.validacionFraccionArancelaria?.mercancia?.procesos_solicitados?.map(proceso => ({
            id_proceso_ceror: proceso.id_proceso_ceror,
            cumple_proceso: proceso.cumple_proceso
          })) || [],
          //Tab mercancia el de fraccion arancelaria
          cve_fraccion: this.solicitudeState.fraccionArancelaria,
          //Al principio se manda en null cuando valide el response ya las trae
          id_descripcion_alterna_ue: null,
          id_descripcion_alterna_aelc: null,
          id_descripcion_alterna_sgp: null,
          id_descripcion_alterna_ace:  null,

          // de validar fraccion
          peso_es_requerido: this.solicitudeState.validacionFraccionArancelaria.mercancia.peso_es_requerido,
          volumen_es_requerido: this.solicitudeState.validacionFraccionArancelaria.mercancia.volumen_es_requerido,
          
          //INPUT Valor FOB (en dolares)
          valor_transaccional_fob: this.solicitudeState.valorFobDolares,
          //creemos que es Valor de transacción -tab mercancia 
          valor_transaccion: this.solicitudeState.valorTransaccion,
          //Cuando venga esta en true mostrar_tipo_metodo_alianza_p mostrar otro input de costo neto checar qa
          costo_neto_ap: this.solicitudeState.costoNetoDolares,
          //segun la ia es Costo neto (en dólares)*:
          costo_neto: this.solicitudeState.costoNetoDolares,
          //Esta comentado en el codigo original
          costo_unitario: null,

          precio_franco_fabrica: this.solicitudeState.francofabrica,
          nombre_ingles: this.solicitudeState.nombreIngles,
          //Tab adicionales input Descripcion del jeugo o surtido
          descripcion_juego: this.solicitudeState.juegos_surtidos_tab_procesos,
          cumple_acumulacion: false,          
          cve_fraccion_naladi: this.solicitudeState.clasificacionNaladi,
          cve_fraccion_naladisa93: this.solicitudeState.clasificacionNaladi1993,
          cve_fraccion_naladisa96: this.solicitudeState.clasificacionNaladi1996,
          cve_fraccion_naladisa02: this.solicitudeState.clasificacionNaladi2002,
          //Ya salio en el modal
          peso:null,
          volumen: null,
        }
      }
    };
    console.log('Payload de solicitud completa validar:', PAYLOAD);

    this.solicitudService.postValidarSolicitudCompleta(PAYLOAD)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            if(response.datos?.errores?.length && response.datos.errores.length > 0){
                this.mostrarMensajeServicio = true;
                this.mensajeErrores = response.datos.errores; 
              return;
            }
           this.evaluarSolicitudResponse = response.datos ?? {} as ValidarSolicitudResponse;
           this.tramite110101Store.addTratadosServicioEvaluar(this.evaluarSolicitudResponse.tratados_agregados)
            if (onSuccessCallBack) {
            onSuccessCallBack();
           }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error para validar la solicitud.',
              mensaje: response.causa || response.mensaje || 'Error para validar la solicitud.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const MENSAJE = error?.error?.error || 'Error para generar la cadena original.';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }
}