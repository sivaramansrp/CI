import { Catalogo } from "@libs/shared/data-access-user/src";

/**
 * Interfaz para representar la nacionalidad mexicana.
 * @interface NacionalidadMaxicana
 */
export interface NacionalidadMaxicana {
  label: string; // Etiqueta visible para el usuario
  value: string; // Valor asociado a la etiqueta
}

/**
 * Interfaz para representar los datos de socios y accionistas.
 * @interface SociaoAccionistas
 */
export interface SociaoAccionistas {
  id?: string; // Identificador único del socio o accionista
  rfc?: string; // Registro Federal de Contribuyentes
  taxId?: string; // Identificación fiscal (Tax ID)
  razonSocial?: string; // Denominación o razón social
  pais?: string; // País de origen
  codigoPostal?: string; // Código postal
  estado?: string; // Estado o región
  correoElectronico?: string; // Correo electrónico
  nombre?: string; // Nombre del socio o accionista
  apellidoPaterno?: string; // Apellido paterno
  apellidoMaterno?: string; // Apellido materno
  cp?: string; // Código postal (abreviado)
}

/**
 * Interfaz para representar la respuesta de los catálogos.
 * @interface RespuestaCatalogos
 */
export interface RespuestaCatalogos {
  code: number; // Código de respuesta (por ejemplo, 200 para éxito)
  data: Catalogo[]; // Lista de elementos del catálogo
  message: string; // Mensaje asociado a la respuesta
}