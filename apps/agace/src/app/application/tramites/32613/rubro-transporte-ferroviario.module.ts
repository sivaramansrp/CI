import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComunesComponent } from '../32605/components/datos-comunes/datos-comunes.component';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDuosComponent } from './pages/paso-duos/paso-duos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RubroTransporteFerroviarioRoutingModule } from './rubro-transporte-ferroviario-routing.module';
import { TercerosRelacionadosComponent } from '../32605/components/terceros-relacionados/terceros-relacionados.component';

@NgModule({
  declarations: [
    PantallasComponent,
    PasoUnoComponent,
    PasoDuosComponent,
    PasoTresComponent
  ],
  imports: [
    CommonModule,
    RubroTransporteFerroviarioRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent,
    SolicitanteComponent,
    DatosComunesComponent,
    TercerosRelacionadosComponent
  ]
})
export class RubroTransporteFerroviarioModule { }
