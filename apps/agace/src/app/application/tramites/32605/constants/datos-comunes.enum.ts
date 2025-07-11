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
  rfcEnclaveOperativo: string;
  denominacionRazonsocial: string;
  domicilio: string;
  caat: string;
}
export const TRANSPORTISTAS_CONFIGURACION: ConfiguracionColumna<TransportistasTable>[] =
  [
    
    {
      encabezado: 'RFC',
      clave: (item: TransportistasTable) => item.rfcEnclaveOperativo,
      orden: 1,
    },

    {
      encabezado: 'Denominación o Razón social',
      clave: (item: TransportistasTable) => item.denominacionRazonsocial,
      orden: 2,
    },

    {
      encabezado: 'Domicilio',
      clave: (item: TransportistasTable) => item.domicilio,
      orden: 3,
    },


    {
      encabezado: 'Registro CAAT vigente',
      clave: (item: TransportistasTable) => item.caat,
      orden: 4,
    },
  ];