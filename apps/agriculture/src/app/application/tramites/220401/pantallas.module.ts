import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgregarDestinatoriaComponent } from './components/agregar-destinatoria/agregar-destinatoria.component';

import { BtnContinuarComponent, CatalogoSelectComponent, ServiciosPantallasService } from '@ng-mf/data-access-user';
import { CombinacionRequeridaComponent } from './components/combinacion-requerida/combinacion-requerida.component';
import { DatosComponent } from './pages/datos/datos.component';
import { NavComponent } from '@ng-mf/data-access-user';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PantallasRoutingModule } from './pantallas-routing.module';

import { PagoDeDerechoComponent } from './components/pago-de-derecho/pago-de-derecho.component';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPantallasComponent } from './components/solicitud/solicitud.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TransporteComponent } from './pages/transporte/transporte.component';
import { WizardComponent } from '@ng-mf/data-access-user';

import { DatosDelCertificadoComponent } from './components/datos-del-certificado/datos-del-certificado.component';
import { DatosGeneralesAnimalesComponent } from './components/datos-generales-animales/datos-generales-animales.component';
import { provideHttpClient } from '@angular/common/http';

 import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
 import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [ 
    PantallasComponent,
    DatosComponent,
    TransporteComponent,
    ],
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    PagoDeDerechoComponent,
    PantallasRoutingModule,    
    NavComponent,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    SolicitudPantallasComponent,
    // DatosDelCertificadoComponent,
    FormsModule,
    ReactiveFormsModule,
    CombinacionRequeridaComponent,
    TercerosRelacionadosComponent,
    AgregarDestinatoriaComponent,
    DatosGeneralesAnimalesComponent,
    SelectCatalogosComponent ,
    DatosDelCertificadoComponent,
   SolicitanteComponent,
   PasoDosComponent,
   PasoTresComponent
  ],
  
  providers: [
      provideHttpClient(),
      ServiciosPantallasService,
      ToastrService,
    ],
})
/**
 * Este módulo se utiliza para configurar los componentes del módulo 220401.
 * Importar los componentes del módulo.
 */
export class PantallasModule { }
