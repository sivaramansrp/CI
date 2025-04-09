
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
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

import { DatosComponent } from './pages/datos/datos.component';

import { DatosEstablecimientoComponent } from './components/datosEstablecimiento/datosEstablecimiento.component';
import { DerechosComponent } from './components/derechos/derechos.component';
import { SanitarioService } from './services/sanitario.service';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoduosComponent } from './pages/pasoduos/pasoduos.component';
import { PasotresComponent } from './pages/paso-tres/paso-tres.component';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { provideHttpClient } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { TercerosRelacionadoesComponent } from './components/terceros-Relacionados/terceros-Relacionados.component';
import { ModificacionPermisoSanitarioRoutingModule } from './modificacion-permiso-sanitario-routing.module';
import { forwardRef } from '@angular/core';
import { AsociadosComponent } from './components/asociados/asociados.component';



@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    PasoduosComponent,
    PasotresComponent,
  ],
  imports: [
    CommonModule, 
    HttpClientModule,
    ModificacionPermisoSanitarioRoutingModule, 
    CommonModule,
    ReactiveFormsModule,
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    TercerosRelacionadoesComponent,
    DatosEstablecimientoComponent,
    DerechosComponent,
    AsociadosComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    ToastrModule.forRoot(),
    FirmaElectronicaComponent,
    AlertComponent,
    forwardRef(() => InputRadioComponent)    
  ],
  
  providers: [
      ToastrService,
      provideHttpClient(),
      CatalogosService,
      InicioSesionService,
      SubirDocumentoService,
      ServiciosPantallaService,
      SanitarioService
    ],
})
export class ModificacionPermisoSanitarioModule {}
