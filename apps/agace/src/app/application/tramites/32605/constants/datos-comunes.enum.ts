import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

  
  /**
   * Opciones utilizadas en botones de selección tipo radio para respuestas "Sí" o "No".
   */
  export const OPCIONES_DE_BOTON_DE_RADIO = [
    {
      label: 'Sí',
      value: '1',
    },
    {
      label: 'No',
      value: '0',
    }
  ];

  export const REGISTRO_ESQUEMA_CERTIFICACION_OPTIONS = [
    {
      label: 'Si Autorizo',
      value: '1',
    },
    {
      label: 'No Autorizo',
      value: '0',
    }
  ]
  export const INFORMACION_EMPRESA_OPTIONS = [
    {
      label: 'Pública',
      value: '1',
    },
    {
      label: 'Privada',
      value: '0',
    }
  ]
  export const FECHA_DE_PAGO = {
  labelNombre: '',
  required: false,
  habilitado: true,
};

export const FECHA_DE_INICIO = {
  labelNombre: 'Fecha de Inicio de Operaciones de Comercio Exterior',
  required: false,
  habilitado: true,
};

export const FECHA_DELA_ULTIMA_OPERACION = {
  labelNombre: 'Fecha de la última operación',
  required: false,
  habilitado: true,
}
export interface EmpresaDelGrupo{
  rfcEnclaveOperativo: string;
  denominacionRazonsocial: string;
  domicilio: string;
  inputfechaDeLaUltimaOperacion: string;
}

export const EMPRESA_DEL_GRUPO = [
    {
        encabezado: 'RFC',
        clave: (ele: EmpresaDelGrupo): string => ele.rfcEnclaveOperativo,
        orden: 1,
    },
    {
        encabezado: 'Denominación o Razón social',
        clave: (ele: EmpresaDelGrupo): string => ele.denominacionRazonsocial,
        orden: 2,
    },
    {
        
        encabezado: 'Domicilio',
        clave: (ele: EmpresaDelGrupo): string => ele.domicilio,
        orden: 3,
    }
];
export const EMPRESA_DEL_GRUPO_CON_FECHA = [
    {
        encabezado: 'RFC',
        clave: (ele: EmpresaDelGrupo): string => ele.rfcEnclaveOperativo,
        orden: 1,
    },
    {
        encabezado: 'Denominación o Razón social',
        clave: (ele: EmpresaDelGrupo): string => ele.denominacionRazonsocial,
        orden: 2,
    },
    {
        encabezado: 'Domicilio',
        clave: (ele: EmpresaDelGrupo): string => ele.domicilio,
        orden: 3,
    },
    {
        encabezado: 'Fecha de la última operación',
        clave: (ele: EmpresaDelGrupo): string => ele.inputfechaDeLaUltimaOperacion,
        orden: 4,
    }
];

/**
 * Define los paneles colapsables para diferentes secciones en la interfaz de solicitud de donación.
 */
export const PANELS = [
    { label: 'Empresas del Grupo', isCollapsed: false },
   
];

export const PANELS1 = [
    { label: 'Transportistas', isCollapsed: false },
   
];
export interface TransportistasTable {
  /**
   * RFC del transportista.
   * Representa el Registro Federal de Contribuyentes del transportista, utilizado para su identificación fiscal.
   */
  rfc: string;

  /**
   * Razón social del transportista.
   * Es el nombre legal de la empresa o entidad que presta el servicio de transporte.
   */
  razonSocial: string;

  /**
   * Domicilio del transportista.
   * Dirección física donde se encuentra ubicado el transportista o su empresa.
   */
  domicilio: string;

  /**
   * CAAT del transportista.
   * Representa el Certificado de Autorización de Autotransporte, necesario para la operación legal del transportista.
   */
  caat: string;
}
export const TRANSPORTISTAS_CONFIGURACION: ConfiguracionColumna<TransportistasTable>[] =
  [
    /**
     * Configuración para la columna "RFC".
     * Muestra el RFC de cada transportista.
     */
    {
      encabezado: 'RFC',
      clave: (item: TransportistasTable) => item.rfc,
      orden: 1,
    },

    /**
     * Configuración para la columna "Denominación o Razón Social".
     * Muestra la razón social o denominación del transportista.
     */
    {
      encabezado: 'Denominación o Razón social',
      clave: (item: TransportistasTable) => item.razonSocial,
      orden: 2,
    },

    /**
     * Configuración para la columna "Domicilio".
     * Muestra la dirección del transportista.
     */
    {
      encabezado: 'Domicilio',
      clave: (item: TransportistasTable) => item.domicilio,
      orden: 3,
    },

    /**
     * Configuración para la columna "Registro CAAT vigente".
     * Muestra si el transportista tiene el registro CAAT vigente.
     */
    {
      encabezado: 'Registro CAAT vigente',
      clave: (item: TransportistasTable) => item.caat,
      orden: 4,
    },
  ];