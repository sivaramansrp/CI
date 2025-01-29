import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuanceExtensionModificationRoutingModule } from './issuance-extension-modification-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { TercerorRelacionadosComponent } from './components/terceror-relacionados/terceror-relacionados.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { TituloComponent } from "../../shared/components/titulo/titulo.component";
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';

@NgModule({
  declarations: [
    PasoDosComponent,
    PasoCuatroComponent,
    PasoTresComponent,
    PasoUnoComponent,
    ZoosanitarioPageComponent,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    TercerorRelacionadosComponent,
    PagoDeDerechosComponent,

  ],
  imports: [
    SharedModule,
    CommonModule,
    IssuanceExtensionModificationRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    InputCheckComponent,
    SelectCatalogosComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent
  ]
})
export class IssuanceExtensionModificationModule { }
