import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/atender-requerimientos.model';

export interface AcusesYResoluciones {
  folio: string;
  fechaInicial: string;
  fechaFinal: string;
  dependencia: string;
  unidadAdministrativaORepresentacionFederal: string;
  tipoDeSolicitud: string;
  estatusDeLaSolicitud: string;
  diasHabilesTranscurridos: string;
}
export interface BotonDeAccion {
  etiqueta: string;
  clase: string;
  metodo: string;
  urlAccion: string;
}
export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../../tramites/301/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
];
