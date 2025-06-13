import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 230101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/230101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 230902,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/230902/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {       
        tramite: 230401,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/230401/pages/paso-uno-cs/paso-uno-cs.component').then(m => m.PasoUnoCsComponent),
            componentName: 'PasoUnoCsComponent',

        }]
    },
    {
        tramite: 230501,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/230501/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 230301,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/230301/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
        tramite: 231001,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/231003/pages/aviso-reciclaje/aviso-reciclaje.component').then(m => m.AvisoReciclajeComponent),
            componentName: 'AvisoReciclajeComponent',
        }]
    },
];