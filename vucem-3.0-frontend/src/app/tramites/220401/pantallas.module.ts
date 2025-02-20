import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgregarDestinatoriaComponent } from './components/agregar-destinatoria/agregar-destinatoria.component';
import { BtnContinuarComponent } from './../../shared/components/btn-continuar/btn-continuar.component';
import { CombinacionRequeridaComponent } from './components/combinacion-requerida/combinacion-requerida.component';
import { DatosComponent } from './pages/datos/datos.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PantallasRoutingModule } from './pantallas-routing.module';

import { PagoDeDerechoComponent } from './components/pago-de-derecho/pago-de-derecho.component';
import { SelectCatalogosComponent } from '../../shared/components/select-catalogos/select-catalogos.component';
import { SolicitudPantallasComponent } from './components/solicitud/solicitud.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { TransporteComponent } from './pages/transporte/transporte.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

import { DatosDelCertificadoComponent } from './components/datos-del-certificado/datos-del-certificado.component';
import { DatosGeneralesAnimalesComponent } from './components/datos-generales-animales/datos-generales-animales.component';

@NgModule({
  declarations: [
    PantallasComponent,
    DatosComponent,
    TransporteComponent
   ],
  imports: [
    CommonModule,
    PagoDeDerechoComponent,
    PantallasRoutingModule,    
    NavComponent,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    SolicitudPantallasComponent,
    DatosDelCertificadoComponent,
    FormsModule,
    ReactiveFormsModule,
    CombinacionRequeridaComponent,
    TercerosRelacionadosComponent,
    AgregarDestinatoriaComponent,
    DatosGeneralesAnimalesComponent,
    SelectCatalogosComponent
  ]
})
/**
 * Este módulo se utiliza para configurar los componentes del módulo 220401.
 * Importar los componentes del módulo.
 */
export class PantallasModule { }
