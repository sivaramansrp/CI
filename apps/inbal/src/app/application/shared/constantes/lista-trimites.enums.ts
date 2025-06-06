import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 270101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/270101/pages/pantallas/pantallas.component').then(m => m.PantallasComponent),
            componentName: 'PantallasComponent',

        }]
    },
];