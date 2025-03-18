import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioImportacionRoutingModule } from './permiso-sanitario-importacion-routing.module';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SanitarioComponent } from './pages/sanitario/sanitario.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { ServiciosPermisoSanitarioService } from './services/servicios-permiso-sanitario.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';

@NgModule({
  declarations: [
    PasoTresComponent,
    SanitarioComponent,
    PasoDosComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    PermisoSanitarioImportacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent,
    SolicitanteComponent,
  ],
  providers: [ServiciosPermisoSanitarioService],
})
export class PermisoSanitarioImportacionModule {}
