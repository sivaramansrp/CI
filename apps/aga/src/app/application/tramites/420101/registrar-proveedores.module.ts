import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitanteComponent} from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SolicitanteComponent,
  ],
  providers: [
    ToastrService
  ],
})
export class RegistrarProveedoresModule { }
