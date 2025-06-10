import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 270101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/270101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'DatosComponent',

        }]
    },
     {
        tramite: 270301,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/270301/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
];