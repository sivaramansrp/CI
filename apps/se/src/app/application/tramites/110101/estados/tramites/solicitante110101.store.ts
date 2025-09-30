import { CriterioConfiguracionResponse } from '../../models/response/tratado-configuracion-request.model';
import { CriterioTratadoResponse } from '../../models/response/tratado-criterio-response.model';
import { DeclaracionDatosResponse } from '../../models/response/declaracion-datos-response.model';
import { FraccionValidarResponse } from '../../models/response/validar-fraccion-response.model';

import { DatosMercanciaModalTabla, EnvasesTabla, InsumosTabla } from '../../models/panallas110101.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * **Estado del formulario de solicitante**
 *
 * Representa la estructura del estado para los datos del solicitante en el trámite 110101.
 */
export interface Solicitante110101State {
  /** RFC del solicitante. */
  rfc: string;
  /** denominacion del solicitante. */
  denominacion: string;
  /** Actividad económica del solicitante. */
  actividadEconomica: string;
  /** Correo electrónico del solicitante. */
  correoElectronico: string;
  /** País del solicitante. */
  pais: string;
  /** Denominación o razón social del solicitante. */
  tratado: string;
  /** Actividad económica principal del solicitante. */
  origen: string;
  /** Criterio Instancia de uruguay. */
  criterio: string;
  /** nombreComercial del solicitante. */
  nombreComercial: string | null;
  /** Nombre en inglés del solicitante. */
  nombreIngles: string | null;
  /** Fracción arancelaria del producto o servicio. */
  fraccionArancelaria: string | null;
  /** Descripción del producto o servicio. */
  descripcion: string;
  /** Valor de la transacción en moneda local. */
  valorTransaccion: number | null;
 /** Valor de la franco fabrica */
  francofabrica: number | null;
  /** Entidad a la que pertenece el solicitante. */
  entidad: string;
  /** Representación legal o administrativa del solicitante. */
  representacion: string | null;
    /** Método de separación contable seleccionado por el solicitante. */
  metodoSeparacion: boolean;
    /** Opción de exportador autorizado seleccionada por el solicitante. */
  exportadorAutorizado: boolean;
    /** Información seleccionada en los radios del formulario por el solicitante. */
  informacionRadios: string | null;

  /** Datos de la tabla de respuesta del servicio */
  respuestaServicioDatosTabla: CriterioTratadoResponse[];

  /** Datos de configuracion tratados */
  respuestaServiceConfiguracion: CriterioConfiguracionResponse;

  /** Datos de servicio de fraccion arancelaria */
  validacionFraccionArancelaria: FraccionValidarResponse;

  /** Un array de objetos que representa los insumos registrados */
  insumosTablaDatos: InsumosTabla[];

  /** Un array de objetos que contiene los criterios de tratados asociados a los insumos */
  insumoCriteriosDatos: DatosMercanciaModalTabla[];

  /** Un array de objetos que representa los empaques registrados */
  envasesTablaDatos: EnvasesTabla[];

  /** Un array de objetos que contiene los criterios de tratados asociados a los envases */
  envasesCriteriosDatos: DatosMercanciaModalTabla[];

  /** Un array de objetos que contiene los datos de declaración de la solicitud */
  declaracion_solicitud: DeclaracionDatosResponse[];

  /** Valor para check protesto */
  protesto_verdad: boolean;

  /** Valor habilitar tab Procesos */
  tab_procesos: boolean;
}


/**
 * **Función para crear el estado inicial del solicitante**
 *
 * Esta función devuelve un estado inicial vacío para los datos del solicitante en el trámite 110101.
 * Se utiliza para inicializar el store con valores predeterminados.
 *
 * @returns {Solicitante110101State} Estado inicial del solicitante con valores vacíos.
 */
