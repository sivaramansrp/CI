import { AgenteAduanal } from "../../models/303/agente-aduanal.model";

/**
 * Configuración del encabezado de la tabla de figuras aduanales.
 */
export const CONFIGURACION_ENCABEZADO_FIGURAS = [
    { encabezado: 'Nombre', clave: (item: AgenteAduanal) => item.nombreAgente, orden: 1 },
    { encabezado: 'Primer apellido', clave: (item: AgenteAduanal) => item.apellidoPaternoAgente, orden: 2 },
    { encabezado: 'Segundo apellido', clave: (item: AgenteAduanal) => item.apellidoMaternoAgente, orden: 3 },
    { encabezado: 'Patente/Autorización', clave: (item: AgenteAduanal) => item.patente, orden: 4 },
    { encabezado: 'Razon Social', clave: (item: AgenteAduanal) => item.razonSocial, orden: 5 },
]

/**
 * Enum para las figuras aduanales seleccionadas.
 */
export enum TipoFiguraSeleccionada {
    AgenteAduanal = '1',
    ApoderadoAduanal = '2',
    AgenciaAduanal = '3'
}

