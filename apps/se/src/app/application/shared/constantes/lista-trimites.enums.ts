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
];