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
        tramite: 260303,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260303/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
];