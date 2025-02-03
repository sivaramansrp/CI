import { AgriculturaComponent } from './pages/agricultura/agricultura.component';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { FitosanitarioRoutingModule } from './fitosanitario-routing.module';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';



@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoCuatroComponent,
    AgriculturaComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent
  ],
  imports: [
    CommonModule,
    FitosanitarioRoutingModule
  ]
})
export class FitosanitarioModule { }
