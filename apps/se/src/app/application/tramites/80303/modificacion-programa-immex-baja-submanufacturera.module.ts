import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModificacionProgramaImmexBajaSubmanufactureraRoutingModule } from './modificacion-programa-immex-baja-submanufacturera-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { ModificacionComponent } from '../80303/components/modificacion/modificacion.component';
import { BitacoraComponent } from '../80303/components/bitacora/bitacora.component';
@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    ModificacionProgramaImmexBajaSubmanufactureraRoutingModule,
    AlertComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    ModificacionComponent,
    BitacoraComponent,
  ],
  exports: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
  ],
})
export class ModificacionProgramaImmexBajaSubmanufactureraModule {}
