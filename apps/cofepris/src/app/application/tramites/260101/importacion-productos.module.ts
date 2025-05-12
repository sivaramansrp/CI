import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { FormsModule } from '@angular/forms';
import { ImportacionProductosComponent } from './pages/importacion-productos/importacion-productos.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ModificarDestinatarioComponent } from './components/modificar-destinatario/modificar-destinatario.component';
import { ModificarMercanciasComponent } from './components/modificar-mercancias/modificar-mercancias.component';
import { NgModule } from '@angular/core';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiciosExtraordinariosRoutingModule } from './importacion-productos-routing.module';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudDatosComponent } from './components/solicitud-datos/solicitud-datos.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { forwardRef } from '@angular/core';

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
    ModificarDestinatarioComponent,
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
