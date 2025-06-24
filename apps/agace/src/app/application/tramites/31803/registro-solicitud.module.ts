import { AcuseYResolucionesFolioTramiteService } from '@libs/shared/data-access-user/src/core/services/shared/acuses-y-resolucions-folio-tramite/acuses-y-resoluciones-folio-tramite.service';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RegistroSolicitudRoutingModule } from './registro-solicitud-routing.module';
import { RegistroSolicitudService } from './services/registro-solicitud-service.service';
import { SharedModule } from '@libs/shared/data-access-user/src';
import { SolicitudComponent } from './components/Solicitud.component';
import { ToastrService } from 'ngx-toastr';
import { TramiteFolioService } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RegistroSolicitudRoutingModule,
    SolicitudComponent,
    HttpClientModule
  ],
  providers: [ToastrService,RegistroSolicitudService,CatalogosService,
    TramiteFolioService,AcuseYResolucionesFolioTramiteService],
})
export class RegistroSolicitudModule { }
