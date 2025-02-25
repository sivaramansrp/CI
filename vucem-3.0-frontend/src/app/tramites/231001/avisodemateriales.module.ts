import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdministrarResiduosComponent } from './components/administrar-residuos/administrar-residuos.component';
import { AvisodematerialesRoutingModule } from './avisodemateriales-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDelaSolicitudeComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

import { CatalogoSelectComponent } from '../../shared/components/catalogo-select/catalogo-select.component';

import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { DatosDeLosResiduosComponent } from './components/datos-de-los-residuos/datos-de-los-residuos.component';

import { AlertComponent } from '../../shared/components/alert/alert.component';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
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
