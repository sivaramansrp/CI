import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



import {CrosslistComponent, InputFechaComponent, SharedModule, WizardComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AvisoModifyIvaEIepsAgaceRoutingModule } from './aviso-modify-ivaEIepsAgace-routing.module';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';


@NgModule({
  declarations: [
   
  ],
  imports: [
    FirmaElectronicaComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
   
    WizardComponent,
    AvisoModifyIvaEIepsAgaceRoutingModule,
    SharedModule,
   
  ],
  exports: [],
})
export class AvisoModifyIvaElepsAgaceModule {}
