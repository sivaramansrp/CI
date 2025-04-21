import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CancelacionComponent } from './components/cancelacion/cancelacion.component';
import { CancelacionPeticionRoutingModule } from './cancelacion-peticion-routing.module';
import { CommonModule } from '@angular/common';
import { ManifiestosDeclaracionesComponent } from './components/manifiestosDeclaraciones/manifiestosDeclaraciones.component';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoCancelarComponent } from './components/permisoCancelar/permisoCancelar.component';
import { PermisoSanitarioModule } from '../260211/permiso-sanitario.module';
import { RepresentanteLegalComponent } from './components/representanteLegal/representanteLegal.component';
import { TramiteAsociadosComponent } from '../../shared/components/tramite-asociados/tramite-asociados.component';


@NgModule({
  declarations: [
    PantallasComponent,
    PasoUnoComponent,
    CancelacionComponent,
    ManifiestosDeclaracionesComponent
  ],
  imports: [
    CommonModule,
    CancelacionPeticionRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    SolicitanteComponent,
    AlertComponent,
    PermisoSanitarioModule,
    PermisoCancelarComponent,
    RepresentanteLegalComponent,
    TramiteAsociadosComponent,
  ]
})
export class CancelacionPeticionModule { }
