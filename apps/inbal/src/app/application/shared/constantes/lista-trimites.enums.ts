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
        tramite: 270201,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/270201/pages/datos-270201/datos-270201.component').then(m => m.Datos270201Component),
            componentName: 'DatosComponent',

        }]
    },
];