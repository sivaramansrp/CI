import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/31101/pages/paso-uno/paso-uno.component').then(
            (m) => m.PasoUnoComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
];
