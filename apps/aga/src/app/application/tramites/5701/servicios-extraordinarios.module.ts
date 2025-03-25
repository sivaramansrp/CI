import { AgregarTransporteComponent, CatalogosService, UppercaseDirective } from '@ng-mf/data-access-user';
import { NgModule, forwardRef } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AgregaPersonasComponent } from './components/agrega-personas/agrega-personas.component';
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
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PedimentoComponent } from './components/pedimento/pedimento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { ServiciosExtraordinariosRoutingModule } from './servicios-extraordinarios-routing.module';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  imports: [
    forwardRef(() => TercerosComponent),
    forwardRef(() => AgregaPersonasComponent),
    forwardRef(() =>AgregarTransporteComponent),
    forwardRef(() =>AlertComponent),
    forwardRef(() => AnexarDocumentosComponent),
    forwardRef(() => BtnContinuarComponent),
    forwardRef(() => CatalogoSelectComponent),
    CommonModule,
    forwardRef(() => CrosslistComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => InputCheckComponent),
    forwardRef(() => InputFechaComponent),
    forwardRef(() => InputHoraComponent),
    forwardRef(() => NavComponent),
    forwardRef(() => PedimentoComponent),
    ReactiveFormsModule,
    forwardRef(() => RepresentanteFiscalComponent),
    RouterModule,
    forwardRef(() => SelectCatalogosComponent),
    forwardRef(() => SelectPaisesComponent),
    ServiciosExtraordinariosRoutingModule,
    forwardRef(() => SolicitanteComponent),
    forwardRef(() => TituloComponent),
    forwardRef(() => WizardComponent),
    forwardRef(() => UppercaseDirective),
    ToastrModule.forRoot()
  ],
  exports: [
    PasoUnoComponent
  ],
  providers: [
    ToastrService,
    CatalogosService
  ]
})
export class ServiciosExtraordinariosModule {}
