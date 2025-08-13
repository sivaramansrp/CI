import { RouterModule, Routes } from '@angular/router';
import { AgregarFabricanteSanitarioComponent } from './components/agregar-fabricante-sanitario/agregar-fabricante-sanitario.component';
import { AgregarProveedorSanitarioComponent } from './components/agregar-proveedor-sanitario/agregar-proveedor-sanitario.component';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';

const ROUTES: Routes = [
  {
    path: 'datos-de-la-solicitud',
    component: PantallasComponent,
  },
  {
    path: 'agregar-proveedor',
    component: AgregarProveedorSanitarioComponent,
  },
  {
    path: 'agregar-fabricante',
    component: AgregarFabricanteSanitarioComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'datos-de-la-solicitud',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AvisoSanitarioRoutingModule { }