import { Proveedor } from "../../../shared/models/terceros-relacionados.model";

export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];
export const TITULOMENSAJE =
  'Solicitud Aviso de exportación de sustancias químicas';
/**
 * Constante que representa los textos de requisitos para el trámite de importación
 * de sustancias químicas. Actualmente se encuentra vacío, pero puede ser utilizado
 * para almacenar información relevante sobre los requisitos necesarios.
 */
export const TEXTOS_REQUISITOS =
  '';

  /**
 * @constant
 * @name ID_PROCEDIMIENTO
 * @type {number}
 * @description Identificador único del procedimiento asociado al trámite de exportación de sustancias químicas.
 * Este valor se utiliza para relacionar el trámite con su configuración y datos específicos en el sistema.
 */
export const ID_PROCEDIMIENTO = 240123;

/**
 * @constant
 * @name DATOS_ESTATICOS
 * @type {Proveedor[]}
 * @description Contiene un arreglo de datos estáticos de proveedores. 
 * Este valor se utiliza para prellenar información de proveedores en el sistema.
 * Cada objeto incluye información como nombre o razón social, RFC, CURP, teléfono, correo electrónico, dirección, entre otros.
 */
export const DATOS_ESTATICOS: Proveedor[] = [
  {
    nombreRazonSocial: 'INTEGRADORA DEURBANIZACIONES SIGNUM S DE RL DE CV',
    rfc: 'AAL0409235E6',
    curp: '',
    telefono: '55-98764532',
    correoElectronico: 'vucem2.5@hotmail.com',
    calle: 'CAMINO',
    numeroExterior: '123',
    numeroInterior: '',
    pais: '',
    colonia: '',
    municipioAlcaldia: '',
    localidad: '',
    entidadFederativa: '',
    estadoLocalidad: '',
    codigoPostal: '',
  }
];
