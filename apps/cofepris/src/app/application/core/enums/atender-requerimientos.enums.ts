import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/260101/components/solicitud-datos/solicitud-datos.component'
          ).then((m) => m.SolicitudDatosComponent),
        componentName: 'SolicitudDatosComponent',
      },
    ],
  },
];
