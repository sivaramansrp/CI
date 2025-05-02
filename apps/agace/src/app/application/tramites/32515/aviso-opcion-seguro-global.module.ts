import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, SelectPaisesComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvisoOpcionSeguroGlobalRoutingModule} from './aviso-opcion-seguro-global-routing.module';
import { CommonModule } from '@angular/common';
import { InformationGeneralSolicitanteComponent } from "./components/information-general-solicitante/information-general-solicitante.component";
import { InformationGeneralSolicitanteService } from './services/information-general-solicitante.service';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RouterModule } from '@angular/router';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    WizardComponent,
    AvisoOpcionSeguroGlobalRoutingModule,
    SharedModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    TituloComponent,
    SelectPaisesComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InformationGeneralSolicitanteComponent
],
  exports: [
  ],
  providers: [
    InformationGeneralSolicitanteService,
    ToastrService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvisoOpcionSeguroGlobalModule { }
