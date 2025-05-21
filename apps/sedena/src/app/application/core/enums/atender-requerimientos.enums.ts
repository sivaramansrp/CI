import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240101/components/agregar-destinatario-final-contenedora/agregar-destinatario-final-contenedora.component'
          ).then((m) => m.AgregarDestinatarioFinalContenedoraComponent),
        componentName: 'AgregarDestinatarioFinalContenedoraComponent',
      },
    ],
  },
];
