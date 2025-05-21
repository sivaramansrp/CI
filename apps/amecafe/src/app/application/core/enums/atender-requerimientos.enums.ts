import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/290101/components/datos-de-la-solicitud/datos-de-la-solicitud.component'
          ).then((m) => m.DatosDeLaSolicitudComponent),
        componentName: 'DatosComponent',
      },
    ],
  },
];
