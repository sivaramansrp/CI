import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { AnexoUnoPestanaComponent } from './components/anexo-uno-pestana/anexo-uno-pestana.component';
import { BitacoraComponent } from '../80303/components/bitacora/bitacora.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ComplementariaComponent } from './components/complementaria/complementaria.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { ModificacionComponent } from '../80303/components/modificacion/modificacion.component';
import { ModificacionProgramaImmexBajaSubmanufactureraRoutingModule } from './modificacion-programa-immex-baja-submanufacturera-routing.module';
import { MontoYFactorComponent } from './components/monto-y-factor/monto-y-factor.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
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
    AnexoUnoPestanaComponent,
    ComplementariaComponent,
    MontoYFactorComponent,
  ],
  exports: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
  ],
})
export class ModificacionProgramaImmexBajaSubmanufactureraModule {}
