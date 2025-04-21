import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhytosanitaryRexportationRoutingModule } from './phytosanitary-rexportation-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PhytosanitaryRexportationRoutingModule,
    SolicitudPageComponent,
    ToastrModule.forRoot()
  ],
  providers:[ToastrService]
})
export class PhytosanitaryRexportationModule { }
