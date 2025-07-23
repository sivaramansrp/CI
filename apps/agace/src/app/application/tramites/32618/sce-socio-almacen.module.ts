import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComunesComponent } from './components/datos-comunes/datos-comunes.component';
import { DatosComunesTresComponent } from '../../shared/components/datos-comunes-tres/datos-comunes-tres.component';
import { NgModule } from '@angular/core';
import { PasoDuosComponent } from './pages/paso-duos/paso-duos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PerfilesFerrovarioComponent } from './components/perfiles-ferrovario/perfiles-ferrovario.component';
import { SceSocioAlmacenRoutingModule } from './sce-socio-almacen-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { AlmacenGeneralComponent } from './components/almacen-general/almacen-general.component';


@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDuosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    DatosComunesTresComponent,
    DatosComunesComponent,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent,
    SceSocioAlmacenRoutingModule,
    TercerosRelacionadosComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    WizardComponent,
    AlmacenGeneralComponent,
    PerfilesFerrovarioComponent,
    TituloComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
  ],
})
export class SceSocioAlmacenModule {}
