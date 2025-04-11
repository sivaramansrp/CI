import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, InputFechaComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PageComponent } from './pages/page/page.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AutorizacionDeRayosXRoutingModule } from './autorizacion-de-rayos-x-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { TercerosRelacionadosComponent } from './pages/terceros-relacionados/terceros-relacionados.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { DerechosComponent } from './pages/derechos/derechos.component';

@NgModule({
  declarations: [
    PageComponent, 
    PasoUnoComponent, 
    SolicitudComponent,
    TercerosRelacionadosComponent,
    DerechosComponent,
    PagoDeDerechosComponent,
  ],
  imports: [
    CommonModule, 
    AutorizacionDeRayosXRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    // DatosDelSolicitanteComponent,
    InputFechaComponent,
    AlertComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService
  ]
})
export class AutorizacionDeRayosXModule {}
