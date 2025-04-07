
export interface Mercancia {
    no_partida: number;
    tipo_requisito: string;
    requisito: string;
    numero_certificado_internacional: number;
    fraccion_arancelaria: string;
    nico: string;
    descripcion_nico: string;
    descripcion: string;
    unidad_medida_tarifa: string;
    cantidad_umt: number;
    unidad_medida_comercializacion: string;
    cantidad_umc: number;
    uso: string;
    tipo_producto: string;
    numero_lote: string;
    pais_origen: string;
    pais_procedencia: string;
    certificado_internacional_electronico: string;
  }

  export interface Exportador {
    nombre_denominacion_o_razon_social: string;
    telefono: string;
    correo_electronico: string;
    domicilio: string;
    pais: string;
  }

  export interface Destinatario{
    nombre_denominacion_o_razon_social: string;
    telefono: string;
    correo_electronico: string;
    calle: string;
    numero_exterior: string;
    numero_interior: string;
    pais: string;
    colonia: string;
    municipio_o_alcaldia: string;
    entidad_federativa: string;
    codigo_postal: string;
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
  
  export const MENSAJE_TABLA_OBLIGATORIA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
  
  export const DATOS_SOLICITUD =
 ' Al dar clic en el boton "Cargar" se creara una nueva solicitud con los mismos datos de la solicitud 202768246';

 export const AVISO_DATOS=`<p style='text-align: center; font-weight: bold;'>Aviso de privacidad simplificado</p> 
El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se reciban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCE), 
los datos personales podrán ser utilizados y transferidos a las autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías 
de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, se exigen por las autoridades competentes en materia de comercio exterior y/o 
consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las 
notificaciones que se deriven de dichos trámites, serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes 
establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de diciembre de 2011, así como por el titular 
de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. 
Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.<p style='text-align: center; font-weight: bold;'>Aviso de privacidad integral.</p>`;

export const CONFIGURATION_TABLA_DATOS=[
  { encabezado: 'Nombre/denominación o razón social', clave: (item: Exportador) => item.nombre_denominacion_o_razon_social, orden: 1 },
  { encabezado: 'Teléfono', clave: (item: Exportador) => item.telefono, orden: 2 },
  { encabezado: 'Correo electrónico', clave: (item: Exportador) => item.correo_electronico, orden: 3 },
  { encabezado: 'Domicilio', clave: (item: Exportador) => item.domicilio, orden: 4 },
  { encabezado: 'País', clave: (item: Exportador) => item.pais, orden: 5 }
]
export const CONFIGURATION_TABLA_MERCANCIAS =[
  { encabezado: 'Número de partida', clave: (item: Mercancia) => item.no_partida, orden: 1 },
  { encabezado: 'Tipo de requisito', clave: (item: Mercancia) => item.tipo_requisito, orden: 2 },
  { encabezado: 'Requisito', clave: (item: Mercancia) => item.requisito, orden: 3 },
  { encabezado: 'Número de Certificado Internacional', clave: (item: Mercancia) => item.numero_certificado_internacional, orden: 4 },
  { encabezado: 'Fracción arancelaria', clave: (item: Mercancia) => item.fraccion_arancelaria, orden: 5 },
  { encabezado: 'NICO', clave: (item: Mercancia) => item.nico, orden: 6 },
  { encabezado: 'Descripción NICO', clave: (item: Mercancia) => item.descripcion_nico, orden: 7 },
  { encabezado: 'Descripción', clave: (item: Mercancia) => item.descripcion, orden: 8 },
  { encabezado: 'Unidad de medida de tarifa', clave: (item: Mercancia) => item.unidad_medida_tarifa, orden: 9 },
  { encabezado: 'Cantidad UMT', clave: (item: Mercancia) => item.cantidad_umt, orden: 10 },
  { encabezado: 'Unidad de medida de comercialización', clave: (item: Mercancia) => item.unidad_medida_comercializacion, orden: 11 },
  { encabezado: 'Cantidad UMC', clave: (item: Mercancia) => item.cantidad_umc, orden: 12 },
  { encabezado: 'Uso', clave: (item: Mercancia) => item.uso, orden: 13 },
  { encabezado: 'Tipo de Producto', clave: (item: Mercancia) => item.tipo_producto, orden: 14 },
  { encabezado: 'Número de lote', clave: (item: Mercancia) => item.numero_lote, orden: 15 },
  { encabezado: 'País de origen', clave: (item: Mercancia) => item.pais_origen, orden: 16 },
  { encabezado: 'País de procedencia', clave: (item: Mercancia) => item.pais_procedencia, orden: 17 },
  { encabezado: 'Certificado Internacional Electrónico', clave: (item: Mercancia) => item.certificado_internacional_electronico, orden: 18 }
]

export const CONFIGURATION_TABLA_DESTINATARIO =[
  { encabezado: 'Nombre/denominación o razón social', clave: (item: Destinatario) => item.nombre_denominacion_o_razon_social, orden: 1 },
  { encabezado: 'Teléfono', clave: (item: Destinatario) => item.telefono, orden: 2 },
  { encabezado: 'Correo electrónico', clave: (item: Destinatario) => item.correo_electronico, orden: 3 },
  { encabezado: 'Calle', clave: (item: Destinatario) => item.calle, orden: 4 },
  { encabezado: 'Número exterior', clave: (item: Destinatario) => item.numero_exterior, orden: 5 },
  { encabezado: 'Número interior', clave: (item: Destinatario) => item.numero_interior, orden: 6 },
  { encabezado: 'País', clave: (item: Destinatario) => item.pais, orden: 7 },
  { encabezado: 'Colonia', clave: (item: Destinatario) => item.colonia, orden: 8 },
  { encabezado: 'Municipio o Alcaldía', clave: (item: Destinatario) => item.municipio_o_alcaldia, orden: 9 },
  { encabezado: 'Entidad Federativa', clave: (item: Destinatario) => item.entidad_federativa, orden: 10 },
  { encabezado: 'Código Postal', clave: (item: Destinatario) => item.codigo_postal, orden: 11 }
]