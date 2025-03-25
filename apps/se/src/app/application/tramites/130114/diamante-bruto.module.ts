import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PageComponent } from './pages/page/page.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { DiamanteBrutoRoutingModule } from './diamante-bruto-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';



@NgModule({
  declarations: [PageComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    DiamanteBrutoRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService
  ]
})
export class DiamanteBrutoModule {}
