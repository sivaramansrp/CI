import { ConfiguracionColumna } from '@ng-mf/data-access-user';

interface AcuseNotificacionRequerimiento {
  numero: string;
  documento: string;
}
export const ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA: ConfiguracionColumna<AcuseNotificacionRequerimiento>[] =
  [
    {
      encabezado: 'No.',
      clave: (fila) => fila.numero,
      orden: 1,
    },
    {
      encabezado: 'Documento',
      clave: (fila) => fila.documento,
      orden: 2,
    },
  ];
