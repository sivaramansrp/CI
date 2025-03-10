/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { AlertComponent, CatalogosService } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { AnexarPageComponent } from './components/anexar-page/anexar-page.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FiltrarArchivosDigitalizacionComponent } from './components/filtrar-archivos-digitalizacion/filtrar-archivos-digitalizacion.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroDigitalizarDocumentosRoutingModule } from './registro-digitalizar-documentos-routing.module';
import { TituloComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { SharedModule } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';
import { RegistroDigitalizarDocumentosService } from './services/registro-digitalizar-documentos.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
   
    
   ],
  imports: [
    AnexarPageComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CommonModule,
    FiltrarArchivosDigitalizacionComponent,
    FirmaElectronicaComponent,
    FormsModule,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    ReactiveFormsModule,
    RegistroDigitalizarDocumentosRoutingModule,
    SolicitanteComponent,
    SolicitudPageComponent,
    TituloComponent,
    WizardComponent,
    SharedModule,
    HttpClientModule
    
  

    
  ],
  providers: [ToastrService,CatalogosService,RegistroDigitalizarDocumentosService],
})
export class RegistroDigitalizarDocumentosModule {}
