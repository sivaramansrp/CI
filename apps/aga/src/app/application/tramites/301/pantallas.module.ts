/* eslint-disable @nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DeLaMuestraComponent } from './components/de-la-muestra/de-la-muestra.component';
import { InformacionDeLaComponent } from './components/informacion-de-la/informacion-de-la.component';
import { NavComponent } from 'libs/shared/data-access-user/src/tramites/components/nav/nav.component';
import { NgModule } from '@angular/core';
import { PagoDeDerechosComponent } from './components/pago-de-derechos/pago-de-derechos.component';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PantallasRoutingModule } from './pantallas-routing.module';
import { RegistroParaLaComponent } from './components/registro-para-la/registro-para-la.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

@NgModule({
  declarations: [DatosComponent, PantallasComponent],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    WizardComponent,
    NavComponent,
    PagoDeDerechosComponent,
    RegistroParaLaComponent,
    DeLaMuestraComponent,
    InformacionDeLaComponent,
  ],
})
export class Pantallas301Module {}
