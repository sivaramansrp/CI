import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, FirmaElectronicaComponent, SelectCatalogosComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from "@ng-mf/data-access-user";
import { SolicitudModalidadPageComponent } from './pages/solicitud-modalidad-page/solicitud-modalidad-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { CambioDeModalidadComponent } from './component/cambio-de-modalidad/cambio-de-modalidad.component';
import { ToastrService } from 'ngx-toastr';
import { RegistroSolicitudRoutingModule } from './registro-solicitud-routing.module';





@NgModule({
  declarations: [
    SolicitudModalidadPageComponent,
    PasoUnoComponent,
    PasoTresComponent,
    PasoCuatroComponent,
    PasoDosComponent,

  ],
  imports: [
    CommonModule,
    RegistroSolicitudRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    AlertComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    TablaDinamicaComponent,
    CambioDeModalidadComponent,
    SelectCatalogosComponent,
    SharedModule
  ],

  providers: [ToastrService],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RegistroSolicitudModule { }