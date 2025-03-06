interface compliMentaria {
  númerodeorden: string;
  fracciónarancelaria: string;
  nombretécnico: string;
  nombrecomercial: string;
  nombreinglés: string;
  númeroderegistro: string;
}


export const CERTIFICADO_TABLA = [
  {
    encabezado: 'Número de orden',
    clave: (ele: compliMentaria) => ele.númerodeorden,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria*',
    clave: (ele: compliMentaria) => ele.fracciónarancelaria,
    orden: 2
  },
  {
    encabezado: 'Nombre técnico',
    clave: (ele: compliMentaria) => ele.nombretécnico,
    orden: 3
  },
  {
    encabezado: 'Nombre comercial',
    clave: (ele: compliMentaria) => ele.nombrecomercial,
    orden: 4
  },
  {
    encabezado: 'Nombre inglés',
    clave: (ele: compliMentaria) => ele.nombreinglés,
    orden: 5
  },
  {
    encabezado: 'Número de registro',
    clave: (ele: compliMentaria) => ele.númeroderegistro,
    orden: 6
  }
]
