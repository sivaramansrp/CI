import {
  Arancelaria,
  ArancelariaImportacion,
  Sector,

} from '../models/datos-info.model';
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



export const CONFIGURACION_SECTOR = [
  {
    encabezado: '',
    clave: (ele: Sector): string | undefined => ele.descripcion,
    orden: 1
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Sector): string | undefined => ele.descripcionSector,
    orden: 2
  },


];
export const CONFIGURACION_ARANCELARIAS = [
  {
    encabezado: '#Fracción ',
    clave: (ele: Arancelaria): string | undefined => ele.fraccion,
    orden: 1
  },
  {
    encabezado: 'Fraccion arancelaria ',
    clave: (ele: Arancelaria): string | undefined => ele.fraccionArancelaria,
    orden: 2
  },
  {
    encabezado: 'Descripción comercial ',
    clave: (ele: Arancelaria): string | undefined => ele.descripcionComercial,
    orden: 3
  },
  {
    encabezado: 'Anexo II',
    clave: (ele: Arancelaria): string | undefined => ele.anexoII,
    orden: 4
  },
  {
    encabezado: 'Tipo',
    clave: (ele: Arancelaria): string | undefined => ele.tipo,
    orden: 5
  },
  {
    encabezado: 'UMT',
    clave: (ele: Arancelaria): string | undefined => ele.umt,
    orden: 6
  },
  {
    encabezado: 'Categoria ',
    clave: (ele: Arancelaria): string | undefined => ele.categoria,
    orden: 7
  },
  {
    encabezado: 'Valor en moneda mensual  ',
    clave: (ele: Arancelaria): string | undefined => ele.valorMensual,
    orden: 8
  },
  {
    encabezado: 'Valor en moneda anual ',
    clave: (ele: Arancelaria): string | undefined => ele.valorAnual,
    orden: 9
  },
  {
    encabezado: 'Volumen mensual  ',
    clave: (ele: Arancelaria): string | undefined => ele.volumenrMensual,
    orden: 10
  },
  {
    encabezado: 'Volumen anual  ',
    clave: (ele: Arancelaria): string | undefined => ele.volumenAnual,
    orden: 11
  },

]
export const CONFIGURACION_ARANCELARIASIMPORTACION = [
  {
    encabezado: '#Fracción ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.fraccion,
    orden: 1
  },
  {
    encabezado: 'Fraccion arancelaria del producto de exportación  ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.fraccionArancelaria,
    orden: 2
  },
  {
    encabezado: 'Descripción comercial ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.descripcionComercial,
    orden: 3
  },
  {
    encabezado: 'Fraccion arancelaria de la mercancia de importación Descripción  ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.fraccionArancelariaImportacion,
    orden: 4
  },
  {
    encabezado: 'Descripción comercial ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.descripcionComercialImportacion,
    orden: 5
  },
  {
    encabezado: 'Anexo II',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.anexoII,
    orden: 6
  },
  {
    encabezado: 'Tipo',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.tipo,
    orden: 7
  },
  {
    encabezado: 'UMT',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.umt,
    orden: 8
  },
  {
    encabezado: 'Categoria ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.categoria,
    orden: 9
  },
  {
    encabezado: 'Valor en moneda mensual  ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.valorMensual,
    orden: 10
  },
  {
    encabezado: 'Valor en moneda anual ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.valorAnual,
    orden: 11
  },
  {
    encabezado: 'Volumen mensual  ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.volumenrMensual,
    orden: 12
  },
  {
    encabezado: 'Volumen anual  ',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.volumenAnual,
    orden: 13
  },

]



export const TEXTOS_80206 = {

  ALERTA_TEXTOS:
    'Materias primas, partes, componentes, materiales auxiliares, envases, material de empaque, etiquetas, folletos, combustibles y lubricantes que se utilicen en el proceso de producción o de servicios de las mercancias de exportación.'
};

export const TEXTOS = {
  INSTRUCCIONES: `<h5>Aviso de privacidad simplificado</h5>
          <p class="text-left">El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.</p>
          <p class="mt-5 mb-3 text-muted">Aviso de privacidad integral</p>
          `,
};
export const ALERT = {
  ERRORMESSAGE: `<p>Corrija los siguientes errores: </p>
      <p style="color:#d0021b; display: flex; justify-content: center; position: relative;"><span style="position: absolute; left: 2px;">1</span>(Toda fracción de exportación debe tener al menos una fracción de importación) es un campo requerido </p>
      <p style="color:#d0021b; display: flex; justify-content: center; position: relative;"><span style="position: absolute; left: 2px;">2</span>(Regla Tres Rs) es un campo requerido </p>`,
};






