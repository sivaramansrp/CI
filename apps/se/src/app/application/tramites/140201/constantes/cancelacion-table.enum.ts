import { CancelacionDeAutorizaciones } from "../models/cancelacions.model";

export const CANCELACION_DE_AUTORIZACIONES=[
    {
        encabezado: 'Folio de programa',
        clave: (ele: CancelacionDeAutorizaciones): string => ele.folioDePrograma,
        orden: 1,
      },
      {
        encabezado: 'Tipo programa',
        clave: (ele: CancelacionDeAutorizaciones): string => ele.tipoPrograma,
        orden: 1,
      },
      {
        encabezado: 'Selecciona la modalidad',
        clave: (ele: CancelacionDeAutorizaciones): string => ele.seleccionaLaModalidad,
        orden: 1,
      }

]