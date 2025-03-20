import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisoSanitarioRoutingModule } from './aviso-sanitario-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { FirmarSolicitudComponent } from './pages/firmar-solicitud/firmar-solicitud.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, ServiciosExtraordinariosService, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { DatosDelEstablecimientoComponent } from './components/datos-del-establecimiento/datos-del-establecimiento.component';


@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    PasoDosComponent,
    FirmarSolicitudComponent,
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
    DatosDelEstablecimientoComponent
  ],
  providers: [
    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
    ServiciosExtraordinariosService,
    CatalogosService
  ]
})
export class AvisoSanitarioModule { }
