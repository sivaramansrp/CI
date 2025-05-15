import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

export interface TercerosRelacionados{
  rfc:string,
  curp:string,
  nombre:string,
  apellidoPaterno:string,
  apellidoMaterno:string,
  domicilio:string
}

export const TERCEROS_ENCABEZADO_DE_TABLA: ConfiguracionColumna<TercerosRelacionados>[] =
  [
    {
      encabezado: 'RFC',
      clave: (fila) => fila.rfc,
      orden: 1,
    },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 2},
    { encabezado: 'Nombre', clave: (fila) => fila.nombre, orden: 3 },
    {
      encabezado: 'Apellido Paterno',
      clave: (fila) => fila.apellidoPaterno,
      orden: 4,
    },
    { encabezado: 'Apellido Materno',
       clave: (fila) => fila.apellidoMaterno,
        orden: 5 
      },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.domicilio,
      orden: 6,
    }
  ];

export interface ListaDeFechas {
  
  fechaInicioVigencia: string;
 
  fechaFinVigencia: string;
}

export interface FusionEscision{
  capacidadAlmacenamiento: string;
  numeroTotalCarros: string;
  cantidadBienes: string;
  fechaInspeccion: string;
  descripcionClobGenerica2: string;
  rfc: string;
  razonSocial: string;
  numFolioTramite: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
}

export const FUSION_CONFIGURATION_TABLA: ConfiguracionColumna<FusionEscision>[] =
  [
    {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (fila) => fila.rfc,
      orden: 1,
    },
    { encabezado: 'Denominación o Razón Social', clave: (fila) => fila.razonSocial, orden: 2},
    { encabezado: 'Folio VUCEM de la Última certificación/renovación', clave: (fila) => fila.numFolioTramite, orden: 3 },
    {
      encabezado: 'Fecha de fin de vigencia de la Última certificación/renovación',
      clave: (fila) => fila.fechaInicioVigencia,
      orden: 4,
    },
    { encabezado: 'Fecha de inicio de vigencia de la Última certificación/renovación',
       clave: (fila) => fila.fechaFinVigencia,
        orden: 5 
      },
  ];

export interface AvisoAgente{
  tipoDeFigura:string,
  nombre:string,
  apellidoPaterno:string,
  apellidoMaterno:string,
  razonSocial:string,
  patentAutorizacion:string,
  estatus:string
}

export const AVISO_AGENTE_DE_TABLA: ConfiguracionColumna<AvisoAgente>[] =
  [
    {
      encabezado: 'Tipo de Figura',
      clave: (fila) => fila.tipoDeFigura,
      orden: 1,
    },
    { encabezado: 'Nombre', clave: (fila) => fila.nombre, orden: 2 },
    {
      encabezado: 'Apellido Paterno',
      clave: (fila) => fila.apellidoPaterno,
      orden: 3,
    },
    { encabezado: 'Apellido Materno',
       clave: (fila) => fila.apellidoMaterno,
        orden: 4 
      },
    {
      encabezado: 'Denominación o Razón Social',
      clave: (fila) => fila.razonSocial,
      orden: 5,
    },
    {
      encabezado: 'Patente o Autorización',
      clave: (fila) => fila.patentAutorizacion,
      orden: 6,
    },
    {
      encabezado: 'Estatus',
      clave: (fila) => fila.estatus,
      orden: 7,
    }
  ];

  export const TABLE_ID = "gridFusionEscision";
