/* eslint-disable @typescript-eslint/explicit-function-return-type */
export interface CompliMentaria {
  id: number;
  numerodeOrden: string;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  nombreIngles: string;
  númerodeRegistro: string;
}

export const CERTIFICADO_TABLA = [
  {
    encabezado: 'Número de orden',
    clave: (ele: CompliMentaria) => ele.numerodeOrden,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria*',
    clave: (ele: CompliMentaria) => ele.fraccionArancelaria,
    orden: 2
  },
  {
    encabezado: 'Nombre técnico',
    clave: (ele: CompliMentaria) => ele.nombreTecnico,
    orden: 3
  },
  {
    encabezado: 'Nombre comercial',
    clave: (ele: CompliMentaria) => ele.nombreComercial,
    orden: 4
  },
  {
    encabezado: 'Nombre inglés',
    clave: (ele: CompliMentaria) => ele.nombreIngles,
    orden: 5
  },
  {
    encabezado: 'Número de registro',
    clave: (ele: CompliMentaria) => ele.númerodeRegistro,
    orden: 6
  }
]
