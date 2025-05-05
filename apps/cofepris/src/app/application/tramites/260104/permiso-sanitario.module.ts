import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';


import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { PagoDeDerechosContenedoraComponent } from './components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosRelacionadosDestinoComponent } from './components/terceros-relacionados-destino/terceros-relacionados-destino.component';


@NgModule({
  declarations: [
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
        SolicitudPageComponent
  ],
  imports: [
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CommonModule,
    FirmaElectronicaComponent,
    PagoDeDerechosContenedoraComponent,
    PermisoSanitarioRoutingModule,
    SolicitanteComponent,
    TercerosRelacionadosDestinoComponent,
    TituloComponent, 
    WizardComponent,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService],
})
export class PermisoSanitarioModule { }
