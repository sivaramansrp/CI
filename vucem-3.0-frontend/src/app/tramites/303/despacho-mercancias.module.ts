import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespachoMercanciasRoutingModule } from './despacho-mercancias-routing.module';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { InputCheckComponent } from '../../shared/components/input-check/input-check.component';
import { InputHoraComponent } from '../../shared/components/input-hora/input-hora.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { AgregaPersonasComponent } from './components/agrega-personas/agrega-personas.component';
import { AgregarTransporteComponent } from '../../shared/components/agregar-transporte/agregar-transporte.component';
import { PedimentoComponent } from './components/pedimento/pedimento.component';
import { CrosslistComponent } from '../../shared/components/crosslist/crosslist.component';
import { TercerosComponent } from './components/terceros/terceros.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { DespachoMercanciasSolicitudComponent } from './components/despacho-mercancias-solicitud/despacho-mercancias-solicitud.component';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { AgentesAgenciasAduanalesComponent } from './components/agentes-agencias-aduanales/agentes-agencias-aduanales.component';
import { EmpleadosContratadosComponent } from './components/empleados-contratados/empleados-contratados.component';
import { ClientesProveedoresExtrajeroComponent } from './components/clientes-proveedores-extrajero/clientes-proveedores-extrajero.component';
import { DatosTransportistaComponent } from './components/datos-transportista/datos-transportista.component';
import { ControlInventariosComponent } from './components/control-inventarios/control-inventarios.component';
import { AgregarMiembrosEmpresaComponent } from './components/agregar-miembros-empresa/agregar-miembros-empresa.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';

@NgModule({
  declarations: [
    RegistroPageComponent,
    SolicitudComponent,
    TercerosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    DespachoMercanciasSolicitudComponent,
    PagoDerechosComponent,
    PasoCuatroComponent,
    AgentesAgenciasAduanalesComponent,
    EmpleadosContratadosComponent,
    ClientesProveedoresExtrajeroComponent,
    DatosTransportistaComponent,
    ControlInventariosComponent,
    AgregarMiembrosEmpresaComponent
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
    SelectCatalogosComponent,
    SolicitanteComponent,
    AnexarDocumentosComponent,
    InputCheckComponent,
    InputHoraComponent,
    InputFechaComponent,
    CrosslistComponent,
    AgregarTransporteComponent,
    PedimentoComponent,
    AgregaPersonasComponent

  ],
  exports: [
    
  ]
})
export class DespachoMercanciasModule { }