export function createSolicitanteInitialState(): Solicitante110101State {
  return {
    rfc: '',
    denominacion: '',
    actividadEconomica: '',
    correoElectronico: '',
    pais: '',
    tratado: '',
    origen: '',
    criterio: '',
    nombreComercial: null,
    nombreIngles: null,
    fraccionArancelaria: null,
    francofabrica:null,
    descripcion: '',
    valorTransaccion: null,
    entidad: '',
    representacion: '',
    metodoSeparacion: false,
    exportadorAutorizado: false,
    informacionRadios: null,
    respuestaServicioDatosTabla: [],
    respuestaServiceConfiguracion: {
      mostrar_datos_mercancia: false,
      mostrar_insumos: false,
      mostrar_empaques: false,
      mostrar_otras_instancias: false,
      mostrar_otras_instancias_alianza_p: false,
      mostrar_tipo_metodo_alianza_p: false,
      mostrar_juegos_y_surtidos_alianza_p: false,
      mostrar_acumulacion_alianza_p: false,
      mostrar_juegos_y_surtidos: false,
      mostrar_tipo_metodo: false,
      mostrar_nombre_ingles: false,
      mostrar_precio_franco_fabrica: false,
      mostrar_clasificacion_aladi: false,
      mostrar_valor_transaccional_fob: false,
      mostrar_exportador_autorizado: false,
      mostrar_procesos_mercancia_par4: false,
      mostrar_pais_insumo: false,
      mostrar_exportador_autorizado_jpn: false,
      mostrar_tipo_metodo_panama: false,
      mostrar_tipo_metodo_no_obligatorio_panama: false,
      mostrar_tipo_metodo_panama_uruguay: false,
      mostrar_encabezado_uruguay: false,
      mostrar_costo_neto_fob: false,
      mostrar_otras_instancias_peru: false,
      mostrar_otras_instancias_uruguay: false,
      mostrar_naladi: false,
      mostrar_naladisa_93: false,
      mostrar_naladisa_96: false,
      mostrar_naladisa_02: false
    },
    validacionFraccionArancelaria:{
      descripcion: '',
      peso_requerido: null,
      volumen_requerido: null,
      mercancia:{
        peso_es_requerido: null,
        volumen_es_requerido: null,
        proceso_es_requerido: false,
        peso_textil_es_requerido: false,
        descripcion_alterna_modificada: null,
        procesos_solicitados: []
      },
      has_errors: false,
      error_message: null,
      cumple_acumulacion: false
    },
    insumosTablaDatos: [],
    insumoCriteriosDatos: [],
    envasesTablaDatos: [],
    envasesCriteriosDatos: [],
    declaracion_solicitud:[],
    protesto_verdad: false,
    tab_procesos: false
  };
}


