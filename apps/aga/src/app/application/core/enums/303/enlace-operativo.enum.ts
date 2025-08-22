import { EnlaceOperativo } from "../../models/303/enlace-operativo.model";


export const ENLACE_OPERATIVO = [
    { encabezado: 'RFC', clave: (item: EnlaceOperativo) => item.rfc, orden: 1 },
    { encabezado: 'Nombre', clave: (item: EnlaceOperativo) => item.nombre, orden: 2 },
    { encabezado: 'Primer apellido', clave: (item: EnlaceOperativo) => item.apellidoPaterno, orden: 3 },
    { encabezado: 'Segundo apellido', clave: (item: EnlaceOperativo) => item.apellidoMaterno, orden: 4 },
    { encabezado: 'Ciudad o estado de Recidencia', clave: (item: EnlaceOperativo) => item.ciudad, orden: 5 },
    { encabezado: 'Cargo o Puesto', clave: (item: EnlaceOperativo) => item.cargoPuesto, orden: 6 },
    { encabezado: 'Telefono', clave: (item: EnlaceOperativo) => item.telefono, orden: 7 },
    { encabezado: 'Correo Electronico', clave: (item: EnlaceOperativo) => item.correoElectronico, orden: 8 },
    { encabezado: 'Suplente', clave: (item: EnlaceOperativo) => item.suplente, orden: 9 }
]