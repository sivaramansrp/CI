import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 130108,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/130108/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 300105,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/300105/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
];