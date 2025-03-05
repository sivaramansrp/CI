import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenunciaDeDerechosDeRoutingModule } from './renuncia-de-derechos-de-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RenunciaDeDerechosDePermisosComponent } from './pages/renuncia-de-derechos-de-permisos/renuncia-de-derechos-de-permisos.component';
import { AlertComponent, WizardComponent } from '@ng-mf/data-access-user';
import {
  BtnContinuarComponent,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { RenunciaDeDerechosDeComponent } from './pages/renuncia-de-derechos-de/renuncia-de-derechos-de.component';
import { PermisoRenunciaDeDerechosComponent } from './components/permiso-renuncia-de-derechos/permiso-renuncia-de-derechos.component';

@NgModule({
  declarations: [
    DatosComponent,
    RenunciaDeDerechosDePermisosComponent,
    RenunciaDeDerechosDeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RenunciaDeDerechosDeRoutingModule,
    WizardComponent,
    AlertComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    PermisoRenunciaDeDerechosComponent
  ],
  providers: [provideHttpClient()],
})
export class RenunciaDeDerechosDeModule {}
