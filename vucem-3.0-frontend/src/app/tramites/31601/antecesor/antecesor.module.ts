/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from '../../../shared/components/wizard/wizard.component';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { AduaneroComponent } from "../components/aduanero/aduanero.component";
import { SharedModule } from '../../../shared/shared.module';

import { CapturarIvaeiepsComponent } from '../components/capturar-ivaeieps/capturar-ivaeieps.component';
import { AnexarEquisitosComponent } from '../components/anexar-equisitos/anexar-equisitos.component';
import { DatosPorRegimenComponent } from '../components/datos-por-regimen/datos-por-regimen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirmarSolicitudComponent } from '../pages/firmar-solicitud/firmar-solicitud.component';
import { FirmaElectronicaComponent } from '../../../shared/components/firma-electronica/firma-electronica.component';
import { BtnContinuarComponent } from '../../../shared/components/btn-continuar/btn-continuar.component';

@NgModule({
  declarations: [DatosComponent, PantallasComponent, FirmarSolicitudComponent],
  imports: [
    CommonModule,
    AntecesorRoutingModule,
    WizardComponent,
    NavComponent,
    AduaneroComponent,
    FormsModule,
    ReactiveFormsModule,
    CapturarIvaeiepsComponent,
    AnexarEquisitosComponent,
    DatosPorRegimenComponent,
    ReactiveFormsModule,
    FormsModule,
    FirmaElectronicaComponent,
    BtnContinuarComponent
  ],
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 31601.
 * Importar los componentes del módulo.
 */
export class AntecesorModule {}
