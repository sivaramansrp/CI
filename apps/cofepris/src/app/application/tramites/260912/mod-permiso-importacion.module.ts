import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, InicioSesionService, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';
import { DomicilioDelEstablecimientoComponent } from './component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './component/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioComponent } from './pages/permiso-sanitario/permiso-sanitario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComoEmpresaRoutingModule } from './mod-permiso-importacion-routing.module';
import { TercerosRelacionadosComponent } from './component/terceros-relacionados/terceros-relacionados.component';
import { ToastrService } from 'ngx-toastr';
import { TramitesAsociadoComponent } from './component/tramites-asociado/tramites-asociado.component';



@NgModule({
  declarations: [PermisoSanitarioComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    RegistroComoEmpresaRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    DatosEmpresaComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    PagoDeDerechosComponent,
    TramitesAsociadoComponent,
    DomicilioDelEstablecimientoComponent,
    TercerosRelacionadosComponent
  ],
  providers:[ToastrService, InicioSesionService]
})
export class ModPermisoImportacionModule {}
