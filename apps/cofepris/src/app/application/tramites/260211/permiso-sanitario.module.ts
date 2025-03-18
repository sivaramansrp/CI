import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
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
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaComponent } from './components/datosDeLa/datosDeLa.component';
import { PasoduosComponent } from './pages/pasoduos/pasoduos.component';
import { PasotresComponent } from './pages/pasotres/pasotres.component';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';


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
