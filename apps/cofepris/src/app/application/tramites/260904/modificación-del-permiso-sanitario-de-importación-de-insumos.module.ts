import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitud260904Component } from './components/datos-de-la-solicitud-260904/datos-de-la-solicitud-260904.component';
import { DomicilioDelEstablecimiento260904Component } from './components/domicilio-del-establecimiento-260904/domicilio-del-establecimiento-260904.component';
import { ModPermisoSanitarioImportacion260904Component } from './pages/mod-permiso-sanitario-importacion-260904/mod-permiso-sanitario-importacion-260904.component';
import { ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosRoutingModule } from './modificación-del-permiso-sanitario-de-importación-de-insumos-routing.module';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from '../260912/pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../260912/pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@NgModule({
  declarations: [
    PasoUnoComponent,
    ModPermisoSanitarioImportacion260904Component,
  ],
  imports: [
    CommonModule,
    ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosRoutingModule,
    PasoDosComponent,
    PasoTresComponent,
    WizardComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    DatosDeLaSolicitud260904Component,
    DomicilioDelEstablecimiento260904Component
  ],
  providers: [ToastrService],
})
export class ModificaciónDelPermisoSanitarioDeImportaciónDeInsumosModule {}
