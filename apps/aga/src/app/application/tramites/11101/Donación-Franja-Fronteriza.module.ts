import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionFranjaFronterizaRoutingModule } from './Donación-Franja-Fronteriza-routing.module';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

@NgModule({
    declarations: [SolicitantePageComponent,PasoUnoComponent],

    imports: [
        SolicitanteComponent,
        CommonModule,
        
         DonacionFranjaFronterizaRoutingModule,
         WizardComponent,
    ],
    exports: [PasoUnoComponent],
    providers: [],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonacionFranjaFronterizaModule { }