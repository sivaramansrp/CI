import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AgregarDestinatarioRoutingModule } from './agregar-destinatario-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';

import {
  BtnContinuarComponent,
  SharedModule,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';

import { AgregarDestinatarioFinalComponent } from '../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { AgregarProveedorComponent } from '../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { DatosDelTramiteComponent } from '../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosMercanciaComponent } from '../../shared/components/datos-mercancia/datos-mercancia.component';
import { PagoDeDerechocComponent } from './components/pago-de-derechoc/pago-de-derechoc.component';
import { PagoDeDerechosComponent } from '../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosContenedoraComponent } from '../240118/components/terceros-relacionados-contenedora/terceros-relacionados-contenedora.component';


@NgModule({
  declarations: [
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PagoDeDerechocComponent,
  ],
  imports: [
    CommonModule,
    AgregarDestinatarioRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    TercerosRelacionadosContenedoraComponent,
    PagoDeDerechosComponent,
    DatosMercanciaComponent,
    DatosDelTramiteComponent,
    AgregarProveedorComponent,
    AgregarDestinatarioFinalComponent,
    SharedModule,
  ],
})
export class AgregarDestinatarioModule {}
