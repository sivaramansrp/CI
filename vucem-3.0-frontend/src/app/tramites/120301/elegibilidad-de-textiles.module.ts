import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElegibilidadDeTextilesRoutingModule } from './elegibilidad-de-textiles-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { CapturarSolicitudComponent } from './pages/capturar-solicitud/capturar-solicitud.component';
import { ResquistosNecesariosComponent } from './pages/resquistos-necesarios/resquistos-necesarios.component';
import { AnexarRequistosComponent } from './pages/anexar-requistos/anexar-requistos.component';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { ConstanciaDelRegistroComponent } from './components/constancia-del-registro/constancia-del-registro.component';
import { ElegibilidadTextilesComponent } from './pages/elegibilidad-textiles/elegibilidad-textiles.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';

@NgModule({
  declarations: [
    CapturarSolicitudComponent,
    ResquistosNecesariosComponent,
    AnexarRequistosComponent,
    FirmarSolicitudComponent,
    SolicitanteComponent,
    ConstanciaDelRegistroComponent,
    ElegibilidadTextilesComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
  ],
  imports: [
    CommonModule,
    ElegibilidadDeTextilesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    WizardComponent,
    BtnContinuarComponent,
  ]
})
export class ElegibilidadDeTextilesModule { }
