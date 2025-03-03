import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportistaTerrestreRoutingModule } from './transportista-terrestre-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '@ng-mf/data-access-user';
//import { NavComponent } from '../../shared/components/nav/nav.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { AlertComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { SharedModule } from '../../shared/shared.module';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { AgregarTransporteComponent } from '../../shared/components/agregar-transporte/agregar-transporte.component';
import { RepresentanteFiscalComponent } from '../../shared/components/representante-fiscal/representante-fiscal.component';
import { SelectPaisesComponent } from '../../shared/components/select-paises/select-paises.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { CatalogoSelectComponent } from '../../shared/components/catalogo-select/catalogo-select.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { DirectorGeneralComponent } from './components/director-general/director-general.component';

@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    VehiculosComponent,
    PasoTresComponent,
    DirectorGeneralComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransportistaTerrestreRoutingModule,
    RouterModule,
    //   NavComponent,
    forwardRef(() => WizardComponent),
    TituloComponent,
    forwardRef(() => BtnContinuarComponent),
    ReactiveFormsModule,
    forwardRef(() => AlertComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => SelectCatalogosComponent),
    AnexarDocumentosComponent,
    InputCheckComponent,
    InputHoraComponent,
    InputFechaComponent,
    CrosslistComponent,
    AgregarTransporteComponent,
    RepresentanteFiscalComponent,
    SelectPaisesComponent,
    // ContendorComponent,
    CatalogoSelectComponent,
    SolicitanteComponent,
    ChoferesComponent,
  ],
  exports: [SolicitanteComponent],
})
export class TransportistaTerrestreModule {}
