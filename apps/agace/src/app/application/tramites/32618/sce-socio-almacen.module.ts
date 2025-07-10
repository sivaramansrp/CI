import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComunesComponent } from './components/datos-comunes/datos-comunes.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SceSocioAlmacenRoutingModule } from './sce-socio-almacen-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';



@NgModule({
  declarations: [SolicitudPageComponent, PasoUnoComponent],
  imports: [CommonModule,DatosComunesComponent, SceSocioAlmacenRoutingModule,TercerosRelacionadosComponent, SolicitanteComponent, BtnContinuarComponent,WizardComponent ],
})
export class SceSocioAlmacenModule {}
