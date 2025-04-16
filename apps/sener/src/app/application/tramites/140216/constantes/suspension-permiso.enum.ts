import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { PermisosVigentes } from "../models/suspension-permiso.model";

export const PERMISOS_VIGENTES_ENCABEZADO_DE_TABLA: ConfiguracionColumna<PermisosVigentes>[] = [
    { encabezado: 'Número resolución', clave: (fila) => fila.numeroResolucion, orden: 1 },
    { encabezado: 'Tipo solicitud', clave: (fila) => fila.tipoSolicitud, orden: 2 },
    { encabezado: 'Régimen', clave: (fila) => fila.regimen, orden: 3 },
    { encabezado: 'Clasificación régimen', clave: (fila) => fila.clasificacionRegimen, orden: 4 },
    { encabezado: 'Periodo de vigencia', clave: (fila) => fila.periodoDeVigencia, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 6 },
    { encabezado: 'Unidad de medida', clave: (fila) => fila.unidad, orden: 7 },
    { encabezado: 'NICO', clave: (fila) => fila.nico, orden: 8 },
    { encabezado: 'Descripción NICO', clave: (fila) => fila.nicoDescripcion, orden: 9 },
    { encabezado: 'Acotación', clave: (fila) => fila.acotacion, orden: 10 },
    { encabezado: 'Cantidad autorizada', clave: (fila) => fila.cantidadAutorizada, orden: 11 },
    { encabezado: 'Valor autorizada', clave: (fila) => fila.valorAutorizada, orden: 12 },
    { encabezado: 'Fecha inicio de vigencia de la resolución', clave: (fila) => fila.fechaInicioVigencia, orden: 13 },
    { encabezado: 'Fecha fin de vigencia de la resolución', clave: (fila) => fila.fechaFinVigencia, orden: 14 }
]

export const FECHA_SALIDA = {
    labelNombre: 'Fecha de suspensión',
    required: true,
    habilitado: true,
  };