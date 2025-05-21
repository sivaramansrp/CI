import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/110101/components/solicitante/solicitante.component'
          ).then((m) => m.SolicitanteComponent),
        componentName: 'SolicitanteComponent',
      },
    ],
  },
];
