
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CertificadoZoosanitario } from './certificado-zoosanitario-routing.module';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from './components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZoosanitarioPageComponent } from './pages/zoosanitario-page/zoosanitario-page.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CertificadoZoosanitario,
    ReactiveFormsModule,
    PagoDeDerechosComponent,
    ToastrModule.forRoot(),
    DatosDeLaSolicitudComponent,
    DatosParaMovilizacionNacionalComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoUnoComponent,
    ZoosanitarioPageComponent,
        
  ],
  providers: [
    ToastrService
  ]
})
export class CertificadoZoosanitarioModule { }