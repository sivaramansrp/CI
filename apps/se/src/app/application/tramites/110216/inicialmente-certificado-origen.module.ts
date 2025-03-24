import { NgModule } from "@angular/core";
import { SolicitantePageComponent } from "./pages/solicitante-page/solicitante-page.component";
import { InicialmenteCertificadoOrigenRoutingModule } from "./inicialmente-certificado-origen-routing.module";
import { BtnContinuarComponent, WizardComponent } from "@libs/shared/data-access-user/src";
import { RouterModule } from "@angular/router";
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { PasoTresComponent } from "./pages/paso-tres/paso-tres.component";

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