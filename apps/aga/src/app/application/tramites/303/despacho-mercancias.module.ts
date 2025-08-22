import { AlertComponent, CatalogoSelectComponent, NotificacionesComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { NgModule, forwardRef } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AgentesAgenciasAduanalesComponent } from './components/agentes-agencias-aduanales/agentes-agencias-aduanales.component';
import { AgregarMiembrosEmpresaComponent } from './components/agregar-miembros-empresa/agregar-miembros-empresa.component';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { ClientesProveedoresExtrajeroComponent } from './components/clientes-proveedores-extrajero/clientes-proveedores-extrajero.component';
import { CommonModule } from '@angular/common';
import { ConfirmarNotificacionComponent } from './components/confirmar-notificacion/confirmar-notificacion.component';
import { ControlInventariosComponent } from './components/control-inventarios/control-inventarios.component';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosTransportistaComponent } from './components/datos-transportista/datos-transportista.component';
import { DespachoMercanciasRoutingModule } from './despacho-mercancias-routing.module';
import { DespachoMercanciasSolicitudComponent } from './components/despacho-mercancias-solicitud/despacho-mercancias-solicitud.component';
import { EmpleadosContratadosComponent } from './components/empleados-contratados/empleados-contratados.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { NavComponent } from '@ng-mf/data-access-user';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { RouterModule } from '@angular/router';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    AgentesAgenciasAduanalesComponent,
    AgregarMiembrosEmpresaComponent,
    ClientesProveedoresExtrajeroComponent,
    ConfirmarNotificacionComponent,
    ControlInventariosComponent,
    DatosTransportistaComponent,
    DespachoMercanciasSolicitudComponent,
    EmpleadosContratadosComponent,
    PagoDerechosComponent,
    PasoCuatroComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    RegistroPageComponent,
    TestPageComponent,
  ],
  imports: [
    CommonModule,
    DespachoMercanciasRoutingModule,
    RouterModule,
    NavComponent,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    AlertComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    InputCheckComponent,
    InputHoraComponent,
    InputFechaComponent,
    CrosslistComponent,
    SelectPaisesComponent,
    TercerosRelacionadosComponent,
    forwardRef(() => AnexarDocumentosComponent),
    ToastrModule.forRoot(),
    NotificacionesComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  exports: [
  ],
  providers: [
    ToastrService
  ]
})
export class DespachoMercanciasModule { }
