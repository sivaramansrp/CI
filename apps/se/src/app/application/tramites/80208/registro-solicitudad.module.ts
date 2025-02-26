
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
import { RegistroSolicitudModalidadRoutingModule } from './registro-solicitudad-routing.module';
import { CombioDeModalidadComponent } from './component/combio-de-modalidad/combio-de-modalidad.component';
import { ToastrService } from 'ngx-toastr';





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
    RegistroSolicitudModalidadRoutingModule,
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
    CombioDeModalidadComponent,
    SelectCatalogosComponent,
    SharedModule
  ],

  providers: [ToastrService],



})
export class RegistroSolicitudModalidadModule { }