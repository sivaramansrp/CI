import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdministrarResiduosComponent } from './components/administrar-residuos/administrar-residuos.component';
import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelaComponent } from './components/datos-dela/datos-dela.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitanteDetosTabsComponent } from './pages/solicitante-detos-tabs/solicitante-detos-tabs.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

@NgModule({
  declarations: [
    SolicitanteComponent,
    DatosDelaComponent,
    DatosComponent,
    PantallasComponent,
    SolicitanteDetosTabsComponent
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    ReactiveFormsModule,
    WizardComponent,
    TituloComponent,
    AdministrarResiduosComponent
  ],
  exports:[
    
    PantallasComponent
  ]
})
export class AvisodematerialesModule { }
