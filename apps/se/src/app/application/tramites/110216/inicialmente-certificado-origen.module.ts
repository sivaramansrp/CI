import { BtnContinuarComponent, WizardComponent } from "@libs/shared/data-access-user/src";
import { InicialmenteCertificadoOrigenRoutingModule } from "./inicialmente-certificado-origen-routing.module";
import { NgModule } from "@angular/core";
import { PasoTresComponent } from "./pages/paso-tres/paso-tres.component";
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { RouterModule } from "@angular/router";
import { SolicitantePageComponent } from "./pages/solicitante-page/solicitante-page.component";

@NgModule({
  declarations: [
    SolicitantePageComponent,
  ],
  imports: [
    BtnContinuarComponent,
    InicialmenteCertificadoOrigenRoutingModule,
    RouterModule,
    WizardComponent,
    PasoUnoComponent,
    PasoTresComponent
  ],
  exports: [],
  providers: []
})
export class InicialmenteCertificadoOrigenModule {


}