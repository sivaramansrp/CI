import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 80101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/80101/pages/paso-uno-cs/paso-uno-cs.component').then(m => m.PasoUnoCsComponent),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 140201,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/140201/pages/datos/datos.component').then(m => m.DatosComponent),
              componentName: 'DatosComponent',
        }]
    },
    {
            tramite: 130110,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/130110/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
];