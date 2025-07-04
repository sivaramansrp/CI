/**
 * @fileoverview Modelos e interfaces auxiliares para el trámite de Certificado Zoosanitario.
 * Incluye estructuras para pasos de wizard, respuestas de API, bancos, acciones de botones y opciones de radio.
 * @module certificadoZoosanitarioModel
 */

/**
 * Interfaz para representar un paso dentro de un asistente tipo "wizard".
 * Contiene información sobre el índice del paso, su título, y si se encuentra activo o completado.
 * 
 * @interface ListaPasosWizard
 * @property {number} indice - El número de índice del paso dentro del flujo del asistente.
 * @property {string} titulo - El título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso actual está activo o seleccionado.
 * @property {boolean} completado - Indica si el paso fue completado por el usuario.
 */
export interface ListaPasosWizard {
    indice: number;
    titulo: string;
    activo: boolean;
    completado: boolean;
}

/**
 * Interfaz genérica para representar la respuesta estructurada de una API REST.
 * 
 * @template T - Tipo de dato esperado como respuesta.
 * @interface RespuestaAPI
 * @property {number} code - Código de respuesta HTTP o interno de la API.
 * @property {T} data - Datos devueltos por la API, que pueden ser de cualquier tipo genérico.
 * @property {string} message - Mensaje descriptivo o informativo que acompaña la respuesta.
 */
export interface RespuestaAPI<T> {
    code: number;
    data: T;
    message: string;
}

/**
 * Interfaz que representa un banco en una lista desplegable o selección.
 * 
 * @interface Banco
 * @property {number} id - Identificador único del banco.
 * @property {string} value - Nombre o valor legible del banco.
 */
export interface Banco {
    id: number;
    value: string;
}

/**
 * Interfaz utilizada para definir el comportamiento de botones de navegación,
 * como avanzar o retroceder entre pasos de un asistente (wizard).
 * 
 * @interface AccionBoton
 * @property {string} accion - Tipo de acción: 'cont' para continuar o 'atras' para regresar.
 * @property {number} valor - Índice del paso al que se desea navegar.
 */
export interface AccionBoton {
    accion: string;
    valor: number;
}

/**
 * Interfaz que define una opción para un control de selección tipo radio button.
 * 
 * @interface RadioOpcion
 * @property {string} label - Etiqueta visible para el usuario.
 * @property {string} value - Valor interno asignado a la opción seleccionada.
 */
export interface RadioOpcion {
    label: string;
    value: string;
}   

/**
 * Representa los datos de un formulario fitosanitario para trámites de importación o inspección.
 *
 * @property {string} aduanaDeIngreso - Nombre de la aduana por donde ingresa la mercancía.
 * @property {string} oficinaDeInspeccion - Oficina responsable de la inspección.
 * @property {string} puntoDeInspeccion - Punto específico donde se realiza la inspección.
 * @property {string} [numeroDeGuia] - Número de guía de la mercancía (opcional).
 * @property {string} regimen - Régimen aduanero aplicable.
 * @property {string} [numeroDeCarro] - Número del carro o vehículo de transporte (opcional).
 * @property {string} [tipoDeRequisito] - Tipo de requisito solicitado (opcional).
 * @property {string} [requisito] - Descripción del requisito (opcional).
 * @property {string} [numeroCertificadoInternacional] - Número de certificado internacional (opcional).
 * @property {string} [fraccionArancelaria] - Fracción arancelaria del producto (opcional).
 * @property {string} [descripcionFraccion] - Descripción de la fracción arancelaria (opcional).
 * @property {string} [nico] - Número de Identificación Comercial (opcional).
 * @property {string} [descripcionNico] - Descripción del NICO (opcional).
 * @property {string} [descripcion] - Descripción general del producto (opcional).
 * @property {string | number} [cantidadUMT] - Cantidad en Unidad de Medida de Transporte (opcional).
 * @property {string} [umt] - Unidad de Medida de Transporte (opcional).
 * @property {string | number} [cantidadUMC] - Cantidad en Unidad de Medida Comercial (opcional).
 * @property {string} [umc] - Unidad de Medida Comercial (opcional).
 * @property {string} [uso] - Uso o destino del producto (opcional).
 * @property {string} [tipoDeProducto] - Tipo de producto transportado (opcional).
 */
export interface DatosForma {
    aduanaDeIngreso: string;
    oficinaDeInspeccion: string;
    puntoDeInspeccion: string;
    numeroDeGuia?: string;
    regimen: string;
    numeroDeCarro?: string;
    tipoDeRequisito?: string;
    requisito?: string;
    numeroCertificadoInternacional?: string;
    fraccionArancelaria?: string;
    descripcionFraccion?: string;
    nico?: string;
    descripcionNico?: string;
    descripcion?: string;
    cantidadUMT?: string | number;
    umt?: string;
    cantidadUMC?: string | number;
    umc?: string;
    uso?: string;
    tipoDeProducto?: string;
    tipoMercancia?: string; // Tipo de mercancía, por ejemplo, "animal", "vegetal", etc.
}

