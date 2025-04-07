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
      titulo: 'Anexar necesarios',
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
      ele.marcaComercialDenominación, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: TablaMercanciasDatos): string => ele.formaFarmaceutica, // Reemplaza 'ele.formaFarmaceutica' con la clave correcta
    orden: 6,
  },
  {
    encabezado: 'Estado físico',
    clave: (ele: TablaMercanciasDatos): string => ele.estadoFisico, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 7,
  },
  {
    encabezado: 'Número CAS',
    clave: (ele: TablaMercanciasDatos): string | undefined=> ele.numeroCAS, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 7,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: TablaMercanciasDatos): string => ele.fraccionArancelaria, // Reemplaza 'ele.fraccionArancelaria' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.descripcionFraccion, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 9,
  },

  {
    encabezado: 'Cantidad de lotes ',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.cantidadDeLotes, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 10,
  },
  {
    encabezado: 'Kg o g por lote ',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.cantidadDeLotes, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (ele: TablaMercanciasDatos): string |undefined=>
      ele.unidadMedidaComercializacion, // Reemplaza 'ele.unidadMedidaComercializacion' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMC, // Reemplaza 'ele.cantidadUMC' con la clave correcta
    orden: 13,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasDatos): string => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 14,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 15,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: TablaMercanciasDatos): string => ele.presentacion, // Reemplaza 'ele.Presentación' con la clave correcta
    orden: 16,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: TablaMercanciasDatos): string => ele.numeroRegistroSanitario, // Reemplaza 'ele.numeroRegistroSanitario' con la clave correcta
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
    encabezado: 'Tipo producto',
    clave: (ele: TablaMercanciasDatos): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 20,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasDatos): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 21,
  },
];