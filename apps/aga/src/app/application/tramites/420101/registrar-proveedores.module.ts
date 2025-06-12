import { BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrarDeProveedoresComponent } from './components/registrar-de-proveedores/registrar-de-proveedores.component';
import { RegistrarProveedoresRoutingModule } from './registrar-proveedores-routing.module';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    RegistrarDeProveedoresComponent,
    WizardComponent,
    BtnContinuarComponent,
    RegistrarProveedoresRoutingModule
  ],
  providers: [
    ToastrService
  ],
})
export class RegistrarProveedoresModule { }
