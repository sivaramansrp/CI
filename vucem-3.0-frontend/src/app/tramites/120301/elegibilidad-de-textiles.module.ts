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
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';


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
    ElegibilidadDeTextilesRoutingModule,
    WizardComponent,
    TituloComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    SharedModule,
    BtnContinuarComponent,
    CrosslistComponent,
    SelectCatalogosComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    
  ]
})
export class ElegibilidadDeTextilesModule { }
