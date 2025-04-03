import { CatalogosSelect } from "@libs/shared/data-access-user/src";

export interface ColumnasTabla {
  claveScian: string;
  descripcionScian: string;
}
export interface ListaClave {
  claveDeLosLotes: string;
  fechaDeFabricacion: string;
  fechaDeCaducidad: string;
}

export interface Mercancia {
  clasificaionProductos: string;
  especificarProducto: number;
  nombreProductoEspecifico: string;
  marca: string;
  tipoProducto: number;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidadUMT: string;
  umt: string;
  cantidadUMC: string;
  umc: number;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  usoEspecifico: string;
}

export interface ClavesDeLotes {
  lotes: string;
  fabricacion: string;
  caducidad: string;
}
export interface CrossListLable {
  /** Texto que aparece en la parte izquierda de la etiqueta. */
  tituluDeLaIzquierda: string;

  /** Texto que aparece en la parte derecha de la etiqueta. */
  derecha: string;
}
export interface CrossList {
  /** Etiquetas asociadas a la lista cruzada. */
  label: CrossListLable;

  /** Fechas asociadas con los datos de la lista cruzada. */
  fechas: string[];
}

export interface MercanciaCatalogos {
  /** Catálogo de productos disponibles. */
  productosCatalogo: CatalogosSelect;

  /** Catálogo para especificar un producto específico. */
  especificarCatalogo: CatalogosSelect;

  /** Catálogo de tipos de productos disponibles. */
  tipoProductoCatalogo: CatalogosSelect;

  /** Catálogo de Unidades de Medida de Comercialización (UMC). */
  umcCatalogo: CatalogosSelect;
}

export interface MercanciaCrossList {
  /** Lista cruzada para los países de origen de la mercancía. */
  paisOrigenCrossList: CrossList;

  /** Lista cruzada para los países de procedencia de la mercancía. */
  paisProcedencisCrossList: CrossList;

  /** Lista cruzada para los usos específicos de la mercancía. */
  usoEspecificoCrossList: CrossList;
}

export interface Destinatario {
  /** Nombre completo del destinatario. */
  nombre: string;

  /** Registro Federal de Contribuyentes (RFC) del destinatario. */
  rfc: string;

  /** Clave Única de Registro de Población (CURP) del destinatario. */
  curp: string;

  /** Número telefónico de contacto del destinatario. */
  telefono: string;

  /** Correo electrónico del destinatario. */
  correoElectronico: string;

  /** Calle correspondiente al domicilio del destinatario. */
  calle: string;

  /** Número exterior del domicilio del destinatario. */
  numeroExterior: string;

  /** Número interior del domicilio del destinatario, si aplica. */
  numeroInterior: string;

  /** País donde reside el destinatario. */
  pais: string;

  /** Colonia del domicilio del destinatario. */
  colonia: string;

  /** Municipio donde reside el destinatario. */
  municipio: string;

  /** Localidad específica del domicilio del destinatario. */
  localidad: string;

  /** Estado asociado al domicilio del destinatario. */
  estado: string;

  /** Estado alternativo (o subdivisión administrativa) asociado al domicilio del destinatario, si aplica. */
  estado2: string;

  /** Código postal del domicilio del destinatario. */
  codigo: string;
}

export interface ClavesDeLotes {
  /** Identificador único o clave del lote. */
  lotes: string;

  /** Fecha de fabricación del lote. */
  fabricacion: string;

  /** Fecha de caducidad del lote. */
  caducidad: string;
}

export const FECHAINICIAL = {
  labelNombre: 'Fecha de fabricación',
  required: true,
  habilitado: true,
};

export const FECHAFINAL = {
  labelNombre: 'Fecha de caducidad',
  required: true,
  habilitado: true,
};