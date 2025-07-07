import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImportacionProductosComponent } from './pages/importacion-productos/importacion-productos.component';
import { ModificarDestinatarioComponent } from './components/modificar-destinatario/modificar-destinatario.component';
import { ModificarMercanciasComponent } from './components/modificar-mercancias/modificar-mercancias.component';
import { NgModule } from '@angular/core';
import { PagoDerechosComponent } from './components/pago-derechos/pago-derechos.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiciosExtraordinariosRoutingModule } from './importacion-productos-routing.module';
import { SolicitudDatosComponent } from './components/solicitud-datos/solicitud-datos.component';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ServiciosExtraordinariosRoutingModule,
    ImportacionProductosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudDatosComponent,
    ModificarMercanciasComponent,
    PagoDerechosComponent,
    TercerosRelacionadosComponent,
    ModificarDestinatarioComponent,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService, CatalogosService],
})
export class ServiciosExtraordinariosModule {}
