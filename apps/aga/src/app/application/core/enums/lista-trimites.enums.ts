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
        tramite: 10703,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/10703/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',

        }]
    },
];