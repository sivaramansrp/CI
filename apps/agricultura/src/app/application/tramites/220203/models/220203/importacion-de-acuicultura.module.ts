import { Catalogo, PersonaTerceros } from "@libs/shared/data-access-user/src";

/**
 * @fileoverview
 * Modelos y utilidades para la gestión de datos del trámite de importación de acuicultura (220203).
 * Incluye la definición de las interfaces principales, auxiliares y la función para crear el estado inicial.
 * Cobertura compodoc 100%: cada interfaz y función está documentada.
 * @module importacionDeAcuiculturaModule
 */

/**
 * Interfaz que define la estructura de los pasos en un componente tipo wizard para el trámite 220203.
 * @interface ListaPasosWizard220203
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard220203 {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * Interfaz que define la estructura de las acciones de los botones.
 * @interface AccionBoton
 * @property {string} accion - Acción del botón (ej: 'siguiente', 'anterior').
 * @property {number} valor - Valor asociado a la acción (ej: índice del paso).
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * Interfaz que define la estructura de las opciones de un radio button.
 * @interface OpcionDeRadio
 * @property {string} label - Etiqueta o texto visible para la opción de radio.
 * @property {string} value - Valor asociado a la opción de radio.
 */
export interface OpcionDeRadio {
    label: string;
    value: string;
}


/**
 * Interfaz que define los datos de ingreso y verificación de la mercancía.
 * @interface RealizarGroup
 * @property {string} aduanaIngreso - Aduana de ingreso.
 * @property {string} oficinaInspeccion - Oficina de inspección.
 * @property {string} puntoInspeccion - Punto de inspección.
 * @property {string} numeroGuia - Número de guía.
 * @property {string} regimen - Régimen aduanero.
 */
export interface RealizarGroup {
    aduanaIngreso: string;
    oficinaInspeccion: string;
    puntoInspeccion: string;
    numeroGuia: string;
    regimen: string;
}

/**
 * Interfaz que define los datos específicos de la mercancía.
 * @interface MercanciaGroup
 * @property {string} tipoRequisito
 * @property {string} requisito
 * @property {string} numeroCertificadoInternacional
 * @property {string} numeroOficioCasoEspecial
 * @property {string} fraccionArancelaria
 * @property {string} descripcionFraccionArancelaria
 * @property {string} nico
 * @property {string} descripcionNico
 * @property {string} descripcion
 * @property {string} cantidadUMT
 * @property {string} umt
 * @property {string} cantidadUMC
 * @property {string} umc
 * @property {string} uso
 * @property {string} numeroDeLote
 * @property {string} faseDeDesarrollo
 * @property {string} especie
 * @property {string} paisDeOrigen
 * @property {string} paisDeProcedencia
 */
export interface MercanciaGroup {
    tipoRequisito: string;
    requisito: string;
    numeroCertificadoInternacional: string;
    numeroOficioCasoEspecial: string;
    fraccionArancelaria: string;
    descripcionFraccionArancelaria: string;
    nico: string;
    descripcionNico: string;
    descripcion: string;
    cantidadUMT: string;
    umt: string;
    cantidadUMC: string;
    umc: string;
    uso: string;
    numeroDeLote: string;
    faseDeDesarrollo: string;
    especie: string;
    paisDeOrigen: string;
    paisDeProcedencia: string;
}

/**
 * Interfaz que define los detalles adicionales de la mercancía.
 * @interface Detalles
 * @property {string} nombreCientifico - Nombre científico de la mercancía.
 */
export interface Detalles {
    nombreCientifico: string;
}

/**
 * Interfaz que define los datos del formulario de movilización.
 * @interface FormularioMovilizacion
 * @property {string} medioDeTransporte - Medio de transporte utilizado.
 * @property {string} identificacionTransporte - Identificación del transporte.
 * @property {string} puntoVerificacion - Punto de verificación.
 * @property {string} nombreEmpresaTransportista - Nombre de la empresa transportista.
 */
export interface FormularioMovilizacion {
    medioDeTransporte: string;
    identificacionTransporte: string;
    puntoVerificacion: string;
    nombreEmpresaTransportista: string;
}