/**
 * Store para gestionar el estado de los datos del solicitante.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitante', resettable: true })
export class Tramite110101Store extends Store<Solicitante110101State> {
   /**
   * **Constructor de la tienda**
   *
   * - Inicializa el estado de la tienda con los valores predeterminados definidos en `createSolicitanteInitialState()`.
   * - Garantiza que la tienda comience con una estructura de datos válida para el solicitante.
   *
   * @constructor
   */
   constructor() {
    super(createSolicitanteInitialState());
  }

  /**
   * Actualiza el estado con el RFC especificado.
   * @param rfc - El RFC a establecer en el estado.
   */
  public setRfc(rfc: string):void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Actualiza el estado con la denominación especificada.
   * @param denominacion - La denominación a establecer en el estado.
   */
  public setDenominacion(denominacion: string):void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Actualiza el estado con la actividad económica especificada.
   * @param actividadEconomica - La actividad económica a establecer en el estado.
   */

  public setActividadEconomica(actividadEconomica: string):void {
    this.update((state) => ({
      ...state,
      actividadEconomica,
    })); 
  }

  /**
   * Actualiza el estado con el correo electrónico especificado.
   * @param correoElectronico - El correo electrónico a establecer en el estado.
   */ 
  public setCorreoElectronico(correoElectronico: string):void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param pais - El país a establecer en el estado.
   */
  public setPais(pais: string):void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
   * Actualiza el estado del criterio instacia.
   * @param criterio - El país a establecer en el estado.
   */
  public setCriterioInstancia(criterio: string):void {
    this.update((state) => ({
      ...state,
      criterio,
    }));
  }


  /**
   * Actualiza el estado con el país especificado.
   * @param tratado - El país a establecer en el estado.
   */
  public setTratado(tratado: string):void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param origen - El país a establecer en el estado.
   */
  public setOrigen(origen: string):void {
    this.update((state) => ({
      ...state,
      origen,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param nombreComercial - El país a establecer en el estado.
   */
  public setNombreComercial(nombreComercial: string | null):void {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param nombreIngles - El país a establecer en el estado.
   */
  public setNombreIngles(nombreIngles: string | null):void {
    this.update((state) => ({
      ...state,
      nombreIngles,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param fraccionArancelaria - El país a establecer en el estado.
   */
  public setFraccionArancelaria(fraccionArancelaria: string | null):void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Actualiza el estado con el franco fabrica
   * @param francofabrica - El precio en dolares.
   */
  public setFrancofabrica(francofabrica: number | null):void {
    this.update((state) => ({
      ...state,
      francofabrica,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param descripcion - El país a establecer en el estado.
   */
  public setDescripcion(descripcion: string):void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param valorTransaccion - El país a establecer en el estado.
   */
  public setValorTransaccion(valorTransaccion: number | null):void {
    this.update((state) => ({
      ...state,
      valorTransaccion,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param entidad - El país a establecer en el estado.
   */
  public setEntidad(entidad: string):void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  /**
   * Actualiza el estado con el país especificado.
   * @param representacion - El país a establecer en el estado.
   */
  public setRepresentacion(representacion: string | null):void {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }

  /**
   * Actualiza el estado con el valor de método de separación especificado.
   * @param metodoSeparacion - El valor booleano a establecer en el estado.
   */
  public setMetodoSeparacion(metodoSeparacion: boolean): void {
    this.update((state) => ({
      ...state,
      metodoSeparacion,
    }));
  }

  /**
   * Actualiza el estado con el valor de exportador autorizado especificado.
   * @param exportadorAutorizado - El valor booleano a establecer en el estado para la opción de exportador autorizado.
   */
  public setExportadorAutorizado(exportadorAutorizado: boolean): void {
    this.update((state) => ({
      ...state,
      exportadorAutorizado,
    }));
  }

  /**
   * Actualiza el estado con el valor seleccionado en los radios del formulario.
   * @param informacionRadios - El valor seleccionado a establecer en el estado para la información de los radios.
   */
  public setInformacionRadios(informacionRadios: string | null): void {
    this.update((state) => ({
      ...state,
      informacionRadios,
    }));
  }

  /**
   * Actualiza el estado con la respuesta de la tabla.
   * @param datosTabla - El array de criterios de tratado.
   */
  public setRespuestaServicioDatosTabla(datosTabla: CriterioTratadoResponse[]): void {
    this.update((state) => ({
      ...state,
      respuestaServicioDatosTabla: datosTabla,
    }));
  }

  /**
   * Limpia la tabla de criterios.
   */
  public clearRespuestaServicioDatosTabla(): void {
    this.update((state) => ({
      ...state,
      respuestaServicioDatosTabla: [],
    }));
  }

  /**
   * Actualiza el estado con la respuesta de la configuracion.
   * @param datosConfiguracion - El array de criterios de tratado.
   */
  public setRespuestaServicioDatosConfiguracion(datosConfiguracion: CriterioConfiguracionResponse): void {
    this.update((state) => ({
      ...state,
      respuestaServiceConfiguracion: datosConfiguracion,
    }));
  }

   /**
   * Limpia la configuracion de tratados.
   */
  public clearRespuestaServicioDatosConfiguracion(): void {
    this.update((state) => ({
      ...state,
      respuestaServiceConfiguracion: {} as CriterioConfiguracionResponse,
    }));
  }

  /**
   * Actualiza el estado con la respuesta de validar fraccion arancelaria.
   * @param datos- El array de fraccion.
   */
  public setRespuestaServicioValidarFraccion(datos: FraccionValidarResponse): void {
    this.update((state) => ({
      ...state,
      validacionFraccionArancelaria: datos,
    }));
  }

   /**
   * Limpia la fraccion
   */
  public clearRespuestaServicioValidarFraccionArancelaria(): void {
    this.update((state) => ({
      ...state,
      validacionFraccionArancelaria: {} as FraccionValidarResponse,
    }));
  }

  /**
   * Agrega un nuevo insumo al estado `insumosTablaDatos`.
   * @param insumo - El objeto `InsumosTabla` a insertar en el array.
  */
  public addInsumo(insumo: InsumosTabla[]): void {
    this.update((state) => ({
      ...state,
      insumosTablaDatos: insumo,
    }));
  }

  /**
   * Limpia la lista de insumos, dejando el array vacío.
   */
  public clearInsumos(): void {
    this.update((state) => ({
      ...state,
      insumosTablaDatos: [],
    }));
  }

  /**
   * Agrega un nuevo insumo al estado `DatosMercanciaModalTabla`.
   * @param insumo - El objeto `DatosMercanciaModalTabla` a insertar en el array.
  */
  public addInsumoCriterios(insumoCriterios: DatosMercanciaModalTabla[]): void {
    this.update((state) => ({
      ...state,
      insumoCriteriosDatos: insumoCriterios,
    }));
  }

  /**
   * Limpia la lista de insumos, dejando el array vacío.
   */
  public clearInsumosCriterios(): void {
    this.update((state) => ({
      ...state,
      insumoCriteriosDatos: [],
    }));
  }

  /**
   * Agrega un nuevo empaque al estado `envasesTablaDatos`.
   * @param empaque - El objeto `EnvasesTabla` a insertar en el array.
   */
  public addEmpaque(empaque: EnvasesTabla[]): void {
    this.update((state) => ({
      ...state,
      envasesTablaDatos: empaque,
    }));
  }

  /**
   * Limpia la lista de empaques, dejando el array vacío.
   */
  public clearEmpaques(): void {
    this.update((state) => ({
      ...state,
      envasesTablaDatos: [],
    }));
  }

  /**
   * Agrega un nuevo insumo al estado `DatosMercanciaModalTabla`.
   * @param empaque - El objeto `DatosMercanciaModalTabla` a insertar en el array.
  */
  public addEmpaqueCriterios(empaqueCriterios: DatosMercanciaModalTabla[]): void {
    this.update((state) => ({
      ...state,
      empaqueCriteriosDatos: empaqueCriterios,
    }));
  }

  /**
   * Limpia la lista de empaques criterios, dejando el array vacío.
   */
  public clearEmpaquesCriterios(): void {
    this.update((state) => ({
      ...state,
      empaqueCriteriosDatos: [],
    }));
  }

  /**
   * Agrega una delcaracion `DeclaracionDatosResponse`.
   * @param declaraciones - El objeto `DeclaracionDatosResponse` a insertar en el array.
  */
  public addDeclaraciones(declaraciones: DeclaracionDatosResponse[]): void {
    this.update((state) => ({
      ...state,
      declaracion_solicitud: declaraciones,
    }));
  }

  /**
   * Limpia la lista de declaraciones.
   */
  public clearDeclaraciones(): void {
    this.update((state) => ({
      ...state,
      declaracion_solicitud: [],
    }));
  }

   /**
   * Actualiza el campo protesto decir verdad.
   * @param protesto_verdad - El valor booleano a establecer true o false.
   */
  public setProtesto(protesto_verdad: boolean): void {
    this.update((state) => ({
      ...state,
      protesto_verdad,
    }));
  }

   /**
   * Actualiza el la vista de Proceso.
   * @param tab_procesos - El valor booleano a establecer true o false.
   */
  public setTabProceso(tab_procesos: boolean ): void {
    this.update((state) => ({
      ...state,
      tab_procesos,
    }));
  }
}
