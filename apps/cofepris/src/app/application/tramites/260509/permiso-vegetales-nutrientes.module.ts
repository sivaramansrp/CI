import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogosService,
  FirmaElectronicaComponent,
  InicioSesionService,
  SolicitanteComponent,
  SubirDocumentoService,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { PermisoVegetalesNutrientesRoutingModule } from './permiso-vegetales-nutrientes-routing.module';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { DatosSolicitudComponent } from './components/datos-solicitud/datos-solicitud.component';
import { TercerosRelacionadosFabricanteComponent } from './components/terceros-relacionados-fabricante/terceros-relacionados-fabricante.component';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { AvisoDePrivacidadComponent } from '../../shared/components/aviso-de-privacidad/aviso-de-privacidad.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PlaguicidasComponent } from './pages/plaguicidas/plaguicidas.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoTresComponent,
    PasoDosComponent,
    PlaguicidasComponent,
  ],
  imports: [
    CommonModule,
    PermisoVegetalesNutrientesRoutingModule,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TituloComponent,
    WizardComponent,
    DatosSolicitudComponent,
    TercerosRelacionadosFabricanteComponent,
    PagoDerechosComponent,
    AvisoDePrivacidadComponent,
  ],
  providers: [
    ToastrService,
    CatalogosService,
    InicioSesionService,
    provideHttpClient(),
    SubirDocumentoService,
  ],
})
export class PermisoVegetalesNutrientesModule {}
