import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdministrarResiduosComponent } from './components/administrar-residuos/administrar-residuos.component';
import { AvisodematerialesRoutingModule } from './aviso-de-materiales-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelaSolicitudeComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { DatosDeLosResiduosComponent } from './components/datos-de-los-residuos/datos-de-los-residuos.component';

import { AlertComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitanteDatosTabsComponent } from './pages/solicitante-datos-tabs/solicitante-datos-tabs.component';

@NgModule({
  declarations: [
    DatosDelaSolicitudeComponent,
    DatosComponent,
    PantallasComponent,
    SolicitanteDatosTabsComponent
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    ReactiveFormsModule,
    WizardComponent,
    TituloComponent,
    AdministrarResiduosComponent,
    DatosDeLosResiduosComponent,
    CatalogoSelectComponent,
    BtnContinuarComponent,
    AlertComponent,
    SolicitanteComponent
  ],
  
  exports: [PantallasComponent]
})
export class AvisodematerialesModule { }
