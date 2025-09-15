import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './component/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DomicilioDelEstablecimientoComponent } from './component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { ModificacionDeDispositivosRoutingModule } from './modificacion-de-dispositivos-routing.module';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './component/pago-de-derechos/pago-de-derechos.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioComponent } from './pages/permiso-sanitario/permiso-sanitario.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TercerosRelacionadosVistaComponent } from './component/terceros-relacionados/terceros-relacionados-vista.component';
import { ToastrService } from 'ngx-toastr';
import { TramitesAsociadoComponent } from './component/tramites-asociado/tramites-asociado.component';

import { provideHttpClient } from '@angular/common/http';



@NgModule({
    declarations: [
        PermisoSanitarioComponent,
        PasoUnoComponent
    ],
    providers: [provideHttpClient(), InicioSesionService, ToastrService, SubirDocumentoService],
    imports: [
        CommonModule,
        ModificacionDeDispositivosRoutingModule,
        WizardComponent,
        SolicitanteComponent,
        TercerosRelacionadosVistaComponent,
        TramitesAsociadoComponent,
        DatosDeLaSolicitudComponent,
        DomicilioDelEstablecimientoComponent,
        PagoDeDerechosComponent,
        TituloComponent,
        CatalogoSelectComponent,
        ReactiveFormsModule,
        BtnContinuarComponent,
        TablaDinamicaComponent,
        PasoDosComponent,
        PasoTresComponent,
        AlertComponent
    ],
})
export class ModificacionDeDispositivosModule { }
