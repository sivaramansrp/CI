import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 80101,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/80101/pages/paso-uno-cs/paso-uno-cs.component'
          ).then((m) => m.PasoUnoCsComponent),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 140201,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/140201/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 80205,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/80205/pages/paso-uno/paso-uno.component').then(
            (m) => m.PasoUnoComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 130110,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/130110/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 120602,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/120602/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 90201,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/90201/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 120101,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/120101/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 120301,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/120301/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 80308,
    listaComponentes: [{
        id: 'solicitud',
        componentPath: () => import('../../tramites/80308/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
    }]
  },
     {
        tramite: 120402,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/120402/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    }

];
