import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from './components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioProductosRoutingModule } from './permiso-sanitario-productos-routing.module';
import { RepresentanteLegalComponent } from './components/representante-legal/representante-legal.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { Solocitud260104Service } from './services/service260104.service';
import { TercerosRelacionadosDestinoComponent } from './components/terceros-relacionados-destino/terceros-relacionados-destino.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent
  ],
  imports: [
    CommonModule, 
    PermisoSanitarioProductosRoutingModule,
    SolicitanteComponent,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent,
    DatosDeLaSolicitudComponent,
    RepresentanteLegalComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    PagoDeDerechosContenedoraComponent,
    TercerosRelacionadosDestinoComponent,
    TituloComponent, 
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService,Solocitud260104Service],
})
export class PermisoSanitarioProductosModule {}
