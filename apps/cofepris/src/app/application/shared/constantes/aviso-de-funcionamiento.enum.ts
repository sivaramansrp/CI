import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

import {
  DatosDeLaProductoModel,
  PropietarioModel,
  ScianModel,
} from '../models/datos-de-la-solicitud.model';

export const DESPACHO_LDA = {
  labelNombre: 'RFC autorización LDA',
  required: false,
  alfanumerico: true,
};

export const MANIFIESTOS_DECLARACION = {
  MANIFIESTOS:
    'Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.',
};

export const SCIAN_TABLE_CONFIG: ConfiguracionColumna<ScianModel>[] = [
  {
    encabezado: 'Clave S.C.I.A.N.',
    clave: (item: ScianModel) => item.claveScian,
    orden: 1,
  },
  {
    encabezado: 'Descripción del S.C.I.A.N.',
    clave: (item: ScianModel) => item.descripcionScian,
    orden: 2,
  },
];

export const DATOS_DE_LA_PRODUCTO_MODEL: ConfiguracionColumna<DatosDeLaProductoModel>[] =
  [
    {
      encabezado: 'Tipo de producto',
      clave: (item: DatosDeLaProductoModel) => item.tipoDeProducto,
      orden: 1,
    },
    {
      encabezado: 'Nombre Específico',
      clave: (item: DatosDeLaProductoModel) => item.nombreEspecifico,
      orden: 2,
    },
    {
      encabezado: 'Cantidad o Volúmen',
      clave: (item: DatosDeLaProductoModel) => item.cantidadOVolumen,
      orden: 3,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (item: DatosDeLaProductoModel) => item.unidadDeMedida,
      orden: 4,
    },
    {
      encabezado: 'Presentación',
      clave: (item: DatosDeLaProductoModel) => item.Presentacion,
      orden: 5,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: DatosDeLaProductoModel) => item.fraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (item: DatosDeLaProductoModel) => item.descripcionDeLaFraccion,
      orden: 7,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: DatosDeLaProductoModel) => item.unidadDeMedidaDeTarifa,
      orden: 8,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: DatosDeLaProductoModel) => item.cantidadUMT,
      orden: 9,
    },
    {
      encabezado: 'Envase primario',
      clave: (item: DatosDeLaProductoModel) => item.envasePrimario,
      orden: 10,
    },
    {
      encabezado: 'Envase secundario',
      clave: (item: DatosDeLaProductoModel) => item.envaseSecundario,
      orden: 11,
    },
    {
      encabezado: 'País de origen',
      clave: (item: DatosDeLaProductoModel) => item.paisDeOrigen,
      orden: 12,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: DatosDeLaProductoModel) => item.paisDeProcedencia,
      orden: 13,
    },
    {
      encabezado: 'País de destino',
      clave: (item: DatosDeLaProductoModel) => item.paisDeDestino,
      orden: 14,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: DatosDeLaProductoModel) => item.usoEpecifico,
      orden: 15,
    },
  ];
export const ESTABLECIMIENTO_TABLE_CONFIG: ConfiguracionColumna<PropietarioModel>[] =
[
  {
    encabezado: 'Nombre/denominación o razón social',
    clave: (item: PropietarioModel) => item.NombredenominacionORazonSocial,
    orden: 1,
  },
  {
    encabezado: 'R.F.C.',
    clave: (item: PropietarioModel) => item.rfc,
    orden: 2,
  },
  {
    encabezado: 'CURP',
    clave: (item: PropietarioModel) => item.curp,
    orden: 3,
  },
  {
    encabezado: 'Teléfono',
    clave: (item: PropietarioModel) => item.telefono,
    orden: 4,
  },
  {
    encabezado: 'Correo electrónico',
    clave: (item: PropietarioModel) => item.CorreoElectronico,
    orden: 5,
  },
  {
    encabezado: 'Calle',
    clave: (item: PropietarioModel) => item.calle,
    orden: 6,
  },
  {
    encabezado: 'Número exterior',
    clave: (item: PropietarioModel) => item.numeroExterior,
    orden: 7,
  },
  {
    encabezado: 'Número interior',
    clave: (item: PropietarioModel) => item.numeroInterior,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (item: PropietarioModel) => item.pais,
    orden: 9,
  },
  {
    encabezado: 'Colonia',
    clave: (item: PropietarioModel) => item.colonia,
    orden: 10,
  },
  {
    encabezado: 'Municipio o alcaldía',
    clave: (item: PropietarioModel) => item.municipioOAlcaldia,
    orden: 11,
  },
  {
    encabezado: 'Localidad',
    clave: (item: PropietarioModel) => item.localidad,
    orden: 12,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (item: PropietarioModel) => item.entidadFederativa,
    orden: 13,
  },
  {
    encabezado: 'Estado/localidad',
    clave: (item: PropietarioModel) => item.estadoLocalidad,
    orden: 14,
  },
  {
    encabezado: 'Código postal',
    clave: (item: PropietarioModel) => item.codigoPostal,
    orden: 15,
  },
];
