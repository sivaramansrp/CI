import { Notificadores } from "../../models/303/notificadores.model";

export const PERSONAS_OIR_RECIBIR_NOTIFICACIONES = [
    { encabezado: 'RFC', clave: (item: Notificadores) => item.RFC, orden: 1 },
    { encabezado: 'CURP', clave: (item: Notificadores) => item.curp, orden: 2 },
    { encabezado: 'Nombre', clave: (item: Notificadores) => item.nombre, orden: 3 },
    { encabezado: 'Apellido Paterno', clave: (item: Notificadores) => item.apellidoPaterno, orden: 4 },
    { encabezado: 'Apellido Materno', clave: (item: Notificadores) => item.apellidoMaterno, orden: 5 }
];
