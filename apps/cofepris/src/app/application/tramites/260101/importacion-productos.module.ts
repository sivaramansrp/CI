import { NgModule } from '@angular/core';
import { ImportacionProductosComponent } from './pages/importacion-productos/importacion-productos.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiciosExtraordinariosRoutingModule } from './importacion-productos-routing.module';
import { forwardRef } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputFechaComponent, InputRadioComponent, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { SolicitudDatosComponent } from './components/solicitud-datos/solicitud-datos.component';
import { ModificarMercanciasComponent } from './components/modificar-mercancias/modificar-mercancias.component';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ModificarDestinatarioComponent } from './components/modificar-destinatario/modificar-destinatario.component';

@NgModule({
  declarations: [
    ImportacionProductosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudDatosComponent,
    ModificarMercanciasComponent,
    PagoDerechosComponent,
    TercerosRelacionadosComponent,
    ModificarDestinatarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ServiciosExtraordinariosRoutingModule,
    forwardRef(() => AnexarDocumentosComponent),
    forwardRef(() => BtnContinuarComponent),
    forwardRef(() => WizardComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => AlertComponent),
    forwardRef(() => SolicitanteComponent),
    forwardRef(() => TituloComponent),
    forwardRef(() => TableComponent),
    forwardRef(() => CatalogoSelectComponent),
    forwardRef(() => InputRadioComponent),
    forwardRef(() => CrosslistComponent),
    forwardRef(() => InputFechaComponent),
    forwardRef(() => TablaDinamicaComponent),
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService, CatalogosService],
})
export class ServiciosExtraordinariosModule {}
