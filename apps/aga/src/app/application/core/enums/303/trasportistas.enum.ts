import { Transportista } from "@libs/shared/data-access-user/src";

export const CONFIGURACION_ENCABEZADO_TRASPORTISTA = [
    { encabezado: 'Trasportista', clave: (item: Transportista) => item.nacionalidad, orden: 1 },
    { encabezado: 'Denominación o Razón Social', clave: (item: Transportista) => item.denominacionRazonSocial, orden: 2 },
    { encabezado: 'R.F.C.', clave: (item: Transportista) => item.rfc, orden: 3 },
    { encabezado: 'Nombre(s)', clave: (item: Transportista) => item.nombre, orden: 4 },
    { encabezado: 'Primer Apellido', clave: (item: Transportista) => item.apellidoPaterno, orden: 5 },
    { encabezado: 'Segundo Apellido', clave: (item: Transportista) => item.apellidoMaterno, orden: 6 },
    { encabezado: 'Tax ID', clave: (item: Transportista) => item.taxId, orden: 7 }
]
