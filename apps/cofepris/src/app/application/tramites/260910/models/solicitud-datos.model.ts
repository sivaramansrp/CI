import { Destinatario } from '../models/destinatario.model';
import { Fabricante } from '../models/fabricante.model';
import { Facturador } from '../models/facturador.model';
import { Mercancia } from '../models/mercancia.model';
import { Proveedor } from '../models/proveedor.model';
import { SCIAN } from '../models/SCIAN.model';
import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Representa los datos de una solicitud, incluyendo detalles de mercancias y proveedores.
 */
export interface SolicitudDatos {
  /** Fecha en la que se creó la solicitud. */
  fechaCreacion: string;
  
  /** Nombre de la mercancía incluida en la solicitud. */
  mercancia: string;

  /** Cantidad de la mercancía solicitada. */
  cantidad: string;

  /** Nombre del proveedor relacionado con la mercancía. */
  proovedor: string;

  /** Datos del catálogo SCIAN relacionados con la mercancía. */
  SCIANLista: TableData;

  /** Lista opcional de otras mercancías relacionadas. */
  mercancias?: TableData;
}

/**
 * Opciones para los botones de selección por radio.
 */
export interface RadioOptions {
  /** Etiqueta descriptiva de la opción. */
  label: string;

  /** Valor asociado a la opción, que puede ser una cadena o un número. */
  value: string | number;
}

/**
 * Datos relacionados con la solicitud, incluyendo encabezados de tabla y opciones de selección.
 */
export interface DatosDeSolicitud {
  /** Encabezados de las columnas de la tabla. */
  tablaHeadData: string[];

  /** Filas de datos de la tabla, representadas como un arreglo de solicitudes. */
  tablaFilaDatos: SolicitudDatos[];

  /** Opciones para los botones de selección (radio) relacionadas con la solicitud. */
  hacerlosRadioOptions: RadioOptions[];

  /** Opciones para los botones de selección (radio) relacionadas con la solicitud. */
  tipoOperacionOptions: RadioOptions[];

}

/**
 * Representa los datos generales de una solicitud, incluyendo información personal y de operación.
 */
export interface Solicitud {

  /** RFC del responsable sanitario */
  rfcSanitario: string;
  /** Razón social del solicitante. */
  razonSocial: string;

  /** Dirección de correo electrónico del solicitante. */
  correoElectronico: string;

  /** Código postal asociado con el domicilio. */
  codigoPostal: string;

  /** Identificador del estado asociado con el domicilio. */
  estado: number;

  /** Nombre del municipio asociado con el domicilio. */
  municipio: string;

  /** Nombre de la localidad asociada con el domicilio. */
  localidad: string;

  /** Nombre de la colonia asociada con el domicilio. */
  colonia: string;

  /** Nombre de la calle asociada con el domicilio. */
  calle: string;

  /** Código LADA asociado al número telefónico. */
  lada: number;

  /** Número telefónico del solicitante. */
  telefono: number;

  /** Número Clave SCIAN. */
  claveSCIAN: number;

  /** Número Clave descripcion del SCIAN. */
  claveSCIANDesc: number;

  /** Descripción del aviso de funcionamiento del solicitante. */
  avisoDeFuncionamiento: boolean;

  /** Información relacionada con la licencia sanitaria del solicitante. */
  licenciaSanitaria: string;

  /** Información sobre si el producto es fresco, congelado o vive. */
  liveFreshFrozen: string;

  /** Régimen al que pertenece el solicitante. */
  regimen: number;

  /** Aduana asociada con el trámite. */
  aduana: number;

  /** Selección del valor relacionado con la acción "hacerlos". */
  hacerlos: string | number;

  /** Registro Federal de Contribuyentes (RFC) del solicitante. */
  rfc: string;

  /** Razón social del representante legal. */
  legalRazonSocial: string;

  /** Apellido paterno del solicitante. */
  apellidoPaterno: string;

  /** Apellido materno del solicitante. */
  apellidoMeterno: string;
}

/**
 * @interface
 * @name RespuestaConsulta
 * @description
 * Interfaz que representa la respuesta de una consulta.
 */
export interface RespuestaConsulta {
  /**
   * Indica si la consulta fue exitosa.
   */
  success: boolean;

  /**
   * Datos resultantes de la consulta.
   */
  datos: ConsultaDatos;

  /**
   * Mensaje de la respuesta.
   */
  message: string;
}

/**
 * @interface
 * @name ConsultaDatos
 * @description
 * Contiene los datos obtenidos de una consulta.
 */
export interface ConsultaDatos {
    tipoOperacion: string | number;
    observaciones: string;
    rfcSanitario: string;
    razonSocial: string;
    correoElectronico: string;
    codigoPostal: string;
    estado: number;
    municipio: string;
    localidad: string;
    colonia: string;
    calle: string;
    lada: number;
    telefono: number;
    claveSCIAN: number;
    claveSCIANDesc: number;
    avisoDeFuncionamiento: boolean;
    licenciaSanitaria: string;
    liveFreshFrozen: boolean;
    regimen: number;
    aduana: number;
    hacerlos: string | number;
    rfc: string;
    legalRazonSocial: string;
    apellidoPaterno: string;
    apellidoMeterno: string;
    mercanciasDatos: Mercancia[];
    SCIANDatos: SCIAN[];
    manifesto: boolean;
    clasificaionProductos: string;
    especificarProducto: number;
    nombreProductoEspecifico: string;
    distintiva: string;
    cientifico: string;
    tipoProducto: number;
    farmaceutica: number;
    fisico: number;
    fraccionArancelaria: string;
    descripcionFraccionArancelaria: string;
    cantidadUMT: string;
    umt: string;
    cantidadUMC: string;
    umc: number;
    presentacionFarmaceutica: string;
    registroSanitario: number;
    fechaCaducidad: string;
    tipoPersona: string | number;
    modificarRFC: string;
    denominacion: string;
    domicilioPais: number;
    domicilioEstado: number;
    domicilioMunicipio: number;
    domicilioLocalidad: number;
    domicilioCodigo: number;
    domicilioColonia: number;
    domiciliCalle: string;
    domiciliNumeroExterior: string;
    domiciliNumeroInterior: string;
    domiciliLada: string;
    domiciliTelefono: string;
    domiciliCorreoElectronioco: string;
    destinatarioDatos: Destinatario[];
    fabricanteDatos: Fabricante[];
    proveedorDatos: Proveedor[];
    facturadorDatos: Facturador[];
    claveDeReferencia: string;
    cadenaDeDependencia: string;
    banco: number;
    liaveDePago: string;
    fechaDePago: string;
    importeDePago: string;
    folioDeDesistimiento: string;
    folioOriginal: string;
  }
  
  /**
   *  
   * Agrupa los datos de terceros relacionados.
   * */
  export interface TercerosRelacionados {
    facturador: Facturador; // Datos del facturador
    fabricante: Fabricante; // Datos del fabricante
    destinatario: Destinatario; // Datos del destinatario
    proveedor: Proveedor; // Datos del proveedor
  }

  /**
   * Interfaz que representa la estructura de datos para el formulario.
   */
  export interface FormData {
    /**
     * Terceros relacionados en el formulario.
     */
    tercerosRelacionados: TercerosRelacionados[] | null;
  }
  