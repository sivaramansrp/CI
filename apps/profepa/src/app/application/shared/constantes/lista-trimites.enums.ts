import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
    {
        tramite: 250101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/250101/pages/datos-250101/datos-250101.component').then(m => m.Datos250101Component),
            componentName: 'DatosComponent',

        }]
    },
];