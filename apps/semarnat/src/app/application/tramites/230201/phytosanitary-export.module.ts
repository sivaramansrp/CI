import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhytosanitaryExportRoutingModule } from './phytosanitary-export-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PhytosanitaryExportRoutingModule,
    SolicitudPageComponent
  ],
  providers: [
    ToastrService
  ]
})
export class PhytosanitaryExportModule { }
