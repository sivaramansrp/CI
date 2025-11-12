/**
 * Módulo: RegistroComoEmpresaModule
 * ----------------------------------
 * Este módulo agrupa los componentes, servicios y rutas necesarios para el flujo de registro
 * como empresa en el trámite 120602.
 *
 * Uso:
 * Importar este módulo en el módulo principal de la aplicación para habilitar el proceso de registro de empresa.
 *
 * Funcionalidad:
 * - Declara y agrupa los componentes principales del flujo de registro.
 * - Importa los módulos y componentes compartidos requeridos para la funcionalidad.
 *
 * Autor: [Agregar nombre del autor si se desea]
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroComoEmpresaRoutingModule } from './registro-como-empresa-routing.module';




@NgModule({
  declarations: [DatosComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    RegistroComoEmpresaRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    DatosEmpresaComponent,
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
export class RegistroComoEmpresaModule {}
