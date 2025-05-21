import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/220401/components/agregar-destinatoria/agregar-destinatoria.component'
          ).then((m) => m.AgregarDestinatoriaComponent),
        componentName: 'DatosComponent',
      },
    ],
  },
];
