import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElegibilidadDeTextilesRoutingModule } from './elegibilidad-de-textiles-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
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
import { RouterModule } from '@angular/router';
import { CapturarFacturasComponent } from './components/capturar-facturas/capturar-facturas.component';
import { ImportadorEnDestinoComponent } from './components/importador-en-destino/importador-en-destino.component';
import { FacturasAsociadasComponent } from './components/facturas-asociadas/facturas-asociadas.component';
import { TableComponent } from '../../shared/components/table/table.component';

@NgModule({
  declarations: [
    ConstanciaDelRegistroComponent,
    ElegibilidadTextilesComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    CapturarFacturasComponent,
    ImportadorEnDestinoComponent
  ],
  imports: [
    CommonModule,
    ElegibilidadDeTextilesRoutingModule,
    WizardComponent,
    SolicitanteComponent,
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
    RouterModule,
    FacturasAsociadasComponent,
    TableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ElegibilidadDeTextilesModule { }
