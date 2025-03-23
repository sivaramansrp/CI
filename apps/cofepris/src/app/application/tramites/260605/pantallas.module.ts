/* eslint-disable @nx/enforce-module-boundaries */
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { AnexarDocumentosComponent } from 'libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
// import { DeLaMuestraComponent } from './components/de-la-muestra/de-la-muestra.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
// import { InformacionDeLaComponent } from './components/informacion-de-la/informacion-de-la.component';
import { NavComponent } from 'libs/shared/data-access-user/src/tramites/components/nav/nav.component';
import { NgModule } from '@angular/core';
// import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PantallasRoutingModule } from './pantallas-routing.module';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { ReprestantanteComponent } from './components/represtantante/represtantante.component';
import { AduanerasInformacionesComponent } from './components/aduaneras-informaciones/aduaneras-informaciones.component';
import { FaseDosComponent } from './pages/fase-dos/fase-dos.component';
import { FaseTresComponent } from './pages/fase-tres/fase-tres.component';
import { RegistroCuentasBancariasService } from './services/registro-cuentas-bancarias.service';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';

@NgModule({
  declarations: [
    DatosComponent,
    PantallasComponent,
    FaseDosComponent,
    FaseTresComponent,
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    WizardComponent,
    NavComponent,
    SolicitanteComponent,
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent,
    FirmaElectronicaComponent,
    BtnContinuarComponent,
    ReprestantanteComponent,
    AduanerasInformacionesComponent,
  ],
  providers: [RegistroCuentasBancariasService, provideHttpClient(),CatalogosService,ToastrService,
    
    InicioSesionService,SubirDocumentoService,ServiciosPantallaService ]

})
export class Pantallas260605Module {}
