import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosExtraordinariosRoutingModule } from './servicios-extraordinarios-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { TercerosComponent } from './components/terceros/terceros.component';
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';



@NgModule({
  declarations: [
    SolicitanteComponent,
    SolicitudPageComponent,
    SolicitudComponent,
    TercerosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent
  ] ,
  imports: [
    CommonModule,
    ServiciosExtraordinariosRoutingModule,
    RouterModule,
    NavComponent,
    WizardComponent,
    TituloComponent,
    InputTextComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    AlertComponent
    // PasoUnoComponent
],
exports: [
  SolicitanteComponent,
  SolicitudComponent,
  TercerosComponent
]
})
export class ServiciosExtraordinariosModule { }