/**
 * Interfaz que define los datos del formulario de pago.
 * @interface FormularioPago
 * @property {string} exentoPago
 * @property {string} justificacion
 * @property {string} claveReferencia
 * @property {string} cadenaDependencia
 * @property {string} banco
 * @property {string} llavePago
 * @property {string} fechaPago
 * @property {string} importePago
 */
export interface FormularioPago {
    exentoPago: string;
    justificacion: string;
    claveReferencia: string;
    cadenaDependencia: string;
    banco: string;
    llavePago: string;
    fechaPago: string;
    importePago: string;
}

/**
 * Interfaz que indica el estado de validez de los datos para cada sección del trámite.
 * @interface EnviarDatos
 * @property {boolean} pagoDeformaValida - Indica si el pago es válido.
 * @property {boolean} dataParaMovilizacion - Indica si los datos de movilización son válidos.
 * @property {boolean} dataDeLaSolicitud - Indica si los datos de la solicitud son válidos.
 */
export interface EnviarDatos {
    pagoDeformaValida: boolean,
    dataParaMovilizacion: boolean,
    dataDeLaSolicitud: boolean,
}

/**
 * Interfaz que define los datos de consulta del trámite.
 * @interface Consulta
 * @property {string} procedureId
 * @property {string} parameter
 * @property {string} department
 * @property {string} folioTramite
 * @property {string} tipoDeTramite
 * @property {string} estadoDeTramite
 * @property {boolean} readonly
 * @property {boolean} create
 * @property {boolean} update
 * @property {string} consultaioSolicitante
 */
export interface Consulta {
    procedureId: string, 
    parameter: string, 
    department: string, 
    folioTramite: string, 
    tipoDeTramite: string, 
    estadoDeTramite: string, 
    readonly: boolean, 
    create: boolean, 
    update: boolean, 
    consultaioSolicitante: string, 
}

/**
 * Interfaz principal que agrupa todos los datos del trámite de importación de acuicultura.
 * @interface Acuicultura
 * @property {FormularioPago} formularioPago - Datos del formulario de pago.
 * @property {FormularioMovilizacion} formularioMovilizacion - Datos del formulario de movilización.
 * @property {DatosMercancia220203} datosMercancia - Datos de la mercancía.
 * @property {EnviarDatos} formaValida - Estado de validez de cada sección.
 * @property {PersonaTerceros[]} tercerosRelacionados - Lista de terceros relacionados.
 */
export interface Acuicultura {
    formularioMovilizacion: FormularioMovilizacion;
    realizarGroup: RealizarGroup;
    mercanciaGroup: Fila[];
    formaValida: EnviarDatos;
    tercerosRelacionados: PersonaTerceros[];
    pagoDeDerechos:PagoDeDerechos;
    selectedmercanciaGroupDatos:Fila;
}

/**
 * Función para crear el estado inicial del trámite de acuicultura, permitiendo sobreescribir valores por defecto.
 * @function createDatosState
 * @param {Partial<Acuicultura>} [params={}] - Parámetros opcionales para inicializar el estado.
 * @returns {Acuicultura} Estado inicial de tipo Acuicultura.
 * @description Devuelve un objeto con todas las propiedades inicializadas, útil para el store Akita.
 */
