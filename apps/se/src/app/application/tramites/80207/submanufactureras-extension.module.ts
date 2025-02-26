import { NgModule } from "@angular/core";
import { ContenedorDePasosComponent } from "./pages/contenedor-de-pasos/contenedor-de-pasos.component";
import { PasoUnoComponent } from "./pages/paso-uno/paso-uno.component";
import { PasoDosComponent } from "./pages/paso-dos/paso-dos.component";
import { PasoTresComponent } from "./pages/paso-tres/paso-tres.component";
import { PasoCuatroComponent } from "./pages/paso-cuatro/paso-cuatro.component";
import { EmpresasSubmanufacturerasComponent } from "./components/empresas-submanufactureras/empresas-submanufactureras.component";
import { AlertComponent } from "libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { AnexarDocumentosComponent } from "libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component";
import { BtnContinuarComponent } from "libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component";
import { CatalogoSelectComponent, FirmaElectronicaComponent, SelectCatalogosComponent, SharedModule, SolicitanteComponent, TableComponent, TituloComponent, WizardComponent } from "@ng-mf/data-access-user";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SubmanufacturerasExtentionRoutingModule } from "./submanufactureras-extension-routing.module";
import {TablaDinamicaComponent} from "libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { SubManufacturerService } from "libs/shared/data-access-user/src/core/services/80207/servicios-submanufacturer-service";
import { ToastrService } from "ngx-toastr";

@NgModule({
  declarations: [
    ContenedorDePasosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent
  ],
  imports: [
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    CommonModule,
    FirmaElectronicaComponent,
    ReactiveFormsModule,
    RouterModule,
    SelectCatalogosComponent,
    SubmanufacturerasExtentionRoutingModule,
    SharedModule,
    TituloComponent,
    WizardComponent,
    SolicitanteComponent,
    TableComponent,
    FirmaElectronicaComponent,
    TablaDinamicaComponent,
    EmpresasSubmanufacturerasComponent,
  ],
 providers:[SubManufacturerService,ToastrService]
})
export class SubmanufacturerasExtentionModule {}
