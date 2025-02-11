import { AgregaPersonasComponent } from './components/agrega-personas/agrega-personas.component';
import { AgregarTransporteComponent } from '../../shared/components/agregar-transporte/agregar-transporte.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { CatalogoSelectComponent } from './../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PedimentoComponent } from './components/pedimento/pedimento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteFiscalComponent } from '../../shared/components/representante-fiscal/representante-fiscal.component';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { SelectPaisesComponent } from '../../shared/components/select-paises/select-paises.component';
import { ServiciosExtraordinariosRoutingModule } from './servicios-extraordinarios-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosComponent } from '../../shared/components/terceros/terceros.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    TercerosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    AgregaPersonasComponent,
    AgregarTransporteComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    CommonModule,
    CrosslistComponent,
    FirmaElectronicaComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    NavComponent,
    PedimentoComponent,
    ReactiveFormsModule,
    RepresentanteFiscalComponent,
    RouterModule,
    SelectCatalogosComponent,
    SelectPaisesComponent,
    ServiciosExtraordinariosRoutingModule,
    SharedModule,
    SolicitanteComponent,
    TituloComponent,
    WizardComponent,
  ],
  exports: [SolicitudComponent, TercerosComponent],
})
export class ServiciosExtraordinariosModule { }