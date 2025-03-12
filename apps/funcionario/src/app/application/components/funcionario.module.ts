import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { GenerarDictamenComponent } from './evaluar-solicitud/generar-dictamen/generar-dictamen.component';
import { SolicitudPageComponent } from './evaluar-solicitud/solicitud-page/solicitud-page.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
  ]
})
export class FuncionarioModule { }
