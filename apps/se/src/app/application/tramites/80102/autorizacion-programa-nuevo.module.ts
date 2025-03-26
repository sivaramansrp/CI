import { AutorizacionProgrmaNuevoRoutingModule } from './autorizacion-programa-nuevo-routing.module';
import { AutorizacionProgrmaNuevoService } from './services/autorizacion-programa-nuevo.service';
import { CommonModule } from '@angular/common';
import { ContenedorComplementarPlantasComponent } from './components/contenedor-complementar-plantas/contenedor-complementar-plantas.component';
import { EmpresasSubfabricanteComponent } from './components/empresas-subfabricante/empresas-subfabricante.component';
import { NgModule } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [CommonModule,AutorizacionProgrmaNuevoRoutingModule,
     EmpresasSubfabricanteComponent,
     ContenedorComplementarPlantasComponent,
    ],
  providers: [ToastrService,AutorizacionProgrmaNuevoService]
})
export class AutorizacionProgrmaNuevoModule { }
