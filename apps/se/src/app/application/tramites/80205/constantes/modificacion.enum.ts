import {
  Servicio,
  ServicioInmex
  
} from '../models/datos-info.model';
export const PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Anexar necesarios',
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

export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Servicio',
    clave:  (ele: ServicioInmex ): string | undefined => ele.Servicio,
    orden: 1
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: ServicioInmex ): string | undefined => ele.RegistroContribuyentes,
    orden: 2
  },
  {
    encabezado: 'Denominación o razón socialNúmero Interior',
    clave:(ele: ServicioInmex ): string | undefined => ele.DenominaciónSocial,
    orden: 3
  },
  {
    encabezado: 'Numero del programa IMMEX',
    clave:(ele: ServicioInmex ): string | undefined => ele.NumeroIMMEX,
    orden: 4
  },
  {
    encabezado: 'Año del programa IMMEXad',
    clave: (ele: ServicioInmex ): string | undefined => ele.AñoIMMEX,
    orden: 5
  },
 
  ]
  export const CONFIGURACION_SERVICIO_IMMEX = [
    {
      encabezado: 'Descripión del servicio',
      clave:(ele: Servicio): string | undefined => ele.descripiónDelServicio,
      orden: 1
    },
    {
      encabezado: 'Tipo de servicio',
      clave: (ele: Servicio): string | undefined => ele.tipode,
      orden: 2
    },
   
   
    ]





