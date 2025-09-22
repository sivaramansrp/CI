/**
 * @fileoverview
 * Este archivo contiene constantes y configuraciones utilizadas en el módulo de ampliación de servicios.
 * Proporciona configuraciones para tablas, textos, pasos del proceso y alertas que se utilizan en la interfaz de usuario.
 * 
 * @module ModificacionEnum
 * @description
 * Este archivo define configuraciones para sectores, fracciones arancelarias, fracciones de importación, textos de instrucciones,
 * alertas y pasos del proceso de ampliación de servicios.
 */

import {
  Arancelaria,
  ArancelariaImportacion,
  Sector,
} from '../models/datos-info.model';

/**
 * Pasos del proceso de ampliación de servicios.
 * @constant {Array<Object>} PASOS
 */
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

/**
 * Configuración de la tabla para sectores.
 * @constant {Array<Object>} CONFIGURACION_SECTOR
 */
export const CONFIGURACION_SECTOR = [
  {
    encabezado: '',
    clave: (ele: Sector): string | undefined => ele.descripcion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Sector): string | undefined => ele.descripcionSector,
    orden: 2,
  },
];

/**
 * Configuración de la tabla para fracciones arancelarias.
 * @constant {Array<Object>} CONFIGURACION_ARANCELARIAS
 */
export const CONFIGURACION_ARANCELARIAS = [
  {
    encabezado: '#Fracción',
    clave: (ele: Arancelaria): string | undefined => ele.fraccion,
    orden: 1,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Arancelaria): string | undefined => ele.fraccionArancelaria,
    orden: 2,
  },
  {
    encabezado: 'Descripción comercial',
    clave: (ele: Arancelaria): string | undefined => ele.descripcionComercial,
    orden: 3,
  },
  {
    encabezado: 'Anexo II',
    clave: (ele: Arancelaria): string | undefined => ele.anexoII,
    orden: 4,
  },
  {
    encabezado: 'Tipo',
    clave: (ele: Arancelaria): string | undefined => ele.tipo,
    orden: 5,
  },
  {
    encabezado: 'UMT',
    clave: (ele: Arancelaria): string | undefined => ele.umt,
    orden: 6,
  },
  {
    encabezado: 'Categoría',
    clave: (ele: Arancelaria): string | undefined => ele.categoria,
    orden: 7,
  },
  {
    encabezado: 'Valor en moneda mensual',
    clave: (ele: Arancelaria): string | undefined => ele.valorMensual,
    orden: 8,
  },
  {
    encabezado: 'Valor en moneda anual',
    clave: (ele: Arancelaria): string | undefined => ele.valorAnual,
    orden: 9,
  },
  {
    encabezado: 'Volumen mensual',
    clave: (ele: Arancelaria): string | undefined => ele.volumenrMensual,
    orden: 10,
  },
  {
    encabezado: 'Volumen anual',
    clave: (ele: Arancelaria): string | undefined => ele.volumenAnual,
    orden: 11,
  },
];

/**
 * Configuración de la tabla para fracciones de importación.
 * @constant {Array<Object>} CONFIGURACION_ARANCELARIASIMPORTACION
 */
export const CONFIGURACION_ARANCELARIASIMPORTACION = [
  {
    encabezado: '#Fracción',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.fraccion,
    orden: 1,
  },
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.fraccionArancelaria,
    orden: 2,
  },
  {
    encabezado: 'Descripción comercial',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.descripcionComercial,
    orden: 3,
  },
  {
    encabezado: 'Fracción arancelaria de la mercancía de importación',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.fraccionArancelariaImportacion,
    orden: 4,
  },
  {
    encabezado: 'Descripción comercial de importación',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.descripcionComercialImportacion,
    orden: 5,
  },
  {
    encabezado: 'Anexo II',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.anexoII,
    orden: 6,
  },
  {
    encabezado: 'Tipo',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.tipo,
    orden: 7,
  },
  {
    encabezado: 'UMT',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.umt,
    orden: 8,
  },
  {
    encabezado: 'Categoría',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.categoria,
    orden: 9,
  },
  {
    encabezado: 'Valor en moneda mensual',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.valorMensual,
    orden: 10,
  },
  {
    encabezado: 'Valor en moneda anual',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.valorAnual,
    orden: 11,
  },
  {
    encabezado: 'Volumen mensual',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.volumenrMensual,
    orden: 12,
  },
  {
    encabezado: 'Volumen anual',
    clave: (ele: ArancelariaImportacion): string | undefined => ele.volumenAnual,
    orden: 13,
  },
];

/**
 * Textos constantes para el módulo 80206.
 * @constant {Object} TEXTOS_80206
 */
export const TEXTOS_80206 = {
  ALERTA_TEXTOS:
    'Materias primas, partes, componentes, materiales auxiliares, envases, material de empaque, etiquetas, folletos, combustibles y lubricantes que se utilicen en el proceso de producción o de servicios de las mercancías de exportación.',
};

/**
 * Mensajes de alerta utilizados en la aplicación.
 * @constant {Object} ALERT
 */
