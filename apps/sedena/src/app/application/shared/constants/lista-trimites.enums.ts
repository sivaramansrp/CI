import { AccuseComponentes } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';

export const LISTA_TRIMITES: AccuseComponentes[] = [
  {
    tramite: 240101,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240101/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 240107,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240107/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240108,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240108/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240119,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240119/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240120,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240120/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240111,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240111/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240112,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240112/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240114,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240114/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 240117,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/240117/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },{   tramite: 240122,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240122/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },{
        tramite: 240321,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/240321/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    }
];
