import { CommonModule } from '@angular/common';

import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { RegistroTransportistaComponent } from './pages/registro-transportista/registro-transportista.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';

import { DatosDelTramiteComponent } from './components/datos-del-tramite/datos-del-tramite.component';

import { Datos40302Component } from './pages/datos-40302/datos-40302.component';

import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { RegistroTransportistaRoutingModule } from './registro-transportista-routing.module';

import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { NgModule } from '@angular/core';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';


@NgModule({
    declarations: [RegistroTransportistaComponent,Datos40302Component],
    imports: [
        CommonModule,
        BtnContinuarComponent,
        TituloComponent,
        WizardComponent,
        SolicitanteComponent,
        DatosDelTramiteComponent,
        PasoUnoComponent,
        PasoTresComponent,
        RegistroTransportistaRoutingModule
    ],
    providers: [
        provideHttpClient(),
        InicioSesionService,
        SubirDocumentoService,
        ToastrService,
    ],
})
export class RegistroTransportistaModule { }