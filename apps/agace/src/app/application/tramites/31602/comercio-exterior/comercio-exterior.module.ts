import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComercioExteriorRoutingModule } from './comercio-exterior-routing.module';
import { TodospasosComponent } from '../pages/todospasos/todospasos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogosService, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { ComercioExteriorService } from '../services/comercio-exterior.service';
import { IvaeiepsComponent } from '../components/ivaeieps/ivaeieps.component';
import { DatosPorRegimenComponent } from '../components/datos-por-regimen/datos-por-regimen.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TercerosRelacionadosComponent } from '../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { DatosComunesComponent } from '../../../shared/components/datos-comunes/datos-comunes.component';
import { TercerosRelacionadosService } from '../../../shared/services/terceros-relacionados.service';


@NgModule({
  declarations: [TodospasosComponent,PasoUnoComponent,PasoDosComponent,PasoTresComponent],
  imports: [
    CommonModule,
    ComercioExteriorRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    IvaeiepsComponent,
    DatosPorRegimenComponent,
    TercerosRelacionadosComponent,
    DatosComunesComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    provideHttpClient(),
    CatalogosService,
    InicioSesionService,
    SubirDocumentoService,
    ComercioExteriorService,
    BsModalService,
    TercerosRelacionadosService 
  ],
})
export class ComercioExteriorModule { }