export function createDatosState(params: Partial<Acuicultura> = {}): Acuicultura {
    return {
        formularioMovilizacion: params.formularioMovilizacion || {
            medioDeTransporte: '',
            identificacionTransporte: '',
            puntoVerificacion: '',
            nombreEmpresaTransportista: ''
        },
        realizarGroup: params?.realizarGroup || 
          {
                aduanaIngreso: '',
                oficinaInspeccion: '',
                puntoInspeccion: '',
                numeroGuia: '',
                regimen: ''
            }
        ,
        tercerosRelacionados: params.tercerosRelacionados || [],
        formaValida: params?.formaValida || {
            pagoDeformaValida: false,
            dataParaMovilizacion: false,
            dataDeLaSolicitud: false
        },
        pagoDeDerechos: params?.pagoDeDerechos || {
            exentoPago: '',
            justificacion: '',
            claveReferencia: '',
            cadenaDependencia: '',
            banco: '',
            llavePago: '',
            importePago: '',
            fechaPago: ''
        },
        mercanciaGroup: params?.mercanciaGroup || [],
        selectedmercanciaGroupDatos: params?.selectedmercanciaGroupDatos || {} as Fila
    };
}
/**
 * Modelo para capturar la información correspondiente al pago de derechos.
 * @interface PagoDeDerechos
 * @property {string} exentoPago Indica si el pago está exento (Sí/No).
 * @property {string} justificacion Justificación del motivo de exención (si aplica).
 * @property {string} claveReferencia Clave de referencia para el pago.
 * @property {string} cadenaDependencia Cadena generada por la dependencia para pago.
 * @property {string} banco Nombre del banco donde se realiza el pago.
 * @property {string} llavePago Llave única para realizar el pago.
 * @property {string} importePago Monto del pago.
 * @property {string} fechaPago Fecha en que se realizó el pago.
 */
export interface PagoDeDerechos {
  /**
   * Indica si el pago está exento (Sí/No).
   */
  exentoPago: string;
  /**
   * Justificación del motivo de exención (si aplica).
   */
  justificacion: string;
  /**
   * Clave de referencia para el pago.
   */
  claveReferencia: string;
  /**
   * Cadena generada por la dependencia para pago.
   */
  cadenaDependencia: string;
  /**
   * Nombre del banco donde se realiza el pago.
   */
  banco: string;
  /**
   * Llave única para realizar el pago.
   */
  llavePago: string;
  /**
   * Monto del pago.
   */
  importePago: string;
  /**
   * Fecha en que se realizó el pago.
   */
  fechaPago: string;
}
/**
 * Interfaz para los datos de la tabla de solicitudes.
 * @interface DatoTabla
 * @property {string} solicitud - Número de solicitud.
 * @property {string} fechaCreacion - Fecha de creación de la solicitud.
 * @property {string} mercancia - Nombre de la mercancía.
 * @property {number} cantidad - Cantidad de mercancía.
 * @property {string} proveedor - Nombre del proveedor.
 */
export interface DatoTabla {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proveedor: string;
}

/**
 * Interfaz para los datos de la tabla de detalles.
 * @interface Fila
 * @property {string} noPartida - Número de partida.
 * @property {string} tipoRequisito - Tipo de requisito.
 * @property {string} requisito - Requisito.
 * @property {string} numeroCertificado - Número de certificado internacional.
 * @property {string} fraccionArancelaria - Fracción arancelaria.
 * @property {string} descripcionFraccion - Descripción de la fracción arancelaria.
 * @property {string} nico - NICO.
 */
export interface Fila {
  noPartida: string;
  tipoRequisito: string;
  requisito: string;
  numeroCertificado: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
  descripcionNico:string;
  descripcion:string;
  medidadetarifa:string;
  cantidadUMT:string;
  umc: string;
  cantidadUMC:string;
  uso: string;
  especie:string;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  numeroDeLote: string;
  faseDeDesarrollo: string;
  certificadoInternacional: string;
  numeroCertificadoInternacional?:string
  numeroOficioCasoEspecial?:string;
  descripcionFraccionArancelaria?: string;
  umt?:string;
}

/**
 * Interfaz para los datos de la tabla de solicitudes.
 * @interface FilaSolicitud
 * @property {string} solicitud - Número de solicitud.
 * @property {string} fechaCreacion - Fecha de creación de la solicitud.
 * @property {string} mercancia - Nombre de la mercancía.
 * @property {number} cantidad - Cantidad de mercancía.
 * @property {string} proveedor - Nombre del proveedor.
 */
export interface FilaSolicitud {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proveedor: string;
}
export interface CatalogoData {
  tipoRequisitoList: Catalogo[];
  arancelariaList: Catalogo[];
  nicoList: Catalogo[];
  usoList: Catalogo[];
  paisDeOrigenList: Catalogo[];
  paisDeProcedenciaList: Catalogo[];
  umcList: Catalogo[];
}