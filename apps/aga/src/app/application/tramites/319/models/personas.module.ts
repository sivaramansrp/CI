/**
 * @interface Personas
 * @description Representa el modelo de datos para una persona.
 * @property {string} rfc - Registro Federal de Contribuyentes de la persona.
 * @property {string} curp - Clave Única de Registro de Población de la persona.
 * @property {string} nombre - Nombre de la persona.
 * @property {string} primer_apellido - Primer apellido de la persona.
 * @property {string} segundo_apellido - Segundo apellido de la persona.
 * @property {string} correo_electronico - Dirección de correo electrónico de la persona.
 */
export interface Personas {
  rfc: string;
  curp: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  correo_electronico: string;
  }
  /**
   * Interfaz que representa la estructura de datos para solicitar información.
   * 
   * @property {number} [id] - Identificador único opcional.
   * @property {string} periodo - Periodo de tiempo asociado.
   * @property {string} fechas_sobre_el_periodo - Fechas relacionadas con el periodo.
   */
  export interface Solicitar{
  id?:number;
  periodo : string;
  fechas_sobre_el_periodo :string;
  }

