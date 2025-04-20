
export interface Mercancia {
  noPartida: number;
  tipoRequisito: string;
  requisito: string;
  numeroCertificadoInternacional: string;
  fraccionArancelaria: string;
  fraccionArancelariaDescripcion: string;
  nico: string;
  descripcionNico: string;
  descripcion: string;
  unidadMedidaTarifa: string;
  cantidadUmt: number;
  unidadMedidaComercializacion: string;
  cantidadUmc: number;
  uso: string;
  especie: string;
  paisOrigen: string;
  paisProcedencia: string;
  numeroLote: number;
  fasedesarrollo:string;
  certificadoInternacionalElectronico: string;
}

export interface Exportador {
  nombreDenominacionORazonSocial: string;
  telefono: string;
  correoElectronico: string;
  domicilio: string;
  pais: string;
}

export interface Destinatario {
  nombreDenominacionORazonSocial: string;
  telefono: string;
  correoElectronico: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  pais: string;
  colonia: string;
  municipioOAlcaldia: string;
  entidadFederativa: string;
  codigoPostal: string;
}

  export const PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
      indice: 2,
      titulo: 'Requisitos necesarios',
      activo: false,
      completado: false,
  },
    {
        indice: 3,
        titulo: 'Anexar requisitos',
        activo: false,
        completado: false,
    },
    {
        indice: 4,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
  ];
  
  export const MENSAJE_TABLA_OBLIGATORIA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
  
  export const DATOS_SOLICITUD =
 ' Al dar clic en el boton "Cargar" se creara una nueva solicitud con los mismos datos de la solicitud 202768246';


 export const CONFIGURATION_TABLA_DATOS = [
  { encabezado: 'Nombre/denominación o razón social', clave: (item: Exportador) => item.nombreDenominacionORazonSocial, orden: 1 },
  { encabezado: 'Teléfono', clave: (item: Exportador) => item.telefono, orden: 2 },
  { encabezado: 'Correo electrónico', clave: (item: Exportador) => item.correoElectronico, orden: 3 },
  { encabezado: 'Domicilio', clave: (item: Exportador) => item.domicilio, orden: 4 },
  { encabezado: 'País', clave: (item: Exportador) => item.pais, orden: 5 }
];

export const CONFIGURATION_TABLA_MERCANCIAS = [
  { encabezado: 'No.partida', clave: (item: Mercancia):number => item.noPartida, orden: 1 },
  { encabezado: 'Tipo de requisito', clave: (item: Mercancia):string => item.tipoRequisito, orden: 2 },
  { encabezado: 'Requisito', clave: (item: Mercancia):string => item.requisito, orden: 3 },
  { encabezado: 'Número de Certificado Internacional', clave: (item: Mercancia):string => item.numeroCertificadoInternacional, orden: 4 },
  { encabezado: 'Fracción arancelaria', clave: (item: Mercancia):string => item.fraccionArancelaria, orden: 5 },
  { encabezado: 'Descripción de la fracción', clave: (item: Mercancia):string => item.fraccionArancelariaDescripcion, orden: 6 },
  { encabezado: 'NICO', clave: (item: Mercancia):string => item.nico, orden: 7 },
  { encabezado: 'Descripción NICO', clave: (item: Mercancia):string => item.descripcionNico, orden: 8 },
  { encabezado: 'Descripción', clave: (item: Mercancia):string => item.descripcion, orden: 9 },
  { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (item: Mercancia):string => item.unidadMedidaTarifa, orden: 10 },
  { encabezado: 'Cantidad UMT', clave: (item: Mercancia):number => item.cantidadUmt, orden: 11 },
  { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (item: Mercancia):string => item.unidadMedidaComercializacion, orden: 12 },
  { encabezado: 'Cantidad UMC', clave: (item: Mercancia):number => item.cantidadUmc, orden: 13 },
  { encabezado: 'Uso:', clave: (item: Mercancia):string => item.uso, orden: 14 },
  { encabezado: 'Especie', clave: (item: Mercancia):string => item.especie, orden: 15 },
  { encabezado: 'País de origen', clave: (item: Mercancia):string => item.paisOrigen, orden: 16 },
  { encabezado: 'País de procedencia', clave: (item: Mercancia):string => item.paisProcedencia, orden: 17 },
  { encabezado: 'Número de lote', clave: (item: Mercancia):number => item.numeroLote, orden: 18 },
  { encabezado: 'Fase de desarrollo', clave: (item: Mercancia):string => item.fasedesarrollo, orden: 19 },
  { encabezado: 'Certificado Internacional Electrónico', clave: (item: Mercancia):string => item.certificadoInternacionalElectronico, orden: 20 }
];


export const CONFIGURATION_TABLA_DESTINATARIO = [
  { encabezado: 'Nombre/denominación o razón social', clave: (item: Destinatario) => item.nombreDenominacionORazonSocial, orden: 1 },
  { encabezado: 'Teléfono', clave: (item: Destinatario) => item.telefono, orden: 2 },
  { encabezado: 'Correo electrónico', clave: (item: Destinatario) => item.correoElectronico, orden: 3 },
  { encabezado: 'Calle', clave: (item: Destinatario) => item.calle, orden: 4 },
  { encabezado: 'Número exterior', clave: (item: Destinatario) => item.numeroExterior, orden: 5 },
  { encabezado: 'Número interior', clave: (item: Destinatario) => item.numeroInterior, orden: 6 },
  { encabezado: 'País', clave: (item: Destinatario) => item.pais, orden: 7 },
  { encabezado: 'Colonia', clave: (item: Destinatario) => item.colonia, orden: 8 },
  { encabezado: 'Municipio o Alcaldía', clave: (item: Destinatario) => item.municipioOAlcaldia, orden: 9 },
  { encabezado: 'Entidad Federativa', clave: (item: Destinatario) => item.entidadFederativa, orden: 10 },
  { encabezado: 'Código Postal', clave: (item: Destinatario) => item.codigoPostal, orden: 11 }
];
