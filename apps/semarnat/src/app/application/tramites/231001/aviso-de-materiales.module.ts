import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdministrarResiduosComponent } from './components/administrar-residuos/administrar-residuos.component';
import { AvisodematerialesRoutingModule } from './aviso-de-materiales-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { DatosDeLosResiduosComponent } from './components/datos-de-los-residuos/datos-de-los-residuos.component';
import { DatosDelGeneradorDeResiduosComponent } from './components/datos-del-generador-de-residuos/datos-del-generador-de-residuos.component';

import { AlertComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitanteDatosTabsComponent } from './pages/solicitante-datos-tabs/solicitante-datos-tabs.component';
import { ToastrService } from 'ngx-toastr';

import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';

@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    SolicitanteDatosTabsComponent,
  ],
  imports: [
    CommonModule,
    AvisodematerialesRoutingModule,
    ReactiveFormsModule,
    WizardComponent,
    TituloComponent,
    AdministrarResiduosComponent,
    DatosDeLosResiduosComponent,
    DatosDelGeneradorDeResiduosComponent,
    CatalogoSelectComponent,
    BtnContinuarComponent,
    AlertComponent,
    SolicitanteComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  providers : [ToastrService]
})
export class AvisodematerialesModule {}
