import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AgregarMercanciaComponent } from './components/agregar-mercancia/agregar-mercancia.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AnexarDocumentosComponent } from '../../shared/components/anexar-documentos/anexar-documentos.component';
import { BtnContinuarComponent } from '../../shared/components/btn-continuar/btn-continuar.component';
import { CarrosDeFerrocarrilComponent } from '../220502/shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { CatalogoSelectComponent } from '../../shared/components/catalogo-select/catalogo-select.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { DatoseDelTramiteARealizerComponent } from '../220502/shared/datose-del-tramite-a-realizer/datose-del-tramite-a-realizer.component';
import { FirmaElectronicaComponent } from '../../shared/components/firma-electronica/firma-electronica.component';
import { HistorialInspeccionFisicaComponent } from '../220502/shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { InputFechaComponent } from '../../shared/components/input-fecha/input-fecha.component';
import { MedioTransporteComponent } from './components/medio-transporte/medio-transporte.component';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ResponsableInspeccionEnPuntoComponent } from '../220502/shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { RevisionDocumentalComponent } from './components/revision-documental/revision-documental.component';
import { SagarpaRoutingModule } from './sagarpa-routing.module';
import { SolicitanteComponent } from '../../shared/components/solicitante/solicitante.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudDatosComponent } from '../220502/shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '../../shared/components/titulo/titulo.component';
import { WizardComponent } from '../../shared/components/wizard/wizard.component';

@NgModule({
  declarations: [
    SolicitudComponent,
    SolicitudPageComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    RevisionDocumentalComponent,
    MedioTransporteComponent,
    AgregarMercanciaComponent,
    DatosGeneralesComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SagarpaRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    InputFechaComponent,
    SolicitudDatosComponent,
    DatoseDelTramiteARealizerComponent,
    ResponsableInspeccionEnPuntoComponent,
    CarrosDeFerrocarrilComponent,
    HistorialInspeccionFisicaComponent,
    CatalogoSelectComponent,
    TableComponent
  ],
  exports: [SolicitudComponent, SolicitudPageComponent],
})
export class SagarpaModule {}
