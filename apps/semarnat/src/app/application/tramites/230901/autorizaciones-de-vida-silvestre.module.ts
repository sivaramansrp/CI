import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputFechaComponent, SolicitanteComponent, TablaDinamicaComponent, TableComponent,TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AutorizacionesDeVidaSilvestreRoutingModule } from './autorizaciones-de-vida-silvestre-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { ModalComponent } from './components/modal/modal.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { TercerosComponent } from './components/terceros/terceros.component';




@NgModule({
  declarations: [DatosComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, DatosSolicitudComponent, TercerosComponent ,PagoDeDerechosComponent, ModalComponent],
  imports: [
    CommonModule,
    AutorizacionesDeVidaSilvestreRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    AlertComponent,
    CrosslistComponent,
    TableComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    ToastrModule.forRoot()
],
providers:[ToastrService]
})
export class AutorizacionesDeVidaSilvestreModule {}
