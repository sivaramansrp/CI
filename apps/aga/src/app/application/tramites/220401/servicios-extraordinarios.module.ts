import { AgregarTransporteComponent, CatalogosService } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { NavComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { ServiciosExtraordinariosRoutingModule } from './servicios-extraordinarios-routing.module';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
  ],
  imports: [
    TercerosComponent,
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
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [
    ToastrService,
    CatalogosService
  ]
})
export class ServiciosExtraordinariosModule {}
