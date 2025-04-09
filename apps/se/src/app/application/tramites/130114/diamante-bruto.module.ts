import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { BtnContinuarComponent, CrosslistComponent, InputRadioComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DatosDeLaMercanciaComponent } from '../../shared/components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteComponent } from '../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DiamanteBrutoComponent } from './pages/diamante-bruto/diamante-bruto.component';
import { DiamanteBrutoRoutingModule } from './diamante-bruto-routing.module';
import { PaisProcendenciaComponent } from '../../shared/components/pais-procendencia/pais-procendencia.component';
import { PartidasDeLaMercanciaComponent } from '../../shared/components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentacionComponent } from '../../shared/components/representacion/representacion.component';
import { SolicitudComponent } from '../130114/component/solicitud.component';


@NgModule({
    declarations: [
      DiamanteBrutoComponent,
      PasoUnoComponent,
      SolicitudComponent
    ],
  imports: [
        CommonModule,
        DiamanteBrutoRoutingModule,
        WizardComponent,
        BtnContinuarComponent,
        TituloComponent,
        InputRadioComponent,
        SolicitanteComponent,
        ReactiveFormsModule,
        PasoTresComponent,
        PasoDosComponent,
        DatosDelTramiteComponent,
        DatosDeLaMercanciaComponent,
        PartidasDeLaMercanciaComponent ,
        TablaDinamicaComponent,
        PaisProcendenciaComponent,
        RepresentacionComponent,
        CrosslistComponent,
        ToastrModule.forRoot()
  ],
  providers: [
    ToastrService
  ]
})
export class DiamanteBrutoModule {}
