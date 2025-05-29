import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 220102,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/220102/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',
        },]
    },
     {
        tramite: 2201601,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/221601/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
];