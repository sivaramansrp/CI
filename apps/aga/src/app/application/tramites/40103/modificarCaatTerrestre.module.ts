/* eslint-disable sort-imports */
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { Chofer40103Service } from './estados/chofer40103.service';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { CommonModule } from '@angular/common';
import { DirectorGeneralComponent } from './components/director-general/director-general.component';
import { ModificarCaatTerrestreRoutingModule } from './modificarCaatTerrestre-routing.module';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { forwardRef } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SharedModule } from '@ng-mf/data-access-user';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import {
  AgregarTransporteComponent,
  CatalogosService,
} from '@ng-mf/data-access-user';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TablaDinamicaComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    VehiculosComponent,
    DirectorGeneralComponent,
    SolicitanteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModificarCaatTerrestreRoutingModule,
    RouterModule,
    WizardComponent,
    forwardRef(() => TituloComponent),
    forwardRef(() => BtnContinuarComponent),
    ReactiveFormsModule,
    forwardRef(() => AlertComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => SelectCatalogosComponent),
    forwardRef(() => AnexarDocumentosComponent),
    forwardRef(() => InputCheckComponent),
    forwardRef(() => InputFechaComponent),
    forwardRef(() => InputHoraComponent),
    forwardRef(() => CrosslistComponent),
    forwardRef(() => AgregarTransporteComponent),
    forwardRef(() => RepresentanteFiscalComponent),
    forwardRef(() => SelectPaisesComponent),
    forwardRef(() => CatalogoSelectComponent),
    ChoferesComponent,
    TablaDinamicaComponent
],
  exports: [
    PasoUnoComponent,
    PasoDosComponent,
   
  ],
  providers: [ToastrService, CatalogosService, Chofer40103Service],
})
export class ModificarCaatTerrestreModule {}
