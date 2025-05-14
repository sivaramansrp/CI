import { AlertComponent, BtnContinuarComponent, WizardComponent } from "@libs/shared/data-access-user/src";
import { AutorizacionImportacionRoutingModule } from "./autorizacion-importacion-routing.module";
import { AutorizacionImportacionService } from "./services/autorizacion-importacion.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PasoDosComponent } from "./pages/paso-dos/paso-dos.component";
import { PasoTresComponent } from "./pages/paso-tres/paso-tres.component";
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { RouterModule } from "@angular/router";
import { SolicitantePageComponent } from "./pages/solicitante-page/solicitante-page.component";
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from "ngx-toastr";


@NgModule({
  declarations: [
    SolicitantePageComponent
  ],
  imports: [
    CommonModule,
    AlertComponent,
    BtnContinuarComponent,
    AutorizacionImportacionRoutingModule,
    RouterModule,
    WizardComponent,
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [ToastrService, AutorizacionImportacionService]
})
export class AutorizacionImportacionModule {


}