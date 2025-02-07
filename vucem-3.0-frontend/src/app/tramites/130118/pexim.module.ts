import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgregaPersonasComponent } from '../5701/components/agrega-personas/agrega-personas.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PedimentoComponent } from '../5701/components/pedimento/pedimento.component';
import { PeximRoutingModule } from './pexim-routing.module';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { SelectPaisesComponent } from '../../shared/components/select-paises/select-paises.component';
import { SharedModule } from '../../shared/shared.module';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component'; 
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
    SolicitudComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent
  ],
  exports: [
    SolicitudComponent
  ]
})
export class PeximModule { }
