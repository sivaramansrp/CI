import {AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaceRoutingModule } from './adace-routing.module';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AvisoComponent } from './components/aviso.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { AdaceService } from './services/adace.service';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [PasoDosComponent, PasoUnoComponent, PasoTresComponent, SolicitudPageComponent],
  imports: [
    CommonModule,
    AdaceRoutingModule,
    HttpClientModule,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent, 
    FirmaElectronicaComponent,
    SharedModule,
    SolicitanteComponent, 
    AvisoComponent,
    WizardComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
   ],
  providers: [ToastrService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdaceModule { }
