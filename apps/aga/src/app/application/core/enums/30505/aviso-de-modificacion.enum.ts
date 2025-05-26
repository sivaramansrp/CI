import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { AvisoAgente, FusionEscision, TercerosRelacionados } from "../../models/30505/aviso-modificacion.model";

/**
 * @description
 * Mensaje HTML que indica que se debe seleccionar al menos un tipo de aviso.
 *
 * @returns {string} Mensaje de advertencia en formato HTML.
 *
 * @since 1.0.0
 * @module AvisoDeModificacion
 */
export const AVISO_MOD = `<p>Debe seleccionar por lo menos un tipo de aviso</p>`

/**
 * @description Opciones para un control de radio que permite seleccionar entre "Sí" y "No".
 * @type {Array<{ label: string; value: string }>}
 * @memberof AvisoDeModificacion
 * @since 1.0.0
 *
 * @example
 * // Uso en un formulario:
 * <app-radio-group [options]="OPCIONES_RADIO"></app-radio-group>
 */
export const OPCIONES_RADIO = [
    {
        label: 'Sí',
        value: '1',
    },
    {
        label: 'No',
        value: '0',
    }
];

/**
 * @description
 * Arreglo de opciones para un control de radio que permite seleccionar entre "Fusión" y "Escisión".
 * Cada objeto contiene una etiqueta (`label`), un valor (`value`) y un identificador (`id`).
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @since 1.0.0
 *
 * @author Su Nombre
 */
export const FUSION_ESCISION_RADIO = [
    {
        label: 'Fusión',
        value: '1',
        id:'idFusion'
    },
    {
        label: 'Escisión',
        value: '0',
        id:'idEscision'
    }
];

/**
 * @description
 * [ES] Opciones de aviso para fusión o escisión de empresas en el contexto del Registro del Despacho de las Mercancías.
 * Cada objeto representa un tipo de aviso con su respectiva etiqueta, valor e identificador.
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @see [Documentación oficial](https://compodoc.app/)
 */
export const AVISO_RADIO = [
    {
        label: 'Aviso de fusión o escisión de empresas que cuente con la autorización en el Registro del Despacho de las Mercancías y subsista una de ellas.',
        value: '1',
        id: 'fusion1'
    },
    {
        label: ' Aviso de fusión o escisión dos o más empresas que cuenten con la autorización en el registro del despacho de mercancías de las empresas y resulte una nueva',
        value: '0',
        id: 'fusion2'
    }
];

/**
 * @description
 * Arreglo de opciones para un control de radio que representa las respuestas "Sí" y "No".
 * Cada objeto contiene una etiqueta, un valor y un identificador único para el control.
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @example
 * // Uso típico en un formulario:
 * <app-radio-group [options]="SI_NO_RADIO"></app-radio-group>
 *
 * @author Equipo de desarrollo VUCEM
 * @since 1.0.0
 */
export const SI_NO_RADIO = [
    {
        label: 'Sí',
        value: '1',
        id:'idSiCertificacion'
    },
    {
        label: 'No',
        value: '0',
        id:'idNoCertificacion'
    }
];

/**
 * @description
 * [ES] Opciones para el control de radio que permite seleccionar si se realiza el cálculo del ejercicio ("Sí" o "No").
 * Cada objeto contiene una etiqueta (`label`), un valor (`value`) y un identificador (`id`).
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @since 1.0.0
 * @author Equipo de desarrollo VUCEM
 *
 * @example
 * // Uso en un formulario:
 * <app-radio-group [options]="AVISO_CALCULO_OPCIONES"></app-radio-group>
 */
export const AVISO_CALCULO_OPCIONES = [
    {
        label: 'Sí',
        value: '1',
        id: 'idEjercicioSi'
    },
    {
        label: 'No',
        value: '0',
        id: 'idEjercicioNo'
    }
]

/**
 * @description
 * Opciones disponibles para el aviso de porcentaje en el formulario de modificación.
 * Cada opción contiene una etiqueta (`label`), un valor (`value`) y un identificador (`id`).
 *
 * @type {Array<{ label: string; value: string; id: string }>}
 *
 * @since 1.0.0
 *
 * @see [Documentación de Aviso de Modificación](#)
 */
export const AVISO_PORCENTAJE_OPCIONES = [
    {
        label: 'Sí',
        value: '1',
        id: 'idPorcentajeSi'
    },
    {
        label: 'No',
        value: '0',
        id: 'idPorcentajeNo'
    }
]

/**
 * @description
 * Crea y retorna el estado inicial para la solicitud 30505.
 *
 * @returns {Solicitud30505State} El estado inicial de la solicitud 30505 con valores predeterminados.
 *
 * @memberof Tramites30505Store
 *
 * @see Solicitud30505State
 */
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
  ]

  /**
 * @description
 * Configuración de columnas para la tabla de Fusión/Escisión.
 * Define los encabezados, claves de acceso y el orden de las columnas que se mostrarán en la interfaz.
 * 
 * @type {ConfiguracionColumna<FusionEscision>[]}
 * 
 * @property {string} encabezado - Título de la columna que se muestra en la tabla.
 * @property {(fila: FusionEscision) => any} clave - Función que retorna el valor a mostrar en la columna, dependiendo de la fila y condiciones específicas.
 * @property {number} orden - Orden en el que se muestra la columna en la tabla.
 * 
 * @author Equipo de Desarrollo VUCEM
 * @since 2024-06
 */
export const FUSION_CONFIGURATION_TABLA: ConfiguracionColumna<FusionEscision>[] =
  [
    {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (fila) => fila.certificacionModal == '1'? fila.rfcBusquedaModal: fila.rfcBusquedaModalSC,
      orden: 1,
    },
    { encabezado: 'Denominación o Razón Social', clave: (fila) => fila.certificacionModal == '1' ? fila.razonSocialFusionante : fila.razonSocialFusionanteSC, orden: 2},
    { encabezado: 'Folio VUCEM de la Última certificación/renovación', clave: (fila) => fila.folioVucemFusionante, orden: 3 },
    {
      encabezado: 'Fecha de fin de vigencia de la Última certificación/renovación',
      clave: (fila) => fila.fechaInicioVigenciaFusionante,
      orden: 4,
    },
    { encabezado: 'Fecha de inicio de vigencia de la Última certificación/renovación',
       clave: (fila) => fila.fechaFinVigenciaFusionante,
        orden: 5 
      },
  ];

  /**
 * @description
 * Configuración de las columnas para la tabla de Aviso de Agente.
 * Cada objeto en el arreglo representa una columna con su encabezado, función para obtener el valor de la fila y el orden de aparición.
 *
 * @type {ConfiguracionColumna<AvisoAgente>[]}
 *
 * @see AvisoAgente
 * @see ConfiguracionColumna
 *
 * @memberof AvisoModificacion
 *
 * @example
 * // Uso en un componente de tabla:
 * <app-tabla [columnas]="AVISO_AGENTE_DE_TABLA" [datos]="agentes"></app-tabla>
 */
export const AVISO_AGENTE_DE_TABLA: ConfiguracionColumna<AvisoAgente>[] =
  [
    {
      encabezado: 'Tipo de Figura',
      clave: (fila) => fila.tipoFigura,
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
      clave: (fila) => fila.numPatenteModal,
      orden: 6,
    },
    {
      encabezado: 'Estatus',
      clave: (fila) => fila.patenteModificada,
      orden: 7,
    }
  ];
  

