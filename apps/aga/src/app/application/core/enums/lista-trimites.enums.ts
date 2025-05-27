import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 301,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/301/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 11204,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/11204/pages/solicitante-page/solicitante-page.component').then(m => m.SolicitantePageComponent),
            componentName: 'SolicitantePageComponent',

        }]
    },
];