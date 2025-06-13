import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 240101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',
        }]
    },
    {
        tramite: 240107,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240107/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 240108,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240108/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 240119,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240119/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
       {
        tramite: 240120,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240120/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 240111,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240111/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    }
];