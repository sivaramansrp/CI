import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtnContinuarComponent, CatalogosService, SharedModule, SolicitanteComponent, TramiteFolioService, WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AcuseYResolucionesFolioTramiteService } from '@libs/shared/data-access-user/src/core/services/shared/acuses-y-resolucions-folio-tramite/acuses-y-resoluciones-folio-tramite.service';
import { ConsultaAvisoAcreditacionRoutingModule } from './Consulta-Aviso-Acreditacion-routing.module';
import { SolicitudComponent } from './components/solicitud/Solicitud.component';
import { ConsultaAvisoAcreditacionService } from './services/consulta-aviso-acreditacion.service';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [

    PasoUnoComponent,
    SolicitudPageComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ConsultaAvisoAcreditacionRoutingModule,
    SolicitudComponent,
    HttpClientModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    
  ],
  providers: [ToastrService,ConsultaAvisoAcreditacionService,CatalogosService,
    TramiteFolioService,AcuseYResolucionesFolioTramiteService],
})
export class ConsultaAvisoAcreditacionModule { }
