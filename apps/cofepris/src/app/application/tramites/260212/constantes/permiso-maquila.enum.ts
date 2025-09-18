import { FabricanteDatos, MercanciaModel } from "../models/permiso-maquila.models";

/**
 * Constante que define los permisos para el proceso de maquila.
 * Cada objeto representa una etapa del proceso.
 */
export const PERMISO_MAQUILA = [
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

/**
 * Mensajes de alerta para los datos de solicitud.
 * Contiene información sobre el comportamiento al dar doble clic en una solicitud.
 */
export const DATOS_ALERT = {
  DATOS_SOLICITUD: `<p class="text-center">Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.<p>`,
};

/**
 * Mensajes de alerta para los manifiestos.
 * Contiene información sobre los requisitos y normatividad aplicable.
 */
export const MANIFIESTOS_ALERT = {
  DATOS_MANIFIESTOS: `Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.`,
};
/**
 * @description
 * Configuración para la fecha de pago.
 * - labelNombre: Texto que se muestra como etiqueta del campo.
 * - required: Indica si el campo es obligatorio (false = no obligatorio).
 * - habilitado: Indica si el campo está habilitado para edición (true = habilitado).
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago:',
  required: false,
  habilitado: true,
};
/**
 * @description
 * Opciones para el botón de radio de nacionalidad.
 * - 'Nacional' con valor '1'
 * - 'Extranjero' con valor '0'
 */
export const NACIONALIDAD_OPCIONES_DE_BOTON_DE_RADIO = [
  {
      label: 'Nacional',
      value: '1',
  },
  {
      label: 'Extranjero',
      value: '0',
  }
];
/**
 * @description
 * Opciones para el botón de radio de tipo de persona.
 * - 'Física' con valor '1', representa a una persona individual con actividad específica.
 * - 'Moral' con valor '0', representa a una empresa o entidad con actividad específica.
 * - hint: Texto explicativo que se muestra como guía para cada opción.
 */
export const PERSONA_OPCIONES_DE_BOTON_DE_RADIO = [
  {
      label: 'Física',
      value: '1',
      hint: 'Una persona física es entendida como toda persona con una actividad específica.'
  },
  {
      label: 'Moral',
      value: '0',
      hint: 'Una persona moral es entendida como una empresa con una actividad específica.'
  }
];
/**
 * Catálogo de estados utilizado para llenar opciones en formularios.
 * Cada estado contiene un `id` único y su `descripción` correspondiente.
 * Usado comúnmente para selecciones de ubicación o entidad federativa.
 */
export const ESTADOS_DATA = [
  { id: 1, descripcion: "AGUASCALIENTES" },
  { id: 2, descripcion: "BAJA CALIFORNIA" },
  { id: 3, descripcion: "BAJA CALIFORNIA SUR" },
  { id: 4, descripcion: "CAMPECHE" }
];
/**
 * Catálogo de aduanas disponibles para selección en formularios.
 * Cada entrada contiene un `id` único y una `descripción` del nombre de la aduana.
 * Utilizado en módulos relacionados con trámites aduaneros o logística.
 */
export const ADUANAS_DATA = [
  { id: 1, descripcion: "SINALOA" },
  { id: 2, descripcion: "Aduana 2" },
  { id: 3, descripcion: "Aduana 3" }
];
/* 
 * Lista de mercancías predeterminadas utilizadas como valor inicial en formularios.
 * Cada objeto sigue el modelo MercanciaModel con valores por defecto.
 * Se puede modificar según las necesidades del sistema.
 */
export const MERCANCIA_POR_DEFECTO: MercanciaModel[] = [
  {
    clasificacionProducto: "1",
    especificarClasificacion: '2',
    denominacionEspecifica: 'valor',
    denominacionDistintiva: 'Denominación',
    denominacionComun: 'denominacionComun',
    formaFarmaceutica: 'denominacionComun',
    estadoFsico: 'Estado físico',
    fraccionArancelaria: 'Fracción ',
    descripcionFraccion: '',
    cantidadUMT: 'Cantidad ',
    UMT: 'UMT',
    cantidadUMC: 'Cantidad ',
    UMC: 'UMC',
    tipoDeEnvase: "Tipo de envase",
    numeroDeregistroSanitario: '',
    paisDeorigen: 'paisDeorigen',
    paisDeprocedencia: 'paisDeprocedencia',
    tipoProducto: 'producto',
    usoEspecifico: 'usoEspecifico',
    fechaDeCaducidad: 'fechaDeCaducidad'
  }
];
/**
 * @description
 * Configuración de columnas para la tabla de fabricantes.
 * Cada objeto define:
 * - encabezado: Texto que se muestra como título de la columna.
 * - clave: Función que obtiene el valor correspondiente del objeto `FabricanteDatos`.
 * - orden: Posición de la columna en la tabla.
 */
export const CONFIGURATION_TABLA_FABRICANTE = [
  { encabezado: 'Nombre/denominación o razón social', clave: (item: FabricanteDatos): string => item.nombre, orden: 1 },
  { encabezado: 'R.F.C', clave: (item: FabricanteDatos): string => item.rfc, orden: 2 },
  { encabezado: 'CURP', clave: (item: FabricanteDatos): string => item.curp, orden: 3 },
  { encabezado: 'Teléfono', clave: (item: FabricanteDatos): string => item.telefono, orden: 4 },
  { encabezado: 'Correo electrónico', clave: (item: FabricanteDatos): string => item.correo, orden: 5 },
  { encabezado: 'Calle', clave: (item: FabricanteDatos): string => item.calle, orden: 6 },
  { encabezado: 'Número exterior', clave: (item: FabricanteDatos): string => item.numeroExterior, orden: 7 },
  { encabezado: 'Número interior', clave: (item: FabricanteDatos): string => item.numeroInterior, orden: 8 },
  { encabezado: 'País', clave: (item: FabricanteDatos): string => item.pais, orden: 9 },
  { encabezado: 'Colonia', clave: (item: FabricanteDatos): string => item.colonia, orden: 10 },
  { encabezado: 'Municipio o alcaldía', clave: (item: FabricanteDatos): string => item.municipio, orden: 11 },
  { encabezado: 'Localidad', clave: (item: FabricanteDatos): string => item.localidad, orden: 12 },
  { encabezado: 'Entidad federativa', clave: (item: FabricanteDatos): string => item.entidadFederativa, orden: 13 },
  { encabezado: 'Estado/localidad', clave: (item: FabricanteDatos): string => item.estado, orden: 14 },
  { encabezado: 'Código postal', clave: (item: FabricanteDatos): string => item.codigoPostal, orden: 15 },
  { encabezado: 'Colonia o equivalente', clave: (item: FabricanteDatos): string => item.coloniaEquivalente, orden: 16 }
];
/**
 * @description
 * Datos de ejemplo para la tabla de fabricantes. Cada objeto representa
 * un registro de un fabricante con sus respectivos detalles como nombre,
 * RFC, CURP, contacto, domicilio y ubicación.
 */
export const TABLA_ROWDATA: FabricanteDatos[] = [
  {
    nombre: "Laboratorios S.A.",
    rfc: "LAB123456789",
    curp: "CURP123456HDFRRL01",
    telefono: "55-12345678",
    correo: "contacto@laboratorios.com",
    calle: "Calle 1",
    numeroExterior: "100",
    numeroInterior: "2",
    pais: "México",
    colonia: "Centro",
    municipio: "CDMX",
    localidad: "CDMX",
    entidadFederativa: "CDMX",
    estado: "CDMX",
    codigoPostal: "06000",
    coloniaEquivalente: "Centro histórico"
  }
];
