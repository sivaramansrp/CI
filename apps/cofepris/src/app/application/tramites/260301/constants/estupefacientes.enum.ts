import { ConfiguracionColumna, Fabricante, TipoPersona } from "@ng-mf/data-access-user";
import { Facturador } from "../../../shared/models/terceros-relacionados.model";
import { TablaMercanciasDatos } from "../../../shared/models/datos-solicitud.model";

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
  'Solicitud importación de materias primas que sean o contengan estupefacientes o psicotrópicos';
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

export const ID_PROCEDIMIENTO = 260301;

/**
 * @const FABRICANTE_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del fabricante en una tabla.
 */
export const FABRICANTE_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Fabricante>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombre,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipio,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.localidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.cp,
      orden: 15,
    },
  ];

/**
 * @const FACTURADOR_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del facturador en una tabla.
 */
export const FACTURADOR_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Facturador>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    }
  ];

export enum TIPO_TABLA_DATOS {
  FABRICANTE = 'fabricante',
  FACTURADOR = 'facturador',
  PROVEEDOR = 'Proveedor / Distribudor',
  CERTIFICADO = 'Certificado analítico',
  OTROS = 'Otros'
}
export const PRODUCTO_TABLA_ESTUPEFACIENTES = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string => ele.clasificacionProducto, // Reemplaza 'ele.clasificacionProducto' con la clave correcta
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string =>
      ele.especificarClasificacionProducto, // Reemplaza 'ele.especificarClasificacionProducto' con la clave correcta
    orden: 2,
  },
  {
    encabezado: 'Denominación común internacional',
    clave: (ele: TablaMercanciasDatos): string |undefined =>
      ele.denominacionCumonInternacional, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Marca comercial o denominación distintiva',
    clave: (ele: TablaMercanciasDatos): string |undefined =>
      ele.marcaComercialDenominacion, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 4,
  },
  {
    encabezado: 'Número CAS',
    clave: (ele: TablaMercanciasDatos): string | undefined=> ele.numeroCAS, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 5,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: TablaMercanciasDatos): string => ele.fraccionArancelaria, // Reemplaza 'ele.fraccionArancelaria' con la clave correcta
    orden: 6,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.descripcionFraccion, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 7,
  },

  {
    encabezado: 'Cantidad de lotes ',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.cantidadDeLotes, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Kg o g por lote ',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.kgPorLote, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 9,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: TablaMercanciasDatos): string => ele.numeroRegistroSanitario, // Reemplaza 'ele.numeroRegistroSanitario' con la clave correcta
    orden: 10,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: TablaMercanciasDatos): string => ele.numeroRegistroSanitario, // Reemplaza 'ele.numeroRegistroSanitario' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Número de piezas a fabricar',
    clave: (ele: TablaMercanciasDatos): string |undefined=>
      ele.numeroDePiezasAFabricar, // Reemplaza 'ele.unidadMedidaComercializacion' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Descripción del número de piezas a fabricar',
    clave: (ele: TablaMercanciasDatos): string |undefined=>
      ele.descripcionNumeroDePiezas, // Reemplaza 'ele.unidadMedidaComercializacion' con la clave correcta
    orden: 13,
  },
  {
    encabezado: 'Número de piezas a fabricar',
    clave: (ele: TablaMercanciasDatos): string |undefined=>
      ele.numeroDePiezasAFabricar, // Reemplaza 'ele.unidadMedidaComercializacion' con la clave correcta
    orden: 14,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: TablaMercanciasDatos): string => ele.presentacion, // Reemplaza 'ele.Presentación' con la clave correcta
    orden: 15,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasDatos): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 16,
  },
  {
    encabezado: 'Detallar uso específico',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.detallarUsoEspecifico, // Reemplaza 'ele.Presentación' con la clave correcta
    orden: 17,
  },
  {
    encabezado: 'País de origen',
    clave: (ele: TablaMercanciasDatos): string => ele.paisOrigen, // Reemplaza 'ele.paisOrigen' con la clave correcta
    orden: 18,
  },
  {
    encabezado: 'País de procedencia',
    clave: (ele: TablaMercanciasDatos): string => ele.paisProcedencia, // Reemplaza 'ele.paisProcedencia' con la clave correcta
    orden: 19,
  },
  {
    encabezado: 'País de destino',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.paisDeDestino, // Reemplaza 'ele.paisProcedencia' con la clave correcta
    orden: 20,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: TablaMercanciasDatos): string => ele.formaFarmaceutica, // Reemplaza 'ele.formaFarmaceutica' con la clave correcta
    orden: 21,
  },
  {
    encabezado: 'Estado físico',
    clave: (ele: TablaMercanciasDatos): string => ele.estadoFisico, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 22,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasDatos): string => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 23,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 24,
  },
  {
    encabezado: 'Tipo producto',
    clave: (ele: TablaMercanciasDatos): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 25,
  },
 
];


export const TERCEROS_NACIONALIDAD_RADIO_OPCIONS = [
  { label: 'Nacional', value: 'true' },
  { label: 'Extranjero', value: 'false' },
];

export const TERCEROS_PERSONA_RADIO_OPCIONS = [
  { label: 'Física', value: TipoPersona.FISICA },
  { label: 'Moral', value: TipoPersona.MORAL },
  { label: 'No Contribuyente', value: TipoPersona.NO_CONTRIBUYENTE },
];

/**
 * @const ELEMENTOS_REQUERIDOS
 * @description Lista de elementos requeridos para completar el formulario o proceso.
 */
export const ELEMENTOS_REQUERIDOS = [
  'colonia',
  'localidad',
  'denominacionRazon',
  'scian',
  'correoElectronico',
];

/**
 * @const ELEMENTOS_ANADIDOS
 * @description Lista de elementos adicionales que pueden ser incluidos en el formulario o proceso.
 */
export const ELEMENTOS_ANADIDOS = [
  'calleYNumero',
  'correoElectronico',
  'rfcSanitario',
  'regimenLaMercancia',
  'aduana',
];