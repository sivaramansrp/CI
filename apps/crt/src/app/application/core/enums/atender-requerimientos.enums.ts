import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../seleccion-tramite/seleccion-tramite.component').then(
            (m) => m.SeleccionTramiteComponent
          ),
        componentName: 'SeleccionTramiteComponent',
      },
    ],
  },
];
