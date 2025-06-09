import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 317,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/317/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 31601,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/31601/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 32504,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/32504/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 32516,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/32516/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
    },
    {
        tramite: 32501,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/32501/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    }
];