export const ALERT = {
  ERRORMESSAGE: `<p>Corrija los siguientes errores: </p>
      <p style="color:#d0021b; display: flex; justify-content: center; position: relative;"><span style="position: absolute; left: 2px;">1</span>(Toda fracción de exportación debe tener al menos una fracción de importación) es un campo requerido </p>
      <p style="color:#d0021b; display: flex; justify-content: center; position: relative;"><span style="position: absolute; left: 2px;">2</span>(Regla Tres Rs) es un campo requerido </p>`,
};

  export const USUARIO_INFO = {
      "persona": {
        "claveUsuario": "828811",
        "rfc": "LEQI8101314S7",
        "nombre": "Juan",
        "apellidoPaterno": "Pérez",
        "apellidoMaterno": "Gómez"
      },
      "firmaElectronica": {
      "cadenaOriginal": "ABCDEF1234567890",
      "certificado": "3082054030820428a00302010202143230303031303030303030313030303032303534300d06092a864886f70d01010505003082016f3118301606035504030c0f412e432e2064652070727565626173312f302d060355040a0c26536572766963696f2064652041646d696e69737472616369c3b36e205472696275746172696131383036060355040b0c2f41646d696e69737472616369c3b36e20646520536567757269646164206465206c6120496e666f726d616369c3b36e3129302706092a864886f70d010901161a617369736e657440707275656261732e7361742e676f622e6d783126302406035504090c1d41762e20486964616c676f2037372c20436f6c2e20477565727265726f310e300c06035504110c053036333030310b3009060355040613024d583119301706035504080c10446973747269746f204665646572616c3112301006035504070c09436f796f6163c3a16e31153013060355042d130c5341543937303730314e4e333132303006092a864886f70d0109020c23526573706f6e7361626c653a2048c3a963746f72204f726e656c617320417263696761301e170d3130313232393135343330365a170d3134313232393135343334365a3081ba312630240603550403141d49474e4143494f204544554152444f204c454f5320515549d14f4e4553312630240603550429141d49474e4143494f204544554152444f204c454f5320515549d14f4e455331263024060355040a141d49474e4143494f204544554152444f204c454f5320515549d14f4e4553310b3009060355040613024d5831163014060355042d130d4c455149383130313331345337311b3019060355040513124c455149383130313331484447535847303530819f300d06092a864886f70d010101050003818d0030818902818100be63d94ebf3d6fb4e9a99eb630a80f10dba552c1ee367c93faffec9181244d0b2d6c3c788f4a084dddc7b150b9e2f669d06ee0738d602cc0d2ee6f9e32758e492658ca5b2434a7b3c3ee8fa96b38befb0fc1b8efcd38fb16439626e9990c310d7c9368993c3bc090159693484b6406941f318186517eca71c7a236fc4457c0190203010001a382010830820104300c0603551d130101ff04023000300b0603551d0f0404030203d8301106096086480186f84201010404030205a0301d0603551d0e04160414171ca985e9f7da9f398291ebed01b10b71898956302e0603551d1f042730253023a021a01f861d687474703a2f2f706b692e7361742e676f622e6d782f7361742e63726c303306082b0601050507010104273025302306082b060105050730018617687474703a2f2f6f6373702e7361742e676f622e6d782f301f0603551d23041830168014eb597d04229a538d9e711aa0589629f539e0a0c530100603551d2004093007300506032a0304301d0603551d250416301406082b0601050507030406082b06010505070302300d06092a864886f70d01010505000382010100ce60a5b5b8a3a7ea57878af4cdbe001e8833889ee7287da2c44e865cf4bb8c7770f2561e22aaa57eb7034684a537fc1e08b6f18e4bb2d0821ff27a772dbda420894fa94fb5bb00a9cf4c6dac3c91e23b4cd83cb1ba8ed6c577eb8a3dbd809a475bb904f31a86f10491ecb7ea7851c4586ba44a4da7493f795f4693a83bfc277a8118eeab4e3a4825f41cb69936f2996e0775df50ad78646d8d38abba279666bd21b31ce1e850d4af3ebf88fbc50b00460c2f161af54e3318445b8d8334b173e2e4e874332e1970d7252672956cad704fbd1b5ff6dd38ed1ee3a2dffe502531af5ab4f8cdad18253a26b58c432c2a6aeaaed10ecb9bed8085a217d43641514b53",
      "firma": "uSabSdHjrNAzOLvbSHfjcbHJcJAX8jNEu+K+bMMUeuV9ECJojB0jUmWwKoMK64PWjbJovApPDqa7Y5uwh1qRqIj/3pfLpTR+KCJa9CxotE0ECo8wBxWS3stkkBvxhp8hTDO7ummX8GeQkDvw1Fmaqn3BnG9jxwEVnTeb+1DG2EE="
      },
      "rolActual": "CAPTURISTA_GUBERNAMENTAL",
      "rfcSolicitante": "LEQI8101314S7",
      "idSolicitud": 202775426,
      "referenciaSolicitud": ""
    }