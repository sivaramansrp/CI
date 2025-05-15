import { AlertComponent, TablaDinamicaComponent, TableComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AvisoDeModificacionComponent } from './pages/aviso-de-modificacion/aviso-de-modificacion.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { AvisoDeModificationRoutingModule } from './aviso-de-modificacion-routing.module';
import { TipoDeAvisoComponent } from './components/tipo-de-aviso/tipo-de-aviso.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { AvisoCalculoComponent } from './components/aviso-calculo/aviso-calculo.component';
import { CambioDenominacionRazonSocialComponent } from './components/cambio-denominacion-razon-social/cambio-denominacion-razon-social.component';
import { FusionOEscisionComponent } from './components/fusion-o-escision/fusion-o-escision.component';
import { AvisoAgenteComponent } from './components/aviso-agente/aviso-agente.component';
import { AgregarAgenteComponent } from './components/agregar-agente/agregar-agente.component';

@NgModule({
  declarations: [
    AvisoDeModificacionComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
     WizardComponent,
    BtnContinuarComponent,
    AvisoCalculoComponent,
    SolicitanteComponent,
    FusionOEscisionComponent,
    FirmaElectronicaComponent,
    CambioDenominacionRazonSocialComponent,
    TituloComponent,
    TipoDeAvisoComponent,
    TercerosRelacionadosComponent,
    TableComponent,
    FormsModule,
    AlertComponent,
    AnexarDocumentosComponent,
    AvisoAgenteComponent,
    AgregarAgenteComponent,
    CambioDenominacionRazonSocialComponent,
    CatalogoSelectComponent,
    AvisoDeModificationRoutingModule,
    TablaDinamicaComponent,
    ToastrModule.forRoot()
  ],
  exports: [
  ],
  providers: [ToastrService],
})
export class AvisoDeModificacionModule {}
