import {
  BtnContinuarComponent,
  CatalogoSelectComponent,
  NotificacionesComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdministrarResiduosComponent } from './components/administrar-residuos/administrar-residuos.component';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AvisodematerialesRoutingModule } from './aviso-de-materiales-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLosResiduosComponent } from './components/datos-de-los-residuos/datos-de-los-residuos.component';
import { DatosDelGeneradorDeResiduosComponent } from './components/datos-del-generador-de-residuos/datos-del-generador-de-residuos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
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
    TituloComponent,
    AdministrarResiduosComponent,
    DatosDeLosResiduosComponent,
    DatosDelGeneradorDeResiduosComponent,
    CatalogoSelectComponent,
    BtnContinuarComponent,
    AlertComponent,
    SolicitanteComponent,
    WizardComponent,
    PasoDosComponent,
    PasoTresComponent,
    NotificacionesComponent,
  ],
  providers: [ToastrService],
})
export class AvisodematerialesModule {}
