/**
 * Matriz que representa los pasos de un proceso.
 *
 * Cada paso contiene:
 * - `indice`: El índice del paso en el proceso.
 * - `titulo`: El título o descripción del paso.
 * - `activo`: Un booleano que indica si el paso está activo actualmente.
 * - `completado`: Un booleano que indica si el paso ha sido completado.
 */

import {
  AgentesTabla,
  RegistroVehiculos,
  VehiculosTabla,
} from '../modelos/registro-empresas-transporte.model';

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
 * Objeto que contiene varias notas utilizadas en la aplicación.
 *
 * Cada nota proporciona información o instrucciones específicas:
 */
export const NOTA = {
  EFECTUAR_EL_PAGO:
    'Efectuar el pago de derechos a través del esquema electrónico eScinco, a que se refiere la regla 1 1 5, el pago de derechos previsto en el artículo 40, inciso J) de la Ley Federal de Derechos ($monto_pago)',
  DEBES_CAPTURAR:
    'Nota: Debes capturar todos los campos de pago de aprovechamiento',
  CAPITAL_SOCIAL_NOTA:
    '* El capital social de la persona moral por lo menos es de $3,113,240 00 M N',
  MI_REPRESENTADA_NOTA:
    '* Mi representada, por este conducto, se hace responsable solidaria con el titular del tránsito Interno de todos los embarques en que mi representada participe como transportista en los términos de los artículos (129 y 133, según sea el caso) de la Ley Aduanera, respecto de las mercancias que se destinen al régimen de tránsito Interno, responsabilizándose desde este momento de los créditos fiscales que se originen con mativo de fas infracciones cometidas durante el trayecto de las mercancías, desde la aduana de inicio hasta la de cierre del tránsito, inclusive la desviación de la ruta fiscal, el arribo extemporaneo, e no arrido de las mercancias o las irregularidades detectadas al practicar el reconocimiento aduanero o la verificación de mercancias en transporte',
  AVISO_PRIVACIDAD_ADJUNTAR: `<h5>Aviso de privacidad simplificado</h5>
    <p class="mb-4 text-justify">El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el Sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidad en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federaciónel 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.</p><a href="">Aviso de privacidad integral</a>`,
  CONFIRMACION_VEHICULO: 'EL vehiculo fue agregado Correctamente.',
};

/**
 * Matriz de opciones para botones de radio.
 *
 * Cada objeto representa una opción de botón de radio con:
 * - `label`: El texto mostrado a la usuaria.
 * - `value`: El valor correspondiente de la opción.
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
  {
    label: 'Sí',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  },
];

/**
 * @constante
 * @nombre AGENTES_TABLA_DATOS
 * @descripción
 * Una matriz que define las columnas y claves para la tabla de agentes aduanales.
 * Cada objeto en la matriz representa una columna con su encabezado, clave y orden.
 *
 * @tipo {Array<{encabezado: string, clave: (item: AgentesTabla) => string, orden: number}>}
 * @ejemplo
 * AGENTES_TABLA_DATOS[0].encabezado; // "Nombre(s)"
 */
export const AGENTES_TABLA_DATOS = [
  {
    encabezado: 'Nombre(s)',
    clave: (item: AgentesTabla): string => item.nombreAgente,
    orden: 1,
  },
  {
    encabezado: 'Primer Apellido',
    clave: (item: AgentesTabla): string => item.primerApellido,
    orden: 2,
  },
  {
    encabezado: 'Segundo Apellido',
    clave: (item: AgentesTabla): string => item.segundoApellido,
    orden: 3,
  },
  {
    encabezado: 'Número de patente de agente aduanal',
    clave: (item: AgentesTabla): string => item.patente,
    orden: 4,
  },
];

/**
 * @constante
 * @nombre CROSLISTA_ENTRADA
 * @descripción
 * Una lista de cadenas que representan diversos puntos de entrada aduaneros en México.
 * Esta constante se utiliza para definir las opciones disponibles en operaciones relacionadas con aduanas.
 *
 * @tipo {string[]}
 * @ejemplo
 * CROSLISTA_ENTRADA[0]; // "ACAPULCO, PUERTO Y AEROPUERTO"
 */
export const REGISTRO_VEHICULOS = [
  {
    encabezado: 'Marca',
    clave: (item: RegistroVehiculos): string => item.solicitud.marca,
    orden: 1,
  },
  {
    encabezado: 'Modelo (s)',
    clave: (item: RegistroVehiculos): string => item.solicitud.modelo,
    orden: 2,
  },
  {
    encabezado: 'Número de identificación vehicular o serie del vehículo',
    clave: (item: RegistroVehiculos): string => item.solicitud.idVehiculoSerie,
    orden: 3,
  },
  {
    encabezado: 'Caja',
    clave: (item: RegistroVehiculos): string => item.solicitud.caja,
    orden: 4,
  },
  {
    encabezado: 'Calle Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.calleVehiculo,
    orden: 5,
  },
  {
    encabezado: 'Número Exterior',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.numExteriorVehiculo,
    orden: 6,
  },
  {
    encabezado: 'Número Interior',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.numInteriorVehiculo,
    orden: 7,
  },
  {
    encabezado: 'Entidad Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.comboEntidadVehiculo,
    orden: 8,
  },
  {
    encabezado: 'Delegación Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.comboDelegacionVehiculo,
    orden: 9,
  },
  {
    encabezado: 'Colonia Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.comboColoniaVehiculo,
    orden: 10,
  },
  {
    encabezado: 'Localidad Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.localidadVehiculo,
    orden: 11,
  },
  {
    encabezado: 'Código Postal Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.codigoPostalVehiculo,
    orden: 12,
  },
  {
    encabezado: 'Aduana Vehículo',
    clave: (item: RegistroVehiculos): string =>
      item.direccionVehiculo.comboAduanaVehiculo,
    orden: 13,
  },
  {
    encabezado: 'Nombre',
    clave: (item: RegistroVehiculos): string => item.persona.nombre,
    orden: 14,
  },
  {
    encabezado: 'Apellido Paterno',
    clave: (item: RegistroVehiculos): string => item.persona.apellidoPaterno,
    orden: 15,
  },
  {
    encabezado: 'Apellido Materno',
    clave: (item: RegistroVehiculos): string => item.persona.apellidoMaterno,
    orden: 16,
  },
  {
    encabezado: 'Correo Electrónico',
    clave: (item: RegistroVehiculos): string => item.persona.correoElectronico,
    orden: 17,
  },
  {
    encabezado: 'Teléfono de Contacto',
    clave: (item: RegistroVehiculos): string => item.persona.telefonoContacto,
    orden: 18,
  },
];

export const VEHICULOS_TABLA_DATOS = [
  {
    encabezado: 'Marca',
    clave: (item: VehiculosTabla): string => item.marca,
    orden: 1,
  },
  {
    encabezado: 'Modelo (s)',
    clave: (item: VehiculosTabla): string => item.modelo,
    orden: 2,
  },
  {
    encabezado: 'Número de identificación vehicular o serie del vehículo',
    clave: (item: VehiculosTabla): string => item.vin,
    orden: 3,
  },
];
