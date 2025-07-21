import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AvisoSanitarioRoutingModule } from './aviso-sanitario-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosDelEstablecimientoComponent } from './components/datos-del-establecimiento/datos-del-establecimiento.component';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AvisoSanitarioRoutingModule,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    BtnContinuarComponent,
    DatosDeLaSolicitudComponent,
    TercerosRelacionadosComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent,
    DatosDelEstablecimientoComponent,
    DatosComponent,
    PantallasComponent,
    PasoDosComponent,
    FirmarSolicitudComponent,
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
    CatalogosService
  ],
  exports: []
})
export class AvisoSanitarioModule { }
