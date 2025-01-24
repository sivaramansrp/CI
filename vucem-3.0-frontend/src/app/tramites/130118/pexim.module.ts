import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { RouterModule } from '@angular/router';
import { PeximRoutingModule } from './pexim-routing.module';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { SharedModule } from '../../shared/shared.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { PedimentoComponent } from '../5701/components/pedimento/pedimento.component';
import { AgregaPersonasComponent } from '../5701/components/agrega-personas/agrega-personas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { SelectPaisesComponent } from '../../shared/components/select-paises/select-paises.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';



@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WizardComponent,
    PeximRoutingModule,
    SharedModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    SelectCatalogosComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    CrosslistComponent,
    PedimentoComponent,
    SelectCatalogosComponent,
    AgregaPersonasComponent,
    ReactiveFormsModule,
    TituloComponent,
    SelectPaisesComponent,
    FirmaElectronicaComponent
  ],
  exports: [
    SolicitudComponent
  ]
})
export class PeximModule { }
