
  
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
  
  export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
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