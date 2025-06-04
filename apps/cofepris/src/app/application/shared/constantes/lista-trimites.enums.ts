import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 260101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 260212,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260212/pages/datos-260212/datos-260212.component').then(m => m.Datos260212Component),
            componentName: 'Datos260212Component',

        }]
    },
     {
        tramite: 260215,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260215/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
       {
        tramite: 260912,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260912/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    }
];