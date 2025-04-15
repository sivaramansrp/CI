import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ParmisoImportacionCalidadRoutingModule } from './parmiso-importacion-calidad-routing.module';

import { DatosComponent } from './pages/datos/datos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { provideHttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { PagoDerechosComponent } from '../../shared/components/pago-Derechos/pago-Derechos.component';

import { AvisoTercerosRelacionadosComponent } from '../../shared/components/aviso-terceros-relacionados/aviso-terceros-relacionados.component';
import { DatosDelEstablecimientoRFCComponent } from '../../shared/components/datos-del-establecimiento-rfc/datos-del-establecimiento-rfc.component';
import { DomicilioEstablecimientoAduanasComponent } from '../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { ManifiestosComponent } from '../../shared/components/manifiestos-declaraciones/manifiestos-declaraciones.component';
import { RepresentanteLegalComponent } from '../../shared/components/representante-legal/representante-legal.component';

@NgModule({
  declarations: [DatosComponent, PantallasComponent,PasoDosComponent,PasoTresComponent

   ],
  imports: [CommonModule, 
    ParmisoImportacionCalidadRoutingModule, 
    SolicitanteComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    WizardComponent,
    PagoDerechosComponent,
    AvisoTercerosRelacionadosComponent,
    DatosDelEstablecimientoRFCComponent,
        DomicilioEstablecimientoAduanasComponent,
        ManifiestosComponent,
        RepresentanteLegalComponent,
        ],
   providers: [
      provideHttpClient(),
      
      ToastrService,
      InicioSesionService,
      SubirDocumentoService,
     ],
})
export class ParmisoImportacionCalidadModule {}
