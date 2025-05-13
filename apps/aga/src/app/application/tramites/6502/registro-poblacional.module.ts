import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroPoblacionalRoutingModule } from './registro-poblacional-routing.module';
import { SolicitudPasoComponent } from './pages/solicitud-paso/solicitud-paso.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AvisoDeCambioComponent } from './components/aviso-de-cambio/aviso-de-cambio.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { RegistroPoblacionalService } from './service/registro-poblacional.service';

@NgModule({
  declarations: [
    SolicitudPasoComponent,
    PasoUnoComponent,
    PasoDosComponent
  ],
  imports: [
    CommonModule,
    RegistroPoblacionalRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    AvisoDeCambioComponent,
    FirmaElectronicaComponent
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    ServiciosPantallaService,
    RegistroPoblacionalService,
  ],
})
export class RegistroPoblacionalModule {}
