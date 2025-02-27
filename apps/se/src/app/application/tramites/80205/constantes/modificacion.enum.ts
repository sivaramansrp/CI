
export const PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Requisitos necesarios',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Anexar necesarios',
        activo: false,
        completado: false,
    },
    {
        indice: 4,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];

export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Servicio',
    clave: (ele: any) => ele.Servicio,
    orden: 1
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: any) => ele.RegistroContribuyentes,
    orden: 2
  },
  {
    encabezado: 'Denominación o razón socialNúmero Interior',
    clave: (ele: any) => ele.DenominaciónSocial,
    orden: 3
  },
  {
    encabezado: 'Numero del programa IMMEX',
    clave: (ele: any) => ele.NumeroIMMEX,
    orden: 4
  },
  {
    encabezado: 'Año del programa IMMEXad',
    clave: (ele: any) => ele.AñoIMMEX,
    orden: 5
  },
 
  ]
  export const CONFIGURACION_SERVICIO_IMMEX = [
    {
      encabezado: 'Descripión del servicio',
      clave: (ele: any) => ele.descripiónDelServicio,
      orden: 1
    },
    {
      encabezado: 'Tipo de',
      clave: (ele: any) => ele.tipode,
      orden: 2
    },
   
   
    ]





