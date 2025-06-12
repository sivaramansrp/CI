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
        tramite: 40403,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/40403/pages/solicitante-page/solicitante-page.component')
                .then(m => m.SolicitantePageComponent),
            componentName: 'SolicitantePageComponent',

        }]
    },
    {
        tramite: 11201,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/11201/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
    {
        tramite: 103,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/103/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 30901,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/30901/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
    {
        tramite: 104,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/104/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
    {
         tramite: 302,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/302/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]   
    },
     {
        tramite: 105,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/105/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
     {
        tramite: 319,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/319/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 420101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/420101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 6502,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/420101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    }
];