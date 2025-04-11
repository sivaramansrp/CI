import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { FormsModule } from '@angular/forms';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ModificarDestinatarioComponent } from './components/modificar-destinatario/modificar-destinatario.component';
import { ModificarMercanciasComponent } from './components/mercancias-datos/mercancias-datos.component';
import { NgModule } from '@angular/core';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioRoutingModule } from './permiso-sanitario-routing.module';
import { PermisoSanitarioSolicitanteComponent } from './pages/permiso-sanitario-solicitante/permiso-sanitario-solicitante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudDatosComponent } from './components/solicitud-datos/solicitud-datos.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { TramitesAsociadosComponent } from './components/tramites-asociados/tramites-asociados.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { forwardRef } from '@angular/core';

@NgModule({
  declarations: [
    PermisoSanitarioSolicitanteComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudDatosComponent,
    ModificarMercanciasComponent,
    PagoDerechosComponent,
    TercerosRelacionadosComponent,
    ModificarDestinatarioComponent,
    TramitesAsociadosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PermisoSanitarioRoutingModule,
    forwardRef(() => AnexarDocumentosComponent),
    forwardRef(() => BtnContinuarComponent),
    forwardRef(() => WizardComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => AlertComponent),
    forwardRef(() => SolicitanteComponent),
    forwardRef(() => TituloComponent),
    forwardRef(() => TableComponent),
    forwardRef(() => CatalogoSelectComponent),
    forwardRef(() => InputRadioComponent),
    forwardRef(() => CrosslistComponent),
    forwardRef(() => InputFechaComponent),
    forwardRef(() => TablaDinamicaComponent),
    forwardRef(() => NotificacionesComponent),
    forwardRef(() => InputCheckComponent),
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService, CatalogosService],
})
export class PermisoSanitarioModule {}
