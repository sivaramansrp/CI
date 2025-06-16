import { AlertComponent, TablaDinamicaComponent, TableComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgregarAgenteComponent } from './components/agregar-agente/agregar-agente.component';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { AvisoAgenteComponent } from './components/aviso-agente/aviso-agente.component';
import { AvisoCalculoComponent } from './components/aviso-calculo/aviso-calculo.component';
import { AvisoDeModificacionComponent } from './pages/aviso-de-modificacion/aviso-de-modificacion.component';
import { AvisoDeModificationRoutingModule } from './aviso-de-modificacion-routing.module';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CambioDenominacionRazonSocialComponent } from './components/cambio-denominacion-razon-social/cambio-denominacion-razon-social.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FormsModule } from '@angular/forms';
import { FusionOEscisionComponent } from './components/fusion-o-escision/fusion-o-escision.component';
import { ModificarAgenteComponent } from './components/modificar-agente/modificar-agente.component';
import { ModificarFusionEscisionComponent } from './components/modificar-fusion-escision/modificar-fusion-escision.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TipoDeAvisoComponent } from './components/tipo-de-aviso/tipo-de-aviso.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    AvisoDeModificacionComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent
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
    ModificarAgenteComponent,
    ModificarFusionEscisionComponent,
    AvisoDeModificationRoutingModule,
    TablaDinamicaComponent,
    ToastrModule.forRoot()
  ],
  exports: [
  ],
  providers: [ToastrService],
})
export class AvisoDeModificacionModule {}
