import { BtnContinuarComponent } from '@libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagoDeDerechosBancoComponent } from '../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoPlaguicidasImportacionRoutingModule } from './permiso-plaguicidas-importacion-routing.module';
import { PlaguicidasComponent } from './pages/plaguicidas/plaguicidas.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { TercerosRelacionadosComponent } from "../../shared/components/terceros-fabricante/terceros-fabricante.component";

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PlaguicidasComponent,
  ],
  imports: [
    CommonModule,
    PermisoPlaguicidasImportacionRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    PagoDeDerechosBancoComponent,
    TercerosRelacionadosComponent
],
})
export class PermisoPlaguicidasImportacionModule {}
