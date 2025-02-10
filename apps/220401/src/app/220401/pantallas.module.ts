import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import { AgregarDestinatoriaComponent } from './components/agregar-destinatoria/agregar-destinatoria.component';
// //import { BtnContinuarComponent } from './../../shared/components/btn-continuar/btn-continuar.component';
// import { CombinacionRequeridaComponent } from './components/combinacion-requerida/combinacion-requerida.component';
// import { DatosComponent } from './pages/datos/datos.component';
// import { DatosDelComponent } from './components/datos-del/datos-del.component';
// import { DatosGeneralsAnimalsComponent } from './components/datos-generals-animals/datos-generals-animals.component';
//import { NavComponent } from '../../shared/components/nav/nav.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PantallasRoutingModule } from './pantallas-routing.module';
// import { PagoDeDerechoComponent } from './components/pago-de-derecho/pago-de-derecho.component';
// import { SolicitudComponent } from './components/solicitud/solicitud.component';
// import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
// //import { TituloComponent } from '../../shared/components/titulo/titulo.component';
// import { TransporteComponent } from './pages/transporte/transporte.component';
//import { WizardComponent } from '../../shared/components/wizard/wizard.component';
//import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';

@NgModule({
  declarations: [
    PantallasComponent,
    // DatosComponent,
    // TransporteComponent,
    
  ],
  imports: [
    CommonModule,
    //PagoDeDerechoComponent,
    PantallasRoutingModule,    
    // NavComponent,
    // WizardComponent,
    // TituloComponent,
    // BtnContinuarComponent,
    // SolicitudComponent,
    // DatosDelComponent,
    FormsModule,
    ReactiveFormsModule,
    // CombinacionRequeridaComponent,
    // TercerosRelacionadosComponent,
    // AgregarDestinatoriaComponent,
    // DatosGeneralsAnimalsComponent,
    //SelectCatalogosComponent
  ]
})
/**
 * Este módulo se utiliza para configurar los componentes del módulo 220401.
 * Importar los componentes del módulo.
 */
export class PantallasModule { }
