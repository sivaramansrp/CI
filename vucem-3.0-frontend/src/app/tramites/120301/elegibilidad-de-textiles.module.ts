import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElegibilidadDeTextilesRoutingModule } from './elegibilidad-de-textiles-routing.module';
import { CapturarSolicitudComponent } from './pages/capturar-solicitud/capturar-solicitud.component';
import { ResquistosNecesariosComponent } from './pages/resquistos-necesarios/resquistos-necesarios.component';
import { AnexarRequistosComponent } from './pages/anexar-requistos/anexar-requistos.component';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { ConstanciaDelRegistroComponent } from './components/constancia-del-registro/constancia-del-registro.component';
import { ElegibilidadTextilesComponent } from './pages/elegibilidad-textiles/elegibilidad-textiles.component';


@NgModule({
  declarations: [
    CapturarSolicitudComponent,
    ResquistosNecesariosComponent,
    AnexarRequistosComponent,
    FirmarSolicitudComponent,
    SolicitanteComponent,
    ConstanciaDelRegistroComponent,
    ElegibilidadTextilesComponent
  ],
  imports: [
    CommonModule,
    ElegibilidadDeTextilesRoutingModule
  ]
})
export class ElegibilidadDeTextilesModule { }
