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
    tramite: 120501,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/120501/pages/paso-solicitante/paso-solicitante.component'
          ).then((m) => m.PasoSolicitanteComponent),
        componentName: 'PasoSolicitanteComponent',
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
    tramite: 130111,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/130111/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
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
    tramite: 80102,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/80102/pages/paso-uno/paso-uno.component').then(
            (m) => m.PasoUnoComponent
          ),
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
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/80308/pages/paso-uno/paso-uno.component').then(
            (m) => m.PasoUnoComponent
          ),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 130102,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/130102/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 110101,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/110101/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 110102,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/110102/pages/datos-mercancia/datos-mercancia.component'
          ).then((m) => m.DatosMercanciaComponent),
        componentName: 'DatosMercanciaComponent',
      },
    ],
  },
  {
    tramite: 120402,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/120402/pages/datos/datos.component').then(
            (m) => m.DatosComponent
          ),
        componentName: 'DatosComponent',
      },
    ],
  },
  {
    tramite: 130119,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import(
            '../../tramites/130119/pages/paso-uno/paso-uno.component'
          ).then((m) => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
  {
    tramite: 80210,
    listaComponentes: [
      {
        id: 'solicitud',
        componentPath: () =>
          import('../../tramites/80210/pages/paso-uno/paso-uno.component').then(
            (m) => m.PasoUnoComponent
          ),
        componentName: 'PasoUnoComponent',
      },
    ],
  },
   {
        tramite: 130102,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/130102/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
        {
        tramite: 130118,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/130118/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
      },
    {
      tramite: 80207,
      listaComponentes: [{
          id: 'solicitud',
          componentPath: () => import('../../tramites/80207/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
          componentName: 'PasoUnoComponent',

      }]
  },
     {
        tramite: 140103,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/140103/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
     {
        tramite: 120402,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/120402/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',

        }]
    },
     {
        tramite: 90305,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/90305/pages/datos-90305/datos-90305.component').then(m => m.Datos90305Component),
            componentName: 'DatosComponent',

        }]
    },
    {
        tramite: 80208,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/80208/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
     {
       tramite: 120204,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/120204/pages/datos/datos.component').then(m => m.DatosComponent),
            componentName: 'DatosComponent',
        }]
    },

     {
       tramite: 90101,
        listaComponentes: [{
            id: 'solicitud',
            componentPath: () => import('../../tramites/90101/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
            componentName: 'PasoUnoComponent',
        }]
    },
    {
      tramite: 130103,
      listaComponentes: [{
          id: 'solicitud',
          componentPath: () => import('../../tramites/130103/pages/pantallas/pantallas.component').then(m => m.PantallasComponent),
          componentName: 'PantallasComponent',
      }]
  },
  {
    tramite: 80203,
    listaComponentes: [{
        id: 'solicitud',
        componentPath: () => import('../../tramites/80203/pages/paso-uno/paso-uno.component').then(m => m.PasoUnoComponent),
        componentName: 'PasoUnoComponent',
    }]
  }
];
