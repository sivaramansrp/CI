import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { CatalogoSelectComponent, CatalogosService, FirmaPageComponent, SelectCatalogosComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    forwardRef(() => SelectCatalogosComponent),
    forwardRef(() => CatalogoSelectComponent),
    forwardRef(() => FirmaPageComponent),
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    CatalogosService
  ]
})
export class FuncionarioModule { }
