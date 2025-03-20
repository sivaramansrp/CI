import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { SanitaryPermitComponent } from './pages/sanitary-permit/sanitary-permit.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ModificacionDeDispositivosRoutingModule } from './modificacion-de-dispositivos-routing.module';
import { TercerosRelacionadosComponent } from './component/terceros-relacionados/terceros-relacionados.component';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
    declarations: [SanitaryPermitComponent, PasoUnoComponent],
    providers: [provideHttpClient()],
    imports: [
        CommonModule,
        ModificacionDeDispositivosRoutingModule,
        WizardComponent,
        SolicitanteComponent,
        TercerosRelacionadosComponent,
        TituloComponent,
        CatalogoSelectComponent,
        ReactiveFormsModule,
        BtnContinuarComponent,
        TablaDinamicaComponent,
        PasoDosComponent,
        PasoTresComponent,
        AlertComponent
    ],
})
export class ModificacionDeDispositivosModule { }
