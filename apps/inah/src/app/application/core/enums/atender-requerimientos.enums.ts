import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/280101/component/solicitud/solicitud.component'
          ).then((m) => m.SolicitudComponent),
        componentName: 'SolicitudComponent',
      },
    ],
  },
];
