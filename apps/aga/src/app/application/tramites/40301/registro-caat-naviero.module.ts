import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { RegistroCaatNavieroPageComponent } from './pages/cancelacion-extraordinarios-page/cancelacion-extraordinarios-page.component';
import { CancelarSolicitudComponent } from './components/cancelar-solicitud/cancelar-solicitud.component';
import { CancelarSolicitudService } from './service/cancelar-solicitud.service';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroCaatNavieroRoutingModule } from './registro-caat-naviero-routing.module';
import { RouterModule } from '@angular/router';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { ServiciosExtraordinariosService } from './service/servicios-extraordinarios.service';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';
import { forwardRef } from '@angular/core';

@NgModule({
  declarations: [
    RegistroCaatNavieroPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CancelarSolicitudComponent,
  ],
  imports: [
    forwardRef(() => BtnContinuarComponent),
    forwardRef(() => CatalogoSelectComponent),
    CommonModule,
    forwardRef(() => CrosslistComponent),
    forwardRef(() => FirmaElectronicaComponent),
    ReactiveFormsModule,
    RouterModule,
    forwardRef(() => SelectPaisesComponent),
    RegistroCaatNavieroRoutingModule,
    forwardRef(() => SolicitanteComponent),
    forwardRef(() => TituloComponent),
    forwardRef(() => WizardComponent),
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [
    ToastrService,
    CancelarSolicitudService,
    ServiciosExtraordinariosService 
  ]
})
export class RegistroCaatNavieroModule {}
