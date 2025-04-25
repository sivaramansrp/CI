/**
 * @interface Personas
 * @description Representa el modelo de datos para una persona.
 * @property {string} RFC - Registro Federal de Contribuyentes de la persona.
 * @property {string} CURP - Clave Única de Registro de Población de la persona.
 * @property {string} Nombre - Nombre de la persona.
 * @property {string} Primer_apellido - Primer apellido de la persona.
 * @property {string} Segundo_apellido - Segundo apellido de la persona.
 * @property {string} Correo_electronico - Dirección de correo electrónico de la persona.
 */
export interface Personas {
    RFC: string;
    CURP: string;
    Nombre: string;
    Primer_apellido: string;
    Segundo_apellido: string;
    Correo_electronico: string;
  }
  /**
   * Interfaz que representa la estructura de datos para solicitar información.
   * 
   * @property {number} [id] - Identificador único opcional.
   * @property {string} Periodo - Periodo de tiempo asociado.
   * @property {string} Fechas_sobre_el_periodo - Fechas relacionadas con el periodo.
   */
  export interface Solicitar{
    id?:number;
    Periodo : string;
    Fechas_sobre_el_periodo :string;
  }