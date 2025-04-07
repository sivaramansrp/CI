import { CatalogoSelectComponent, CatalogosService, FirmaPageComponent } from '@libs/shared/data-access-user/src';
import { NgModule, forwardRef, } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
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
