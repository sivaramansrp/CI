import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { DiscripccionDeLaMercanciaForm } from "../models/transportacion-maritima.model";

export const CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA: ConfiguracionColumna<DiscripccionDeLaMercanciaForm>[] = [
    { encabezado: 'Nombre', clave: (fila) => fila.Consecutivo, orden: 1 },
    { encabezado: 'Domicilio', clave: (fila) => fila.estado, orden: 2},
    { encabezado: 'Descripción', clave: (fila) => fila.Cantidad, orden: 3 },
    { encabezado: 'País', clave: (fila) => fila.FormaParteDePatrimonio, orden: 4 },
]