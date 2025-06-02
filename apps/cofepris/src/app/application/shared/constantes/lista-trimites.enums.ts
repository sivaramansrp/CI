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
        tramite: 260604,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260604/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 260603,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/260603/pages/datos-page/datos-page.component').then(m => m.DatosPageComponent),
            componentName: 'DatosPageComponent',

        }]
    },
];