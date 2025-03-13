import { AgregarTransporteComponent, CatalogosService } from '@ng-mf/data-access-user';
import { AgregaPersonasComponent } from './components/agrega-personas/agrega-personas.component';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';
import { DocumentosExistentesComponent } from './components/documentos-existentes/documentos-existentes.component';
import { EvaluarDictamenComponent } from './pages/evaluar-dictamen/evaluar-dictamen.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { forwardRef, NgModule } from '@angular/core';
import { GeneraDictamenComponent } from './components/genera-dictamen/genera-dictamen.component';
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
import { RequerimientoInformacionComponent } from './components/requerimiento-informacion/requerimiento-informacion.component';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { ServiciosExtraordinariosRoutingModule } from './servicios-extraordinarios-routing.module';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    DetalleTramiteComponent,
    GeneraDictamenComponent,
    EvaluarDictamenComponent,
    RequerimientoInformacionComponent,
    DocumentosExistentesComponent
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
    SharedModule,
    forwardRef(() => SolicitanteComponent),
    forwardRef(() => TituloComponent),
    forwardRef(() => WizardComponent),
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
