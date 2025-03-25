import { BtnContinuarComponent, FirmaElectronicaComponent, InputFechaComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeReporteAnnualComponent } from './components/datos-de-reporte-annual/datos-de-reporte-annual.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { ProgramasReporteAnnualComponent } from './components/programas-reporte-annual/programas-reporte-annual.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporteAnualRoutingModule } from './reporte-anual-routing.module';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudDeReporteComponent } from './pages/solicitud-de-reporte/solicitud-de-reporte.component';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    SolicitudDeReporteComponent,
    ProgramasReporteAnnualComponent,
    DatosDeReporteAnnualComponent,
    DatosComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FormsModule,
    ReactiveFormsModule,
    ReporteAnualRoutingModule,
    FirmaElectronicaComponent,
    TituloComponent,
    InputFechaComponent,
    TablaDinamicaComponent
  ],
  providers: [provideHttpClient(), ToastrService],
})
export class ReporteAnualModule {}
