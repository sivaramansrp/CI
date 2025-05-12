
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosSolicitudComponent } from './components/datos-solicitude/datos-solicitud.component';
import { DatosSolicitudeRoutingModule } from './datos-solicitude-routing.module';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos-new/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosComponent } from '../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { TercerosRelacionadosFabricanteComponent } from './components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TramiteAsociadosComponent } from '../../shared/components/tramite-asociados/tramite-asociados.component';
import { WizardComponent } from '@ng-mf/data-access-user';




@NgModule({
  declarations: [DatosComponent, PasoUnoComponent],
  imports: [
    CommonModule,
    DatosSolicitudeRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    DatosSolicitudComponent,
    TercerosRelacionadosFabricanteComponent,
    PagoDeDerechosComponent,
    TercerosRelacionadosComponent,
    TramiteAsociadosComponent
],
})
export class DatosSolicitudeModule {}
