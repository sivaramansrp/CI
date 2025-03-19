import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogosService,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaComponent } from './components/datosDeLa/datosDeLa.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoduosComponent } from './pages/pasoduos/pasoduos.component';
import { PasotresComponent } from './pages/pasotres/pasotres.component';
import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    PasoduosComponent,
    PasotresComponent,
  ],
  imports: [
    CommonModule,
    PermisoSanitarioRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    AlertComponent,
    DatosDeLaComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    ToastrModule.forRoot(),
    FirmaElectronicaComponent
  ],
  providers: [
      ToastrService,
      provideHttpClient(),
      CatalogosService,
      InicioSesionService,
      SubirDocumentoService,
      ServiciosPantallaService
    ],
})
export class PermisoSanitarioModule {}
