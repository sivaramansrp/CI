import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechoComponent } from './components/pago-de-derecho/pago-de-derecho.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PhytosanitaryRexportationRoutingModule } from './phytosanitary-rexportation-routing.module';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosComponent } from './components/terceros/terceros.component';


@NgModule({
  declarations: [
    // PagoDeDerechoComponent, 
    // PasoUnoComponent, 
    // PasoDosComponent, 
    // PasoTresComponent, 
    // SolicitudPageComponent,
    // DatosDeLaSolicitudComponent,
    // TercerosComponent
  ], 
  imports: [
    CommonModule,
    TituloComponent,
    PhytosanitaryRexportationRoutingModule,
    CatalogoSelectComponent,
    ToastrModule.forRoot(),
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    WizardComponent,
    FirmaElectronicaComponent,
    CrosslistComponent,
    SolicitanteComponent,
    TablaDinamicaComponent
  ],
  providers:[ToastrService]
})
export class PhytosanitaryRexportationModule { }
