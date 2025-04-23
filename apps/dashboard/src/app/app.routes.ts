import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { SeleccionTramiteDesdePanelComponent } from './seleccion-tramite-desde-panel/seleccion-tramite-desde-panel.component';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';

// Helper function para simplificar el código de carga de módulos remotos
const loadRemoteApp = (remoteName: string, exposedModule: string = './Module', moduleImportName: string | null = null) => {
  return () => 
    loadRemoteModule({
      type: 'manifest',
      remoteName,
      exposedModule
    }).then(m => {
      // Si no se proporciona un nombre específico para la importación, intentamos usar convenciones comunes
      if (!moduleImportName) {
        if (m.RemoteEntryModule) return m.RemoteEntryModule;
        
        // Convenciones para diferentes módulos
        const conventionModuleNames = [
          `App${remoteName.charAt(0).toUpperCase() + remoteName.slice(1)}Module`, // AppLoginModule
          remoteName.charAt(0).toUpperCase() + remoteName.slice(1) + 'Module',     // LoginModule
          `Remote${remoteName.charAt(0).toUpperCase() + remoteName.slice(1)}Module` // RemoteLoginModule
        ];
        
        for (const name of conventionModuleNames) {
          if (m[name]) return m[name];
        }
        
        // Si no encontramos ninguna convención, usamos la primera exportación que parezca un módulo
        const possibleModules = Object.keys(m).filter(key => key.includes('Module'));
        if (possibleModules.length > 0) return m[possibleModules[0]];
      }
      
      // Si se proporcionó un nombre específico, lo usamos
      return moduleImportName ? m[moduleImportName] : m.RemoteEntryModule;
    })
};

// Configuración de las rutas de la aplicación
export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: loadRemoteApp('login', './Module', 'RemoteEntryModule')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'seleccion-tramite',
    component: SeleccionTramiteDesdePanelComponent
  },
  {
    path: 'aga',
    loadChildren: loadRemoteApp('aga', './Module', 'AppAgaModule')
  },
  {
    path: 'agace',
    loadChildren: loadRemoteApp('agace', './Module', 'AppAgaceModule'),
  },
  {
    path: 'agriculture',
    loadChildren: loadRemoteApp('agriculture', './Module', 'AppAgriculturaModule')
  },
  {
    path: 'se',
    loadChildren: loadRemoteApp('se', './Module', 'AppSEModule')
  },
  {
    path: 'semarnat',
    loadChildren: loadRemoteApp('semarnat', './Module', 'AppSemarnatModule')
  },
  {
    path: 'sener',
    loadChildren: loadRemoteApp('sener', './Module', 'AppSenerModule')
  },
  {
    path: 'funcionario',
    loadChildren: loadRemoteApp('funcionario', './Module', 'AppFuncionarioModule')
  },
  {
    path: 'cofepris',
    loadChildren: loadRemoteApp('cofepris', './Module', 'AppCofeprisModule')
  },
  {
    path: 'amecafe',
    loadChildren: loadRemoteApp('amecafe', './Module', 'AppAmecafeModule')
  },
  {
    path: 'sedena',
    loadChildren: loadRemoteApp('sedena', './Module', 'AppSedenaModule')
  },
  {
    path: 'inbal',
    loadChildren: loadRemoteApp('inbal', './Module', 'AppInbalModule')
  },
  {
    path: 'profepa',
    loadChildren: loadRemoteApp('profepa', './Module', 'AppProfepaModule')
  },
  {
    path: 'inah',
    loadChildren: loadRemoteApp('inah', './Module', 'AppInahModule')
  },
  {
    path: 'crt',
    loadChildren: loadRemoteApp('crt', './Module', 'AppCrtModule')
  },
  {
    path: 'stps',
    loadChildren: loadRemoteApp('stps', './Module', 'AppStpsModule')
  },
  {
    path: 'bandejas',
    loadChildren: loadRemoteApp('bandejas', './Module', 'AppBandejasModule')
  }
];
