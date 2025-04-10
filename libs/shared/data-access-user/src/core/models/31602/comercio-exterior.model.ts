export interface EmpresasDelGrupo {
    rfc: string;
    denominctionORazonSocial: string;
    domicillo: string;
}

export const EMPRESAS_TABLA = [
    {
      encabezado: 'RFC',
      clave: (ele: EmpresasDelGrupo) => ele.rfc,
      orden: 1,
    },
    {
      encabezado: 'Denominction o razon social',
      clave: (ele: EmpresasDelGrupo) => ele.denominctionORazonSocial,
      orden: 2,
    },
    {
      encabezado: 'Domicillo',
      clave: (ele: EmpresasDelGrupo) => ele.domicillo,
      orden: 3,
    },
];