import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosComponent } from './pages/datos/datos.component';
import { TercerosRelacionadosComponent } from './components/tercerosRelacionados/tercerosRelacionados.component';
import { DatosDeLaComponent } from './components/datosDeLa/datosDeLa.component';
import { DerechosComponent } from './components/derechos/derechos.component';
import { SanitarioService } from './services/sanitario.service';



@NgModule({
  declarations: [PantallasComponent, DatosComponent],
  imports: [
    CommonModule, 
    HttpClientModule,
    PermisoSanitarioRoutingModule, 
    WizardComponent,
    SolicitanteComponent,
    BtnContinuarComponent,
    TercerosRelacionadosComponent,
    DatosDeLaComponent,
    DerechosComponent
  ],
  providers:[SanitarioService]
})
export class PermisoSanitarioModule {}
