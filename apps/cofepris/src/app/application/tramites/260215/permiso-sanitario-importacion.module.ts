import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioImportacionRoutingModule } from './permiso-sanitario-importacion-routing.module';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SanitarioComponent } from './pages/sanitario/sanitario.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

@NgModule({
  declarations: [
    PasoTresComponent,
    SanitarioComponent,
    PasoDosComponent,
    PasoUnoComponent,
    
  ],
  imports: [CommonModule, PermisoSanitarioImportacionRoutingModule],
})
export class PermisoSanitarioImportacionModule {}
