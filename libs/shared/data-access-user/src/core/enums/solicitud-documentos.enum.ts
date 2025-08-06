import { CatalogoTipoDocumento } from "../models/shared/catalogos.model";

export const CONFIGURACION_ENCABEZADO_DOCUMENTOS = [
    { encabezado: 'descripcion', clave: (item: CatalogoTipoDocumento) => item.description, orden: 1 },
]