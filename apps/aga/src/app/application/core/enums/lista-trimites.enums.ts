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
        tramite: 630103,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/630103/pages/autorizacion-importacion-temporal/autorizacion-importacion-temporal.component').then(m => m.AutorizacionImportacionTemporalComponent),
            componentName: 'AutorizacionImportacionTemporalComponent',

        }]
    },
];