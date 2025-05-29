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
        tramite: 230501,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/230501/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
];